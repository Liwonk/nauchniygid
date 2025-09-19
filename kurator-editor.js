// kurator-editor.js - Редактор кураторов НТК
// Версия: 1.0

window.KuratorEditor = {
    // Основная функция построения редактора
    build: function() {
        let html = `
            <h3 class="section-title">👥 Редактирование кураторов НТК</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из kurator-data.js</strong>
            </p>
            
            <!-- Основные настройки -->
            <div class="form-group">
                <label>Заголовок страницы:</label>
                <input type="text" id="kurator-page-title" value="${currentData.pageTitle || ''}" placeholder="Заголовок страницы">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="kurator-section-title" value="${currentData.mainSection?.title || ''}" placeholder="Заголовок секции">
                </div>
                <div class="form-group">
                    <label>Описание секции:</label>
                    <input type="text" id="kurator-section-desc" value="${currentData.mainSection?.description || ''}" placeholder="Описание секции">
                </div>
            </div>
            
            <!-- Список кураторов -->
            <h4>Список кураторов (всего: ${currentData.curators?.length || 0}):</h4>
            <div id="kurator-list">
        `;
        
        if(currentData.curators && currentData.curators.length > 0){
            currentData.curators.forEach((curator, index) => {
                html += this.generateKuratorEditor(curator, index);
            });
        }
        
        html += `
            </div>
            <button class="add-card-btn" onclick="KuratorEditor.addKurator()">+ Добавить куратора</button>
            
            <!-- Настройки фильтров -->
            <h4>Настройки фильтров:</h4>
            <div class="form-group">
                <label>Департаменты (по одному на строку):</label>
                <textarea id="kurator-departments" rows="5">${(currentData.filterOptions?.departments || []).join('\n')}</textarea>
            </div>
            <div class="form-group">
                <label>Специализации (по одной на строку):</label>
                <textarea id="kurator-specializations" rows="5">${(currentData.filterOptions?.specializations || []).join('\n')}</textarea>
            </div>
            <div class="form-group">
                <label>Опыт работы (по одному на строку):</label>
                <textarea id="kurator-experience" rows="3">${(currentData.filterOptions?.experience || []).join('\n')}</textarea>
            </div>
            
            <div class="btn-group">
                <button class="btn btn-preview" onclick="KuratorEditor.preview()">👁️ Предпросмотр</button>
                <button class="btn btn-save" onclick="KuratorEditor.save()">💾 Скачать kurator-data.js</button>
            </div>
        `;
        
        contentEdit.innerHTML = html;
    },

    generateKuratorEditor: function(curator, index) {
        return `
            <div class="kurator-editor" id="kurator-${index}">
                <div class="kurator-header">
                    <h4>Куратор ${index + 1}: ${curator.name || 'Новый куратор'}</h4>
                    <button class="remove-card-btn" onclick="KuratorEditor.removeKurator(${index})">×</button>
                </div>
                
                <!-- Основная информация -->
                <div class="form-row">
                    <div class="form-group">
                        <label>Имя:</label>
                        <input type="text" id="kurator-name-${index}" value="${curator.name || ''}" placeholder="Имя Фамилия">
                    </div>
                    <div class="form-group">
                        <label>Должность:</label>
                        <input type="text" id="kurator-position-${index}" value="${curator.position || ''}" placeholder="Должность">
                    </div>
                </div>
                <div class="form-group">
                    <label>Департамент:</label>
                    <input type="text" id="kurator-department-${index}" value="${curator.department || ''}" placeholder="Департамент">
                </div>
                
                <!-- Аватар -->
                <div class="form-group">
                    <label>Путь к фото:</label>
                    <input type="text" id="kurator-avatar-${index}" value="${curator.avatar || ''}" placeholder="images/curators/photo.jpg">
                </div>
                
                <!-- Статистика -->
                <h5>Статистика:</h5>
                <div class="form-row-3">
                    <div class="form-group">
                        <label>Количество проектов:</label>
                        <input type="number" id="kurator-projects-${index}" value="${curator.stats?.projects || 0}">
                    </div>
                    <div class="form-group">
                        <label>Опыт (лет):</label>
                        <input type="number" id="kurator-experience-${index}" value="${curator.stats?.experience || 0}">
                    </div>
                    <div class="form-group">
                        <label>Рейтинг:</label>
                        <input type="number" step="0.1" id="kurator-rating-${index}" value="${curator.stats?.rating || 5.0}">
                    </div>
                </div>
                
                <!-- Экспертиза -->
                <h5>Экспертиза:</h5>
                <div class="list-editor" id="kurator-expertise-${index}">
                    ${this.generateListItems(curator.expertise || [], 'expertise', index)}
                </div>
                <button type="button" onclick="KuratorEditor.addListItem('kurator-expertise-${index}', 'expertise', ${index})" class="add-card-btn">+ Добавить экспертизу</button>
                
                <!-- Специализации -->
                <h5>Специализации:</h5>
                <div class="list-editor" id="kurator-specializations-${index}">
                    ${this.generateListItems(curator.specializations || [], 'specializations', index)}
                </div>
                <button type="button" onclick="KuratorEditor.addListItem('kurator-specializations-${index}', 'specializations', ${index})" class="add-card-btn">+ Добавить специализацию</button>
                
                <!-- Контакты -->
                <h5>Контакты:</h5>
                <div class="form-row-3">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" id="kurator-email-${index}" value="${curator.contact?.email || ''}" placeholder="email@gazprom-neft.ru">
                    </div>
                    <div class="form-group">
                        <label>Телефон:</label>
                        <input type="text" id="kurator-phone-${index}" value="${curator.contact?.phone || ''}" placeholder="+7 (812) 363-00-00">
                    </div>
                    <div class="form-group">
                        <label>Telegram:</label>
                        <input type="text" id="kurator-telegram-${index}" value="${curator.contact?.telegram || ''}" placeholder="@username">
                    </div>
                </div>
                
                <!-- Рабочая информация -->
                <div class="form-row">
                    <div class="form-group">
                        <label>Рабочие часы:</label>
                        <input type="text" id="kurator-hours-${index}" value="${curator.workingHours || ''}" placeholder="Пн-Пт 9:00-18:00">
                    </div>
                    <div class="form-group">
                        <label>Время ответа:</label>
                        <input type="text" id="kurator-response-${index}" value="${curator.responseTime || ''}" placeholder="До 24 часов">
                    </div>
                </div>
                
                <!-- Биография -->
                <div class="form-group">
                    <label>Биография:</label>
                    <textarea id="kurator-bio-${index}" rows="3" placeholder="Краткое описание куратора">${curator.bio || ''}</textarea>
                </div>
            </div>
        `;
    },

    generateListItems: function(items, type, kuratorIndex) {
        return items.map((item, itemIndex) => `
            <div class="list-item">
                <input type="text" value="${item}" id="${type}-${kuratorIndex}-${itemIndex}">
                <button type="button" class="remove-btn" onclick="KuratorEditor.removeListItem('${type}', ${kuratorIndex}, ${itemIndex})">×</button>
            </div>
        `).join('');
    },

    addKurator: function() {
        const container = document.getElementById('kurator-list');
        const index = container.children.length;
        const newKurator = {
            id: `kurator_${Date.now()}`,
            name: 'Новый куратор',
            position: 'Должность',
            department: 'Департамент',
            avatar: 'images/curators/default.jpg',
            stats: {projects: 0, experience: 0, rating: 5.0},
            expertise: ['Новая экспертиза'],
            specializations: ['Новая специализация'],
            contact: {email: '', phone: '', telegram: ''},
            workingHours: 'Пн-Пт 9:00-18:00',
            responseTime: 'До 24 часов',
            bio: ''
        };
        
        container.insertAdjacentHTML('beforeend', this.generateKuratorEditor(newKurator, index));
    },

    removeKurator: function(index) {
        if(confirm('Удалить этого куратора?')) {
            document.getElementById(`kurator-${index}`)?.remove();
        }
    },

    addListItem: function(containerId, type, kuratorIndex) {
        const container = document.getElementById(containerId);
        const itemIndex = container.children.length;
        const itemHTML = `
            <div class="list-item">
                <input type="text" value="Новый пункт" id="${type}-${kuratorIndex}-${itemIndex}">
                <button type="button" class="remove-btn" onclick="KuratorEditor.removeListItem('${type}', ${kuratorIndex}, ${itemIndex})">×</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    },

    removeListItem: function(type, kuratorIndex, itemIndex) {
        const item = document.getElementById(`${type}-${kuratorIndex}-${itemIndex}`);
        if(item) {
            item.closest('.list-item').remove();
        }
    },

    save: function() {
        const updatedData = {
            pageTitle: val('kurator-page-title'),
            hero: currentData.hero || {title: 'НАУЧНЫЙ НАВИГАТОР', pageTitle: 'Список кураторов НТК'},
            introText: currentData.introText || '',
            mainSection: {
                title: val('kurator-section-title'),
                description: val('kurator-section-desc'),
                totalCurators: 0
            },
            curators: [],
            filterOptions: {
                departments: val('kurator-departments').split('\n').filter(d => d.trim()),
                specializations: val('kurator-specializations').split('\n').filter(s => s.trim()),
                experience: val('kurator-experience').split('\n').filter(e => e.trim())
            },
            contactInfo: currentData.contactInfo || {},
            lastUpdated: new Date().toLocaleString('ru-RU')
        };

        const kuratorElements = document.querySelectorAll('.kurator-editor');
        kuratorElements.forEach((kuratorEl, index) => {
            const expertiseInputs = kuratorEl.querySelectorAll(`[id^="expertise-${index}-"]`);
            const expertise = Array.from(expertiseInputs).map(input => input.value).filter(v => v.trim());

            const specializationInputs = kuratorEl.querySelectorAll(`[id^="specializations-${index}-"]`);
            const specializations = Array.from(specializationInputs).map(input => input.value).filter(v => v.trim());

            const curator = {
                id: `kurator_${index}`,
                name: val(`kurator-name-${index}`),
                position: val(`kurator-position-${index}`),
                department: val(`kurator-department-${index}`),
                avatar: val(`kurator-avatar-${index}`),
                stats: {
                    projects: parseInt(val(`kurator-projects-${index}`)) || 0,
                    experience: parseInt(val(`kurator-experience-${index}`)) || 0,
                    rating: parseFloat(val(`kurator-rating-${index}`)) || 5.0
                },
                expertise: expertise,
                specializations: specializations,
                contact: {
                    email: val(`kurator-email-${index}`),
                    phone: val(`kurator-phone-${index}`),
                    telegram: val(`kurator-telegram-${index}`)
                },
                workingHours: val(`kurator-hours-${index}`),
                responseTime: val(`kurator-response-${index}`),
                bio: val(`kurator-bio-${index}`)
            };

            updatedData.curators.push(curator);
        });

        updatedData.mainSection.totalCurators = updatedData.curators.length;
        downloadJS('kurator-data.js', 'window.kuratorData', updatedData);
    },

    preview: function() {
        let html = `
            <html>
            <head>
                <title>Предпросмотр: ${val('kurator-page-title')}</title>
                <style>
                    body {font: 14px Arial; padding: 20px; background: #f5f5f5;}
                    h1 {color: #0e4094; text-align: center;}
                    .curator {background: white; margin: 20px 0; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);}
                    .curator h3 {color: #0e4094; margin-bottom: 10px;}
                    .stats {display: flex; gap: 20px; margin: 10px 0;}
                    .stat {text-align: center;}
                    .stat-value {font-size: 1.5rem; font-weight: bold; color: #0e4094;}
                    ul {list-style: none; padding: 0;}
                    li {padding: 2px 0; position: relative; padding-left: 15px;}
                    li::before {content: "•"; color: #0e4094; position: absolute; left: 0;}
                </style>
            </head>
            <body>
                <h1>${val('kurator-page-title')}</h1>
                <p style="text-align: center; margin-bottom: 30px;"><em>${val('kurator-section-desc')}</em></p>
        `;

        const kuratorElements = document.querySelectorAll('.kurator-editor');
        kuratorElements.forEach((kuratorEl, index) => {
            const expertiseInputs = kuratorEl.querySelectorAll(`[id^="expertise-${index}-"]`);
            const expertise = Array.from(expertiseInputs).map(input => input.value).filter(v => v.trim());

            html += `
                <div class="curator">
                    <h3>${val(`kurator-name-${index}`)}</h3>
                    <p><strong>${val(`kurator-position-${index}`)}</strong></p>
                    <p>${val(`kurator-department-${index}`)}</p>
                    
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">${val(`kurator-projects-${index}`)}</div>
                            <div>Проектов</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${val(`kurator-experience-${index}`)}</div>
                            <div>Лет стажа</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${val(`kurator-rating-${index}`)}</div>
                            <div>Рейтинг</div>
                        </div>
                    </div>
                    
                    <h4>Экспертиза:</h4>
                    <ul>${expertise.map(e => `<li>${e}</li>`).join('')}</ul>
                    
                    <p><strong>Контакт:</strong> ${val(`kurator-email-${index}`)}</p>
                    ${val(`kurator-bio-${index}`) ? `<p><em>${val(`kurator-bio-${index}`)}</em></p>` : ''}
                </div>
            `;
        });

        html += '</body></html>';
        openPreview(html);
    }
};

console.log('✅ KuratorEditor загружен');
