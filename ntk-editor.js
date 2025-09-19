// ntk-editor.js - Редактор НТК 2025
// Версия: 1.1 - 19.09.2025 (Исправлена функция save)
window.NtkEditor = {
    // Основная функция построения редактора
    build: function() {
        if (!currentData || !currentPageConf) {
            console.error("NtkEditor: Нет данных для инициализации");
            return;
        }

        let html = `
            <h3 class="section-title">Редактор НТК 2025</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из ntk-data.js</strong>
            </p>

            <!-- Настройки страницы -->
            <div class="section-container">
                <h4>📄 Настройки страницы</h4>
                <div class="form-group">
                    <label>Заголовок страницы:</label>
                    <input type="text" id="ntk-page-title" value="${currentData.pageSettings?.title || ''}" placeholder="НТК 2025">
                </div>
                <div class="form-group">
                    <label>Hero-заголовок:</label>
                    <input type="text" id="ntk-hero-title" value="${currentData.pageSettings?.heroTitle || ''}" placeholder="Научно-технологические конференции">
                </div>
                <div class="form-group">
                    <label>Основной заголовок:</label>
                    <input type="text" id="ntk-main-section-title" value="${currentData.pageSettings?.mainSectionTitle || ''}" placeholder="НТК 2025 - Программа и регистрация">
                </div>
            </div>

            <!-- Таймлайн 2025 -->
            <div class="section-container">
                <h4>📅 Таймлайн НТК 2025</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="ntk-timeline-title" value="${currentData.timeline?.sectionTitle || ''}" placeholder="График НТК 2025">
                </div>
                <div class="form-group">
                    <label>Описание секции:</label>
                    <textarea id="ntk-timeline-subtitle" placeholder="Подробная программа мероприятий">${currentData.timeline?.sectionSubtitle || ''}</textarea>
                </div>
                <div id="ntk-timeline-stages-container">
                    ${this.generateTimelineStagesEditor(currentData.timeline?.stages)}
                </div>
                <button class="add-btn" onclick="NtkEditor.addTimelineStage()">➕ Добавить этап</button>
            </div>

            <!-- 5 шагов до участия -->
            <div class="section-container">
                <h4>📝 5 шагов до участия в НТК</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="ntk-steps-title" value="${currentData.roadmapSteps?.sectionTitle || ''}" placeholder="5 шагов для участия">
                </div>
                <div class="form-group">
                    <label>Описание секции:</label>
                    <textarea id="ntk-steps-subtitle" placeholder="Пошаговое руководство">${currentData.roadmapSteps?.sectionSubtitle || ''}</textarea>
                </div>
                <div id="ntk-roadmap-steps-container">
                    ${this.generateRoadmapStepsEditor(currentData.roadmapSteps?.steps)}
                </div>
                <button class="add-btn" onclick="NtkEditor.addRoadmapStep()">➕ Добавить шаг</button>
            </div>

            <!-- Полезные советы -->
            <div class="section-container">
                <h4>💡 Полезные советы</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="ntk-tips-title" value="${currentData.tips?.sectionTitle || ''}" placeholder="Полезные советы">
                </div>
                <div class="form-group">
                    <label>Описание секции:</label>
                    <textarea id="ntk-tips-subtitle" placeholder="Рекомендации для участников">${currentData.tips?.sectionSubtitle || ''}</textarea>
                </div>
                <div id="ntk-tips-container">
                    ${this.generateTipsEditor(currentData.tips?.tipCards)}
                </div>
                <button class="add-btn" onclick="NtkEditor.addTip()">➕ Добавить совет</button>
            </div>

            <!-- Призыв к действию -->
            <div class="section-container">
                <h4>📢 Призыв к действию</h4>
                <div class="form-group">
                    <label>Заголовок CTA:</label>
                    <input type="text" id="ntk-cta-title" value="${currentData.callToAction?.title || ''}" placeholder="Готовы принять участие в НТК?">
                </div>
                <div class="form-group">
                    <label>Выделенный текст:</label>
                    <textarea id="ntk-cta-highlight" placeholder="Важная информация для участников">${currentData.callToAction?.highlightText || ''}</textarea>
                </div>

                <h5>🔗 Кнопки действий</h5>
                <div id="ntk-cta-buttons-container">
                    ${this.generateCTAButtonsEditor(currentData.callToAction?.buttons)}
                </div>
                <button class="add-btn" onclick="NtkEditor.addCTAButton()">➕ Добавить кнопку</button>
            </div>

            <!-- Кнопки управления -->
            <div class="btn-group" style="margin-top: 40px;">
                <button class="btn btn-preview" onclick="NtkEditor.preview()">👁️ Предпросмотр</button>
                <button class="btn btn-save" onclick="NtkEditor.save()">💾 Сохранить ntk-data.js</button>
            </div>
        `;

        contentEdit.innerHTML = html;
    },

    // Генерация редактора этапов таймлайна
    generateTimelineStagesEditor: function(stages) {
        if (!stages || stages.length === 0) {
            return '<p class="empty-state">Этапы не настроены. Добавьте первый этап.</p>';
        }

        return stages.map((stage, index) => `
            <div class="stage-editor-card" id="stage-${index}">
                <div class="card-header">
                    <h4>📅 ${index + 1}. ${stage.stage}</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeTimelineStage(${index})">❌</button>
                </div>
                <div class="form-group">
                    <label>Название этапа:</label>
                    <textarea id="stage-name-${index}" placeholder="Название этапа">${stage.stage}</textarea>
                </div>
                <div class="form-group">
                    <label>Ответственный:</label>
                    <input type="text" id="stage-responsible-${index}" value="${stage.responsible}" placeholder="Ответственное лицо">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Месяцы проведения:</label>
                        <input type="text" id="stage-months-${index}" value="${stage.months ? stage.months.join(', ') : ''}" placeholder="1,2,3">
                    </div>
                    <div class="form-group">
                        <label>Специальные отметки:</label>
                        <input type="text" id="stage-special-${index}" value="${stage.special ? stage.special.join(', ') : ''}" placeholder="1,5">
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Генерация редактора шагов дорожной карты
    generateRoadmapStepsEditor: function(steps) {
        if (!steps || steps.length === 0) {
            return '<p class="empty-state">Шаги не настроены. Добавьте первый шаг.</p>';
        }

        return steps.map((step, index) => `
            <div class="roadmap-step-editor-card" id="roadmap-step-${index}">
                <div class="card-header">
                    <h4>📝 ${index + 1}. ${step.title}</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeRoadmapStep(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Номер шага:</label>
                        <input type="text" id="roadmap-step-number-${index}" value="${step.number}" placeholder="1">
                    </div>
                    <div class="form-group">
                        <label>Иконка:</label>
                        <input type="text" id="roadmap-step-icon-${index}" value="${step.icon}" placeholder="📋">
                    </div>
                </div>
                <div class="form-group">
                    <label>Заголовок:</label>
                    <input type="text" id="roadmap-step-title-${index}" value="${step.title}" placeholder="Название шага">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="roadmap-step-description-${index}" placeholder="Подробное описание шага">${step.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Список элементов (каждый с новой строки):</label>
                    <textarea id="roadmap-step-items-${index}" rows="4" placeholder="• Элемент 1\n• Элемент 2">${step.items ? step.items.join('\n') : ''}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Генерация редактора советов
    generateTipsEditor: function(tips) {
        if (!tips || tips.length === 0) {
            return '<p class="empty-state">Советы не настроены. Добавьте первый совет.</p>';
        }

        return tips.map((tip, index) => `
            <div class="tip-editor-card" id="tip-${index}">
                <div class="card-header">
                    <h4>💡 ${index + 1}. ${tip.title}</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeTip(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Иконка:</label>
                        <input type="text" id="tip-icon-${index}" value="${tip.icon}" placeholder="💡">
                    </div>
                    <div class="form-group">
                        <label>Заголовок:</label>
                        <input type="text" id="tip-title-${index}" value="${tip.title}" placeholder="Название совета">
                    </div>
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="tip-description-${index}" rows="3" placeholder="Полезный совет для участников">${tip.description}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Генерация редактора CTA кнопок
    generateCTAButtonsEditor: function(buttons) {
        if (!buttons || buttons.length === 0) {
            return '<p class="empty-state">Кнопки действий не настроены. Добавьте первую кнопку.</p>';
        }

        return buttons.map((button, index) => `
            <div class="cta-button-editor-card" id="cta-button-${index}">
                <div class="card-header">
                    <h4>🔗 ${index + 1}</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeCTAButton(${index})">❌</button>
                </div>
                <div class="form-group">
                    <label>Текст кнопки:</label>
                    <input type="text" id="cta-button-text-${index}" value="${button.text}" placeholder="Зарегистрироваться">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>URL:</label>
                        <input type="text" id="cta-button-url-${index}" value="${button.url}" placeholder="tema.html">
                    </div>
                    <div class="form-group">
                        <label>Тип кнопки:</label>
                        <select id="cta-button-type-${index}">
                            <option value="primary" ${button.type === 'primary' ? 'selected' : ''}>Primary</option>
                            <option value="secondary" ${button.type === 'secondary' ? 'selected' : ''}>Secondary</option>
                        </select>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Добавление нового этапа таймлайна
    addTimelineStage: function() {
        const container = document.getElementById('ntk-timeline-stages-container');
        const index = container.querySelectorAll('.stage-editor-card').length;
        
        const stageHTML = `
            <div class="stage-editor-card" id="stage-${index}">
                <div class="card-header">
                    <h4>📅 ${index + 1}. Новый этап</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeTimelineStage(${index})">❌</button>
                </div>
                <div class="form-group">
                    <label>Название этапа:</label>
                    <textarea id="stage-name-${index}" placeholder="Название этапа">Новый этап ${index + 1}</textarea>
                </div>
                <div class="form-group">
                    <label>Ответственный:</label>
                    <input type="text" id="stage-responsible-${index}" value="" placeholder="Ответственное лицо">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Месяцы проведения:</label>
                        <input type="text" id="stage-months-${index}" value="" placeholder="1,2,3">
                    </div>
                    <div class="form-group">
                        <label>Специальные отметки:</label>
                        <input type="text" id="stage-special-${index}" value="" placeholder="1,5">
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', stageHTML);
    },

    // Добавление нового шага дорожной карты
    addRoadmapStep: function() {
        const container = document.getElementById('ntk-roadmap-steps-container');
        const index = container.querySelectorAll('.roadmap-step-editor-card').length;
        
        const stepHTML = `
            <div class="roadmap-step-editor-card" id="roadmap-step-${index}">
                <div class="card-header">
                    <h4>📝 ${index + 1}. Новый шаг</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeRoadmapStep(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Номер шага:</label>
                        <input type="text" id="roadmap-step-number-${index}" value="${index + 1}" placeholder="1">
                    </div>
                    <div class="form-group">
                        <label>Иконка:</label>
                        <input type="text" id="roadmap-step-icon-${index}" value="📋" placeholder="📋">
                    </div>
                </div>
                <div class="form-group">
                    <label>Заголовок:</label>
                    <input type="text" id="roadmap-step-title-${index}" value="Шаг ${index + 1}" placeholder="Название шага">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="roadmap-step-description-${index}" placeholder="Подробное описание шага"></textarea>
                </div>
                <div class="form-group">
                    <label>Список элементов (каждый с новой строки):</label>
                    <textarea id="roadmap-step-items-${index}" rows="4" placeholder="• Элемент 1\n• Элемент 2"></textarea>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', stepHTML);
    },

    // Добавление нового совета
    addTip: function() {
        const container = document.getElementById('ntk-tips-container');
        const index = container.querySelectorAll('.tip-editor-card').length;
        
        const tipHTML = `
            <div class="tip-editor-card" id="tip-${index}">
                <div class="card-header">
                    <h4>💡 ${index + 1}. Новый совет</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeTip(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Иконка:</label>
                        <input type="text" id="tip-icon-${index}" value="💡" placeholder="💡">
                    </div>
                    <div class="form-group">
                        <label>Заголовок:</label>
                        <input type="text" id="tip-title-${index}" value="Совет ${index + 1}" placeholder="Название совета">
                    </div>
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="tip-description-${index}" rows="3" placeholder="Полезный совет для участников"></textarea>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', tipHTML);
    },

    // Добавление новой CTA кнопки
    addCTAButton: function() {
        const container = document.getElementById('ntk-cta-buttons-container');
        const index = container.querySelectorAll('.cta-button-editor-card').length;
        
        const buttonHTML = `
            <div class="cta-button-editor-card" id="cta-button-${index}">
                <div class="card-header">
                    <h4>🔗 ${index + 1}</h4>
                    <button class="remove-card-btn" onclick="NtkEditor.removeCTAButton(${index})">❌</button>
                </div>
                <div class="form-group">
                    <label>Текст кнопки:</label>
                    <input type="text" id="cta-button-text-${index}" value="Кнопка ${index + 1}" placeholder="Зарегистрироваться">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>URL:</label>
                        <input type="text" id="cta-button-url-${index}" value="" placeholder="tema.html">
                    </div>
                    <div class="form-group">
                        <label>Тип кнопки:</label>
                        <select id="cta-button-type-${index}">
                            <option value="primary" selected>Primary</option>
                            <option value="secondary">Secondary</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', buttonHTML);
    },

    // Удаление элементов
    removeTimelineStage: function(index) {
        if (confirm('Удалить этот этап? Действие необратимо.')) {
            document.getElementById(`stage-${index}`)?.remove();
        }
    },

    removeRoadmapStep: function(index) {
        if (confirm('Удалить этот шаг? Действие необратимо.')) {
            document.getElementById(`roadmap-step-${index}`)?.remove();
        }
    },

    removeTip: function(index) {
        if (confirm('Удалить этот совет? Действие необратимо.')) {
            document.getElementById(`tip-${index}`)?.remove();
        }
    },

    removeCTAButton: function(index) {
        if (confirm('Удалить эту кнопку? Действие необратимо.')) {
            document.getElementById(`cta-button-${index}`)?.remove();
        }
    },

    // Безопасное получение значения элемента
    val: function(elementId) {
        try {
            const element = document.getElementById(elementId);
            return element ? element.value : '';
        } catch (error) {
            console.warn("NtkEditor: Ошибка получения значения элемента", elementId, error);
            return '';
        }
    },

    // Сбор данных этапов таймлайна
    collectTimelineStages: function() {
        const stages = [];
        const container = document.getElementById('ntk-timeline-stages-container');
        
        if (!container) return stages;

        const stageCards = container.querySelectorAll('.stage-editor-card');
        stageCards.forEach((card, index) => {
            const monthsStr = this.val(`stage-months-${index}`);
            const specialStr = this.val(`stage-special-${index}`);
            
            stages.push({
                stage: this.val(`stage-name-${index}`) || `Этап ${index + 1}`,
                responsible: this.val(`stage-responsible-${index}`) || '',
                months: monthsStr ? monthsStr.split(',').map(m => m.trim()).filter(m => m) : [],
                special: specialStr ? specialStr.split(',').map(s => s.trim()).filter(s => s) : []
            });
        });

        return stages;
    },

    // Сбор данных шагов дорожной карты
    collectRoadmapSteps: function() {
        const steps = [];
        const container = document.getElementById('ntk-roadmap-steps-container');
        
        if (!container) return steps;

        const stepCards = container.querySelectorAll('.roadmap-step-editor-card');
        stepCards.forEach((card, index) => {
            const itemsStr = this.val(`roadmap-step-items-${index}`);
            
            steps.push({
                number: this.val(`roadmap-step-number-${index}`) || `${index + 1}`,
                icon: this.val(`roadmap-step-icon-${index}`) || '📋',
                title: this.val(`roadmap-step-title-${index}`) || `Шаг ${index + 1}`,
                description: this.val(`roadmap-step-description-${index}`) || '',
                items: itemsStr ? itemsStr.split('\n').map(i => i.trim()).filter(i => i) : []
            });
        });

        return steps;
    },

    // Сбор данных советов
    collectTips: function() {
        const tips = [];
        const container = document.getElementById('ntk-tips-container');
        
        if (!container) return tips;

        const tipCards = container.querySelectorAll('.tip-editor-card');
        tipCards.forEach((card, index) => {
            tips.push({
                icon: this.val(`tip-icon-${index}`) || '💡',
                title: this.val(`tip-title-${index}`) || `Совет ${index + 1}`,
                description: this.val(`tip-description-${index}`) || ''
            });
        });

        return tips;
    },

    // Сбор данных CTA кнопок
    collectCTAButtons: function() {
        const buttons = [];
        const container = document.getElementById('ntk-cta-buttons-container');
        
        if (!container) return buttons;

        const buttonCards = container.querySelectorAll('.cta-button-editor-card');
        buttonCards.forEach((card, index) => {
            buttons.push({
                text: this.val(`cta-button-text-${index}`) || `Кнопка ${index + 1}`,
                url: this.val(`cta-button-url-${index}`) || '',
                type: this.val(`cta-button-type-${index}`) || 'primary'
            });
        });

        return buttons;
    },

    // Сбор всех данных - ИСПРАВЛЕННАЯ ФУНКЦИЯ
    collectAllData: function() {
        try {
            return {
                pageSettings: {
                    title: this.val('ntk-page-title') || 'НТК 2025',
                    heroTitle: this.val('ntk-hero-title') || 'Научно-технологические конференции',
                    mainSectionTitle: this.val('ntk-main-section-title') || 'НТК 2025 - Программа и регистрация',
                    lastUpdated: new Date().toISOString()
                },
                timeline: {
                    sectionTitle: this.val('ntk-timeline-title') || 'График НТК 2025',
                    sectionSubtitle: this.val('ntk-timeline-subtitle') || 'Подробная программа мероприятий',
                    stages: this.collectTimelineStages()
                },
                roadmapSteps: {
                    sectionTitle: this.val('ntk-steps-title') || '5 шагов для участия',
                    sectionSubtitle: this.val('ntk-steps-subtitle') || 'Пошаговое руководство',
                    steps: this.collectRoadmapSteps()
                },
                tips: {
                    sectionTitle: this.val('ntk-tips-title') || 'Полезные советы',
                    sectionSubtitle: this.val('ntk-tips-subtitle') || 'Рекомендации для участников',
                    tipCards: this.collectTips()
                },
                callToAction: {
                    title: this.val('ntk-cta-title') || 'Готовы принять участие в НТК?',
                    highlightText: this.val('ntk-cta-highlight') || 'Важная информация для участников',
                    buttons: this.collectCTAButtons()
                }
            };
        } catch (error) {
            console.error("NtkEditor: Ошибка при сборе данных", error);
            return {
                pageSettings: { title: 'НТК 2025', heroTitle: 'Научно-технологические конференции', mainSectionTitle: 'НТК 2025 - Программа и регистрация', lastUpdated: new Date().toISOString() },
                timeline: { sectionTitle: 'График НТК 2025', sectionSubtitle: 'Подробная программа мероприятий', stages: [] },
                roadmapSteps: { sectionTitle: '5 шагов для участия', sectionSubtitle: 'Пошаговое руководство', steps: [] },
                tips: { sectionTitle: 'Полезные советы', sectionSubtitle: 'Рекомендации для участников', tipCards: [] },
                callToAction: { title: 'Готовы принять участие в НТК?', highlightText: 'Важная информация для участников', buttons: [] }
            };
        }
    },

    // Предпросмотр
    preview: function() {
        const data = this.collectAllData();
        
        let html = `
            <h1>${data.pageSettings.heroTitle}</h1>
            <h2>${data.pageSettings.mainSectionTitle}</h2>
            <hr>
            <h3>${data.timeline.sectionTitle}</h3>
            <p><em>${data.timeline.sectionSubtitle}</em></p>
            <p><strong>Этапов в таймлайне:</strong> ${data.timeline.stages.length}</p>
            <hr>
            <h3>${data.roadmapSteps.sectionTitle}</h3>
            <p><em>${data.roadmapSteps.sectionSubtitle}</em></p>
            <p><strong>Шагов для участия:</strong> ${data.roadmapSteps.steps.length}</p>
            <hr>
            <h3>${data.tips.sectionTitle}</h3>
            <p><em>${data.tips.sectionSubtitle}</em></p>
            <p><strong>Полезных советов:</strong> ${data.tips.tipCards.length}</p>
            <hr>
            <p><strong>Файл ntk-data.js готов к скачиванию!</strong></p>
        `;

        if (typeof openPreview === 'function') {
            openPreview(html);
        } else {
            alert('Предпросмотр недоступен');
        }
    },

    // Сохранение данных - ИСПРАВЛЕННАЯ ФУНКЦИЯ
    save: function() {
        const updatedData = this.collectAllData();
        
        // Используем downloadJS как в других редакторах  
        downloadJS('ntk-data.js', `window.ntkData = ${JSON.stringify(updatedData, null, 4)};`);
        
        // Обновляем текущие данные
        currentData = {...currentData, ...updatedData};
    }
};

// Глобальная регистрация
window.NtkEditor = window.NtkEditor;
console.log("✅ NtkEditor загружен");