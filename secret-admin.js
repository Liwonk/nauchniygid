// secret-admin.js - Секретка (ИСПРАВЛЕННАЯ ВЕРСИЯ)
(function() {
    'use strict';
    
    let isAdminPanelOpen = false;
    
    // Секретка G-P-N-K-C
    const SECRET_SEQUENCE = ['KeyG', 'KeyP', 'KeyN', 'KeyK', 'KeyC'];
    let currentSequence = [];
    let sequenceTimer = null;
    let showNotifications = false; // ✅ НОВАЯ ПЕРЕМЕННАЯ - показывать ли уведомления
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.shiftKey || e.altKey) return;
        
        if (SECRET_SEQUENCE.includes(e.code)) {
            e.preventDefault();
            
            currentSequence.push(e.code);
            
            console.log(`🔐 Последовательность: ${currentSequence.map(k => k.replace('Key', '')).join('-')} (${currentSequence.length}/${SECRET_SEQUENCE.length})`);
            
            clearTimeout(sequenceTimer);
            
            let isCorrect = true;
            for (let i = 0; i < currentSequence.length; i++) {
                if (currentSequence[i] !== SECRET_SEQUENCE[i]) {
                    isCorrect = false;
                    break;
                }
            }
            
            // ✅ ИСПРАВЛЕНО: Проверяем, нужно ли включить уведомления
            if (currentSequence.length >= 3 && isCorrect) {
                showNotifications = true; // ✅ Включаем уведомления после G и P
            }
            
            if (!isCorrect) {
                // ✅ ИСПРАВЛЕНО: Показываем ошибку только если уведомления уже включены
                if (showNotifications) {
                    showNotification('❌ Неверная последовательность', 'error');
                }
                currentSequence = [];
                showNotifications = false; // ✅ Отключаем уведомления при ошибке
                return;
            }
            
            if (currentSequence.length < SECRET_SEQUENCE.length) {
                // ✅ ИСПРАВЛЕНО: Показываем прогресс только если уведомления включены
                if (showNotifications) {
                    showNotification(`🔑 Прогресс: ${currentSequence.length}/${SECRET_SEQUENCE.length}`, 'progress');
                }
                
                sequenceTimer = setTimeout(() => {
                    currentSequence = [];
                    showNotifications = false; // ✅ Отключаем уведомления при таймауте
                    if (showNotifications) { // ✅ Эта проверка уже не сработает, но для консистентности
                        showNotification('⏰ Время вышло, последовательность сброшена', 'info');
                    }
                }, 3000);
            } else {
                // ✅ Полная последовательность введена
                currentSequence = [];
                showNotifications = false;
                clearTimeout(sequenceTimer);
                
                if (!isAdminPanelOpen) {
                    showNotification('🎉 Последовательность активирована!', 'success');
                    setTimeout(() => {
                        openAdminPanel();
                    }, 1000);
                }
            }
        } else if (currentSequence.length > 0) {
            // ✅ ИСПРАВЛЕНО: Показываем прерывание только если уведомления включены
            if (showNotifications) {
                showNotification('❌ Последовательность прервана', 'error');
            }
            currentSequence = [];
            showNotifications = false; // ✅ Отключаем уведомления
            clearTimeout(sequenceTimer);
        }
    });
    
    function openAdminPanel() {
        isAdminPanelOpen = true;
        
        showNotification('🔑 Загрузка админ-панели...', 'loading');
        
        setTimeout(() => {
            createAdminOverlay();
        }, 800);
    }
    
    function createAdminOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'admin-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const adminContainer = document.createElement('div');
        adminContainer.style.cssText = `
            width: 98%;
            height: 98%;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #0e4094, #1a5bb5);
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        `;
        
        const title = document.createElement('h2');
        title.innerHTML = '🛠️ Панель администратора - Научный навигатор <span style="font-size: 0.8rem; opacity: 0.8;"></span>';
        title.style.cssText = `margin: 0; font-size: 1.2rem; font-weight: 600;`;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        closeBtn.onclick = closeAdminPanel;
        
        const iframe = document.createElement('iframe');
        iframe.src = 'admin-editor.html';
        iframe.style.cssText = `
            width: 100%;
            height: calc(100% - 70px);
            border: none;
            background: #f5f5f5;
        `;
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        adminContainer.appendChild(header);
        adminContainer.appendChild(iframe);
        overlay.appendChild(adminContainer);
        document.body.appendChild(overlay);
        
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            adminContainer.style.transform = 'scale(1)';
        });
        
        setTimeout(() => {
            showNotification('✅ Админ-панель загружена!', 'success');
        }, 500);
        
        // ESC для закрытия
        document.addEventListener('keydown', escHandler);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAdminPanel();
            }
        });
    }
    
    function closeAdminPanel() {
        const overlay = document.getElementById('admin-overlay');
        if (overlay) {
            const adminContainer = overlay.querySelector('div');

            overlay.style.opacity = '0';
            adminContainer.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                document.body.removeChild(overlay);
                isAdminPanelOpen = false;
                showNotification('👋 Админ-панель закрыта', 'info');
            }, 300);
        }
        
        document.removeEventListener('keydown', escHandler);
    }
    
    function escHandler(e) {
        if (e.key === 'Escape') {
            closeAdminPanel();
        }
    }

    function showNotification(message, type = 'info') {
        const existing = document.getElementById('admin-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.id = 'admin-notification';
        
        const colors = {
            loading: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' },
            success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
            progress: { bg: '#cce7ff', border: '#99d6ff', text: '#0066cc' },
            info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
            error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' }
        };
        
        const color = colors[type] || colors.info;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${color.bg};
            border: 1px solid ${color.border};
            color: ${color.text};
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 10001;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            font-weight: 500;
            max-width: 350px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });

        const hideDelay = type === 'loading' ? 1500 : (type === 'progress' ? 2500 : 3000);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, hideDelay);
    }

    // ✅ ИСПРАВЛЕНО: Убрал подсказку из консоли, чтобы не раскрывать секрет
    console.log('%c🔐 Защищенная система активирована', 
               'color: #0e4094; font-weight: bold; font-size: 14px;');
    
})();
