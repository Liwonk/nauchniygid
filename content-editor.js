// content-editor.js - Редактор модального контента для baza.html
// Версия: 1.0

window.ContentEditor = {
    // Основная функция построения редактора
    build: function() {
        if (!currentData || !currentPageConf) {
            console.error('ContentEditor: Данные не загружены');
            return;
        }

        // Получаем вкладки для разделов
        const tabs = Object.keys(currentData).map((k, i) => 
            `<button class="section-tab${i ? '' : ' active'}" onclick="ContentEditor.showSection('${k}', this)">${currentData[k].title || k}</button>`
        ).join('');

        // Генерируем блоки для каждого раздела
        let sectionBlocks = '';
        Object.keys(currentData).forEach((sectionKey, index) => {
            const section = currentData[sectionKey];
            sectionBlocks += `
                <div id="content-section-${sectionKey}" class="content-section-editor${index ? '' : ' active'}">
                    <div class="section-container">
                        <h4>⚙️ Настройки раздела "${sectionKey}"</h4>
                        
                        <div class="form-group">
                            <label>Заголовок раздела:</label>
                            <input type="text" id="section-title-${sectionKey}" value="${section.title || ''}" placeholder="Заголовок раздела">
                        </div>
                        
                        <div class="form-group">
                            <label>Описание раздела:</label>
                            <textarea id="section-desc-${sectionKey}" placeholder="Описание раздела">${section.description || ''}</textarea>
                        </div>
                        
                        <h5>Карточки направлений (${section.cards?.length || 0} шт.):</h5>
                        <div id="cards-container-${sectionKey}">
                            ${this.generateCards(section.cards || [], sectionKey)}
                        </div>
                        
                        <button class="add-btn" onclick="ContentEditor.addCard('${sectionKey}')">+ Добавить карточку</button>
                    </div>
                </div>
            `;
        });

        let html = `
            <h3 class="section-title">🗂️ Редактирование базы направлений НТК</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из content-data.js</strong>
            </p>
            
            <!-- Вкладки разделов -->
            <div class="content-sections-tabs">
                ${tabs}
            </div>
            
            <!-- Блоки редактирования разделов -->
            ${sectionBlocks}
            
            <!-- Управление разделами -->
            <div class="section-container">
                <h4>🔧 Управление разделами</h4>
                <button class="add-btn" onclick="ContentEditor.addSection()">+ Добавить новый раздел</button>
            </div>
            
            <div class="btn-group" style="margin-top: 40px;">
                <button class="btn btn-preview" onclick="ContentEditor.preview()">👁️ Предварительный просмотр</button>
                <button class="btn btn-save" onclick="ContentEditor.save()">💾 Скачать content-data.js</button>
            </div>
        `;

        contentEdit.innerHTML = html;
    },

    // Генерация карточек для раздела
    generateCards: function(cards, sectionKey) {
        if (!cards || cards.length === 0) {
            return '<p class="empty-state">Карточки не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }

        return cards.map((card, index) => `
            <div class="modal-card-editor" id="card-${sectionKey}-${index}">
                <div class="card-header">
                    <h4>Карточка ${index + 1}: ${card.title || 'Без названия'}</h4>
                    <button class="remove-card-btn" onclick="ContentEditor.removeCard('${sectionKey}', ${index})">Удалить</button>
                </div>
                
                <div class="form-group">
                    <label>Заголовок карточки:</label>
                    <input type="text" id="card-title-${sectionKey}-${index}" value="${card.title || ''}" placeholder="Название направления">
                </div>
                
                <div class="form-group">
                    <label>Содержимое карточки:</label>
                    <textarea id="card-text-${sectionKey}-${index}" rows="6" placeholder="Введите содержимое. Используйте 'li ' в начале строки для создания списков">${card.text || ''}</textarea>
                    <small style="color: #666; font-size: 0.85em;">
                        💡 Подсказка: Начните строку с "li " для создания пункта списка
                    </small>
                </div>
                
                <!-- Дополнительные настройки карточки -->
                <details style="margin-top: 15px;">
                    <summary style="cursor: pointer; color: var(--primary-color); font-weight: 600;">⚙️ Дополнительные настройки</summary>
                    <div style="padding: 15px 0;">
                        <div class="form-group">
                            <label>Иконка (эмодзи):</label>
                            <input type="text" id="card-icon-${sectionKey}-${index}" value="${card.icon || ''}" placeholder="🔬">
                        </div>
                        
                        <div class="form-group">
                            <label>Теги (через запятую):</label>
                            <input type="text" id="card-tags-${sectionKey}-${index}" value="${(card.tags || []).join(', ')}" placeholder="инновации, технологии, исследования">
                        </div>
                        
                        <div class="form-group">
                            <label>Приоритет (1-10):</label>
                            <input type="number" min="1" max="10" id="card-priority-${sectionKey}-${index}" value="${card.priority || 5}">
                        </div>
                    </div>
                </details>
            </div>
        `).join('');
    },

    // Переключение между разделами
    showSection: function(sectionKey, button) {
        // Убираем активность со всех вкладок и разделов
        document.querySelectorAll('.section-tab').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-section-editor').forEach(section => section.classList.remove('active'));
        
        // Активируем выбранную вкладку и раздел
        button.classList.add('active');
        const sectionElement = document.getElementById(`content-section-${sectionKey}`);
        if (sectionElement) {
            sectionElement.classList.add('active');
        }
    },

    // Добавление новой карточки
    addCard: function(sectionKey) {
        if (!currentData[sectionKey].cards) {
            currentData[sectionKey].cards = [];
        }

        const newCard = {
            title: 'Новое направление',
            text: 'li Описание направления\nli Ключевые особенности\nli Применение',
            icon: '🔬',
            tags: ['новое'],
            priority: 5
        };

        currentData[sectionKey].cards.push(newCard);

        // Обновляем интерфейс
        const container = document.getElementById(`cards-container-${sectionKey}`);
        container.innerHTML = this.generateCards(currentData[sectionKey].cards, sectionKey);
    },

    // Удаление карточки
    removeCard: function(sectionKey, cardIndex) {
        if (confirm('Удалить эту карточку?')) {
            currentData[sectionKey].cards.splice(cardIndex, 1);
            
            // Обновляем интерфейс
            const container = document.getElementById(`cards-container-${sectionKey}`);
            container.innerHTML = this.generateCards(currentData[sectionKey].cards, sectionKey);
        }
    },

    // Добавление нового раздела
    addSection: function() {
        const sectionName = prompt('Введите название нового раздела:', 'noviy_razdel');
        if (!sectionName || sectionName.trim() === '') return;

        const sectionKey = sectionName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        
        if (currentData[sectionKey]) {
            alert('Раздел с таким названием уже существует!');
            return;
        }

        // Создаем новый раздел
        currentData[sectionKey] = {
            title: sectionName,
            description: 'Описание нового раздела',
            cards: []
        };

        // Перестраиваем весь интерфейс
        this.build();
        
        // Активируем новый раздел
        setTimeout(() => {
            const newTab = document.querySelector(`[onclick*="${sectionKey}"]`);
            if (newTab) {
                newTab.click();
            }
        }, 100);
    },

    // Сбор данных из формы
    gatherData: function() {
        const updatedData = {};

        // Проходим по всем разделам
        Object.keys(currentData).forEach(sectionKey => {
            updatedData[sectionKey] = {
                title: val(`section-title-${sectionKey}`) || currentData[sectionKey].title,
                description: val(`section-desc-${sectionKey}`) || currentData[sectionKey].description,
                cards: []
            };

            // Собираем карточки для раздела
            const cardsContainer = document.getElementById(`cards-container-${sectionKey}`);
            if (cardsContainer) {
                const cardElements = cardsContainer.querySelectorAll('.modal-card-editor');
                cardElements.forEach((cardEl, cardIndex) => {
                    const title = val(`card-title-${sectionKey}-${cardIndex}`);
                    const text = val(`card-text-${sectionKey}-${cardIndex}`);
                    
                    if (title.trim() || text.trim()) {
                        const tagsInput = val(`card-tags-${sectionKey}-${cardIndex}`);
                        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
                        
                        updatedData[sectionKey].cards.push({
                            title: title,
                            text: text,
                            icon: val(`card-icon-${sectionKey}-${cardIndex}`) || '🔬',
                            tags: tags,
                            priority: parseInt(val(`card-priority-${sectionKey}-${cardIndex}`)) || 5
                        });
                    }
                });
            }
        });

        return updatedData;
    },

    // Сохранение данных
    save: function() {
        const updatedData = this.gatherData();
        downloadJS('content-data.js', 'window.modalContentData', updatedData);
    },

    // Предварительный просмотр
    preview: function() {
        const data = this.gatherData();
        
        let html = `
            <html>
            <head>
                <title>Предпросмотр: База направлений НТК</title>
                <style>
                    body {font: 14px Arial; padding: 20px; background: #f5f5f5;}
                    h1 {color: #0e4094; text-align: center; margin-bottom: 30px;}
                    h2 {color: #0e4094; margin-top: 40px; padding-bottom: 10px; border-bottom: 2px solid #0e4094;}
                    .section-desc {font-style: italic; color: #666; margin-bottom: 20px;}
                    .card {background: white; margin: 20px 0; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 4px solid #0e4094;}
                    .card h3 {color: #0e4094; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;}
                    .card-content {line-height: 1.6;}
                    .card-content li {margin: 8px 0; padding-left: 10px;}
                    .tags {margin-top: 15px; display: flex; gap: 8px; flex-wrap: wrap;}
                    .tag {background: #e3f2fd; color: #1976d2; padding: 4px 12px; border-radius: 15px; font-size: 0.85em;}
                    .priority {background: #fff3e0; color: #f57c00; padding: 2px 8px; border-radius: 10px; font-size: 0.8em; margin-left: auto;}
                </style>
            </head>
            <body>
                <h1>🗂️ База актуальных направлений тем НТК</h1>
        `;

        // Генерируем содержимое для каждого раздела
        Object.keys(data).forEach(sectionKey => {
            const section = data[sectionKey];
            html += `
                <h2>${section.title}</h2>
                <div class="section-desc">${section.description}</div>
            `;

            // Сортируем карточки по приоритету
            const sortedCards = [...section.cards].sort((a, b) => (b.priority || 5) - (a.priority || 5));

            sortedCards.forEach(card => {
                // Преобразуем текст с li в HTML список
                let cardContent = card.text.replace(/li\s+/g, '<li>').replace(/\n/g, '<br>');
                if (cardContent.includes('<li>')) {
                    cardContent = '<ul>' + cardContent.replace(/<br><li>/g, '</li><li>') + '</li></ul>';
                }

                html += `
                    <div class="card">
                        <h3>
                            <span>${card.icon || '🔬'}</span>
                            <span>${card.title}</span>
                            <span class="priority">Приоритет: ${card.priority || 5}</span>
                        </h3>
                        <div class="card-content">${cardContent}</div>
                        ${card.tags && card.tags.length > 0 ? `
                            <div class="tags">
                                ${card.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
        });

        html += `
                <div style="margin-top: 40px; text-align: center; color: #666; font-size: 0.9em;">
                    <p>Всего разделов: ${Object.keys(data).length}</p>
                    <p>Всего направлений: ${Object.values(data).reduce((sum, section) => sum + section.cards.length, 0)}</p>
                    <p>Сгенерировано: ${new Date().toLocaleString('ru-RU')}</p>
                </div>
            </body>
            </html>
        `;

        openPreview(html);
    }
};

console.log('✅ ContentEditor загружен');
