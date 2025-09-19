// auth-advanced.js - продвинутая система с запоминанием авторизации
(function(global) {
    'use strict';
    
    // Обфусцированные данные авторизации
    const authData = {
        users: [
            {u: btoa('admin'), p: btoa('admin'), r: 'admin'},
            {u: btoa('moderator'), p: btoa('moderator'), r: 'moderator'},
            {u: btoa('editor'), p: btoa('editor'), r: 'editor'}
        ],
        sessionTimeout: 4 * 60 * 60 * 1000, // 4 часа
        rememberMeDuration: 7 * 24 * 60 * 60 * 1000, // 7 дней
        maxAttempts: 5,
        lockoutTime: 15 * 60 * 1000 // 15 минут блокировки
    };
    
    class AuthManager {
        constructor() {
            this.sessionKey = '_admin_session_gpn';
            this.rememberKey = '_admin_remember_gpn';
            this.attemptsKey = '_login_attempts_';
        }
        
        authenticate(username, password, rememberMe = false) {
            // Проверяем блокировку
            if (this.isLocked()) {
                return { error: 'Слишком много неудачных попыток. Попробуйте позже.' };
            }
            
            const encodedUser = btoa(username);
            const encodedPass = btoa(password);
            
            const user = authData.users.find(u => u.u === encodedUser && u.p === encodedPass);
            
            if (user) {
                // Успешный вход - сбрасываем попытки
                this.resetAttempts();
                
                const session = {
                    user: atob(user.u),
                    role: user.r,
                    loginTime: Date.now(),
                    token: this.generateToken(),
                    sessionId: this.generateSessionId(),
                    rememberMe: rememberMe
                };
                
                // Сохраняем сессию
                sessionStorage.setItem(this.sessionKey, this.encryptSession(session));
                
                // Если включено "Запомнить меня" - сохраняем в localStorage
                if (rememberMe) {
                    const rememberData = {
                        user: atob(user.u),
                        role: user.r,
                        savedTime: Date.now(),
                        token: this.generateLongToken(),
                        hash: this.generateUserHash(username, password)
                    };
                    localStorage.setItem(this.rememberKey, this.encryptSession(rememberData));
                }
                
                return session;
            }
            
            // Неудачная попытка
            this.recordFailedAttempt();
            return null;
        }
        
        // Проверка сохраненной авторизации при загрузке страницы
        checkRememberedLogin() {
            const rememberedData = localStorage.getItem(this.rememberKey);
            if (!rememberedData) return null;
            
            const decrypted = this.decryptSession(rememberedData);
            if (!decrypted) {
                localStorage.removeItem(this.rememberKey);
                return null;
            }
            
            // Проверяем срок действия "запомнить меня"
            const timePassed = Date.now() - decrypted.savedTime;
            if (timePassed > authData.rememberMeDuration) {
                localStorage.removeItem(this.rememberKey);
                return null;
            }
            
            // Создаем новую сессию на основе сохраненных данных
            const session = {
                user: decrypted.user,
                role: decrypted.role,
                loginTime: Date.now(),
                token: this.generateToken(),
                sessionId: this.generateSessionId(),
                rememberMe: true,
                autoLogin: true // Флаг автоматического входа
            };
            
            // Сохраняем новую сессию
            sessionStorage.setItem(this.sessionKey, this.encryptSession(session));
            
            return session;
        }
        
        generateToken() {
            const timestamp = Date.now();
            const random = Math.random().toString(36).substring(2);
            return btoa(timestamp + '_' + random + '_' + this.generateChecksum(timestamp));
        }
        
        // Длительный токен для "запомнить меня"
        generateLongToken() {
            const timestamp = Date.now();
            const random = Math.random().toString(36).substring(2);
            const longRandom = Math.random().toString(36).substring(2);
            return btoa(timestamp + '_long_' + random + '_' + longRandom + '_' + this.generateChecksum(timestamp));
        }
        
        generateSessionId() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2);
        }
        
        generateChecksum(data) {
            let hash = 0;
            const str = data.toString();
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash).toString(36);
        }
        
        generateUserHash(username, password) {
            return btoa(username + ':' + password + ':' + Date.now());
        }
        
        encryptSession(session) {
            // Простое XOR "шифрование" для обфускации
            const key = 'gpn_session_key_2025_remember';
            const jsonStr = JSON.stringify(session);
            let encrypted = '';
            
            for (let i = 0; i < jsonStr.length; i++) {
                encrypted += String.fromCharCode(
                    jsonStr.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            
            return btoa(encrypted);
        }
        
        decryptSession(encryptedData) {
            try {
                const key = 'gpn_session_key_2025_remember';
                const encrypted = atob(encryptedData);
                let decrypted = '';
                
                for (let i = 0; i < encrypted.length; i++) {
                    decrypted += String.fromCharCode(
                        encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                    );
                }
                
                return JSON.parse(decrypted);
            } catch (e) {
                return null;
            }
        }
        
        validateSession() {
            // Сначала проверяем обычную сессию
            const encryptedSession = sessionStorage.getItem(this.sessionKey);
            if (encryptedSession) {
                const session = this.decryptSession(encryptedSession);
                if (session && this.isSessionValid(session)) {
                    return session;
                }
            }
            
            // Если обычной сессии нет, проверяем "запомнить меня"
            const rememberedSession = this.checkRememberedLogin();
            if (rememberedSession) {
                return rememberedSession;
            }
            
            return null;
        }
        
        isSessionValid(session) {
            if (!session) return false;
            
            const now = Date.now();
            
            // Проверка времени сессии
            if (now - session.loginTime > authData.sessionTimeout) {
                this.logout();
                return false;
            }
            
            // Проверка валидности токена
            if (!this.validateToken(session.token)) {
                this.logout();
                return false;
            }
            
            return true;
        }
        
        validateToken(token) {
            try {
                const decoded = atob(token);
                const parts = decoded.split('_');
                if (parts.length < 3) return false;
                
                const timestamp = parseInt(parts[0]);
                const checksum = parts[parts.length - 1];
                const expectedChecksum = this.generateChecksum(timestamp);
                
                return checksum === expectedChecksum;
            } catch (e) {
                return false;
            }
        }
        
        recordFailedAttempt() {
            const attempts = this.getAttempts();
            attempts.count++;
            attempts.lastAttempt = Date.now();
            
            localStorage.setItem(this.attemptsKey, JSON.stringify(attempts));
        }
        
        getAttempts() {
            try {
                const stored = localStorage.getItem(this.attemptsKey);
                return stored ? JSON.parse(stored) : { count: 0, lastAttempt: 0 };
            } catch (e) {
                return { count: 0, lastAttempt: 0 };
            }
        }
        
        resetAttempts() {
            localStorage.removeItem(this.attemptsKey);
        }
        
        isLocked() {
            const attempts = this.getAttempts();
            if (attempts.count < authData.maxAttempts) return false;
            
            const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
            if (timeSinceLastAttempt > authData.lockoutTime) {
                this.resetAttempts();
                return false;
            }
            
            return true;
        }
        
        getRemainingLockoutTime() {
            const attempts = this.getAttempts();
            const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
            const remaining = authData.lockoutTime - timeSinceLastAttempt;
            return Math.max(0, Math.ceil(remaining / 1000 / 60)); // в минутах
        }
        
        logout(keepRememberMe = false) {
            sessionStorage.removeItem(this.sessionKey);
            
            // Удаляем "запомнить меня" только если явно указано
            if (!keepRememberMe) {
                localStorage.removeItem(this.rememberKey);
            }
        }
        
        // Полный выход (удаляет все данные)
        fullLogout() {
            sessionStorage.removeItem(this.sessionKey);
            localStorage.removeItem(this.rememberKey);
        }
        
        // Проверка статуса "запомнить меня"
        isRemembered() {
            return localStorage.getItem(this.rememberKey) !== null;
        }
        
        // Административная функция для генерации новых хешей
        generateUserHash(username, password) {
            return {
                u: btoa(username),
                p: btoa(password),
                r: 'user'
            };
        }
    }
    
    // Создаем глобальный экземпляр
    global.AuthManager = new AuthManager();
    
    // Защищаем от инспектирования
    Object.freeze(global.AuthManager);
    Object.defineProperty(global, 'AuthManager', {
        enumerable: false,
        configurable: false
    });
    
})(window);