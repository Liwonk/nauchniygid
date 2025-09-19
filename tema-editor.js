// tema-editor.js - Редактор страницы "Выбор темы для участия в НТК"
// Версия: 1.0

window.TemaEditor = {
    // Основная функция построения редактора
    build: function() {
        if (!currentData || !currentPageConf) {
            console.error('TemaEditor: Данные не загружены');
            return;
        }

        let html = `
            <h3 class="section-title">🎯 Редактирование страницы выбора темы НТК</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из tema-data.js</strong>
            </p>
            
            <!-- Основные настройки страницы -->
            <div class="section-container">
                <h4>⚙️ Основные настройки страницы</h4>
                
                <div class="form-group">
                    <label>Заголовок страницы:</label>
                    <input type="text" id="tema-page-title" value="${currentData.pageSettings?.title || ''}" placeholder="Заголовок страницы">
                </div>
                
                <div class="form-group">
                    <label>Заголовок Hero-секции:</label>
                    <input type="text" id="tema-hero-title" value="${currentData.pageSettings?.heroTitle || ''}" placeholder="НАУЧНЫЙ НАВИГАТОР">
                </div>
                
                <div class="form-group">
                    <label>Основной заголовок раздела:</label>
                    <input type="text" id="tema-main-section-title" value="${currentData.pageSettings?.mainSectionTitle || ''}" placeholder="Выбор темы для участия в НТК">
                </div>
            </div>

            <!-- Алгоритм выбора темы -->
            <div class="section-container">
                <h4>📋 Алгоритм выбора темы (6 шагов)</h4>
                
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="tema-algorithm-title" value="${currentData.algorithm?.sectionTitle || ''}" placeholder="Алгоритм выбора темы для НТК">
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="tema-algorithm-subtitle" placeholder="Пошаговое руководство">${currentData.algorithm?.sectionSubtitle || ''}</textarea>
                </div>
                
                <div id="tema-algorithm-steps-container">
                    ${this.generateStepsEditor(currentData.algorithm?.steps || [])}
                </div>
                
                <button class="add-btn" onclick="TemaEditor.addStep()">+ Добавить шаг</button>
            </div>

            <!-- Реализация проекта -->
            <div class="section-container">
                <h4>🚀 Реализация проекта (7 фаз)</h4>
                
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="tema-implementation-title" value="${currentData.implementation?.sectionTitle || ''}" placeholder="Реализация проекта">
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="tema-implementation-subtitle" placeholder="Практические шаги">${currentData.implementation?.sectionSubtitle || ''}</textarea>
                </div>
                
                <div id="tema-implementation-phases-container">
                    ${this.generatePhasesEditor(currentData.implementation?.phases || [])}
                </div>
                
                <button class="add-btn" onclick="TemaEditor.addPhase()">+ Добавить фазу</button>
            </div>

            <!-- Критерии оценки -->
            <div class="section-container">
                <h4>📊 Критерии оценки проектов</h4>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Заголовок секции:</label>
                        <input type="text" id="tema-criteria-title" value="${currentData.evaluationCriteria?.sectionTitle || ''}" placeholder="Система оценки проектов НТК">
                    </div>
                    <div class="form-group">
                        <label>Максимальный балл:</label>
                        <input type="number" id="tema-criteria-max-score" value="${currentData.evaluationCriteria?.maxTotalScore || 21}" min="1" max="50">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="tema-criteria-subtitle" placeholder="Описание системы оценки">${currentData.evaluationCriteria?.sectionSubtitle || ''}</textarea>
                </div>
                
                <div id="tema-criteria-container">
                    ${this.generateCriteriaEditor(currentData.evaluationCriteria?.criteria || [])}
                </div>
                
                <button class="add-btn" onclick="TemaEditor.addCriterion()">+ Добавить критерий</button>
            </div>

            <!-- Дополнительная информация -->
            <div class="section-container">
                <h4>💡 Дополнительная информация</h4>
                
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="tema-additional-title" value="${currentData.additionalInfo?.sectionTitle || ''}" placeholder="Дополнительная информация">
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="tema-additional-subtitle" placeholder="Важные рекомендации">${currentData.additionalInfo?.sectionSubtitle || ''}</textarea>
                </div>
                
                <div id="tema-additional-tips-container">
                    ${this.generateTipsEditor(currentData.additionalInfo?.tips || [])}
                </div>
                
                <button class="add-btn" onclick="TemaEditor.addTip()">+ Добавить совет</button>
            </div>

            <!-- Призыв к действию -->
            <div class="section-container">
                <h4>🎯 Призыв к действию</h4>
                
                <div class="form-group">
                    <label>Заголовок CTA:</label>
                    <input type="text" id="tema-cta-title" value="${currentData.callToAction?.title || ''}" placeholder="Готовы выбрать тему для НТК?">
                </div>
                
                <div class="form-group">
                    <label>Выделенный текст:</label>
                    <textarea id="tema-cta-highlight" placeholder="Важный текст с выделением">${currentData.callToAction?.highlightText || ''}</textarea>
                </div>
                
                <h5>Кнопки действий:</h5>
                <div id="tema-cta-buttons-container">
                    ${this.generateCTAButtonsEditor(currentData.callToAction?.buttons || [])}
                </div>
                <button class="add-btn" onclick="TemaEditor.addCTAButton()">+ Добавить кнопку</button>
            </div>

            <div class="btn-group" style="margin-top: 40px;">
                <button class="btn btn-preview" onclick="TemaEditor.preview()">👁️ Предварительный просмотр</button>
                <button class="btn btn-save" onclick="TemaEditor.save()">💾 Скачать tema-data.js</button>
            </div>
        `;

        contentEdit.innerHTML = html;
    },

    generateStepsEditor: function(steps) {
        if (!steps || steps.length === 0) {
            return '<p class="empty-state">Шаги алгоритма не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }
        
        return steps.map((step, index) => `
            <div class="step-editor-card" id="step-${index}">
                <div class="card-header">
                    <h4>Шаг ${index + 1}: ${step.title || 'Новый шаг'}</h4>
                    <button class="remove-card-btn" onclick="TemaEditor.removeStep(${index})">Удалить</button>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Номер шага:</label>
                        <input type="text" id="step-number-${index}" value="${step.number || ''}" placeholder="ШАГ 1">
                    </div>
                    <div class="form-group">
                        <label>Иконка (эмодзи):</label>
                        <input type="text" id="step-icon-${index}" value="${step.icon || ''}" placeholder="🔍">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Заголовок шага:</label>
                    <input type="text" id="step-title-${index}" value="${step.title || ''}" placeholder="Название шага">
                </div>
                
                <div class="form-group">
                    <label>Описание шага:</label>
                    <textarea id="step-description-${index}" placeholder="Краткое описание">${step.description || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label>Пункты шага:</label>
                    <div id="step-items-${index}" class="step-items-editor">
                        ${this.generateStepItemsEditor(step.items || [], index)}
                    </div>
                    <button type="button" class="add-item-btn" onclick="TemaEditor.addStepItem(${index})">➕ Добавить пункт</button>
                </div>
            </div>
        `).join('');
    },

    // Новая функция для генерации редактора пунктов с ссылками
    generateStepItemsEditor: function(items, stepIndex) {
        return items.map((item, itemIndex) => `
            <div class="step-item-editor" id="step-${stepIndex}-item-${itemIndex}">
                <div class="step-item-header">
                    <label>Тип пункта:</label>
                    <select id="step-${stepIndex}-item-${itemIndex}-type" onchange="TemaEditor.toggleItemType(${stepIndex}, ${itemIndex})">
                        <option value="text" ${item.type === 'text' ? 'selected' : ''}>Обычный текст</option>
                        <option value="link" ${item.type === 'link' ? 'selected' : ''}>Активная ссылка</option>
                    </select>
                    <button type="button" class="remove-item-btn" onclick="TemaEditor.removeStepItem(${stepIndex}, ${itemIndex})">❌</button>
                </div>
                
                <div class="form-group">
                    <label>Текст пункта:</label>
                    <input type="text" id="step-${stepIndex}-item-${itemIndex}-content" value="${item.content || ''}" placeholder="Содержание пункта">
                </div>
                
                <div class="link-fields" id="step-${stepIndex}-item-${itemIndex}-link-fields" style="display: ${item.type === 'link' ? 'block' : 'none'};">
                    <div class="form-row">
                        <div class="form-group">
                            <label>URL ссылки:</label>
                            <input type="text" id="step-${stepIndex}-item-${itemIndex}-url" value="${item.url || ''}" placeholder="baza.html">
                        </div>
                        <div class="form-group">
                            <label>Описание ссылки:</label>
                            <input type="text" id="step-${stepIndex}-item-${itemIndex}-description" value="${item.description || ''}" placeholder="страничка с базой">
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Новые функции управления
    toggleItemType: function(stepIndex, itemIndex) {
        const typeSelect = document.getElementById(`step-${stepIndex}-item-${itemIndex}-type`);
        const linkFields = document.getElementById(`step-${stepIndex}-item-${itemIndex}-link-fields`);
        
        if (typeSelect.value === 'link') {
            linkFields.style.display = 'block';
        } else {
            linkFields.style.display = 'none';
        }
    },

    addStepItem: function(stepIndex) {
        const container = document.getElementById(`step-items-${stepIndex}`);
        const itemIndex = container.children.length;
        
        const newItemHTML = this.generateStepItemsEditor([{
            type: 'text',
            content: '',
            url: '',
            description: ''
        }], stepIndex).replace(/item-0/g, `item-${itemIndex}`);
        
        container.insertAdjacentHTML('beforeend', newItemHTML);
    },

    removeStepItem: function(stepIndex, itemIndex) {
        const itemElement = document.getElementById(`step-${stepIndex}-item-${itemIndex}`);
        if (itemElement) {
            itemElement.remove();
        }
    },

    // Генерация редактора фаз реализации
    generatePhasesEditor: function(phases) {
        if (!phases || phases.length === 0) {
            return '<p class="empty-state">Фазы реализации не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }
        
        return phases.map((phase, index) => `
            <div class="phase-editor-card" id="phase-${index}">
                <div class="card-header">
                    <h4>Фаза ${index + 1}: ${phase.title || 'Новая фаза'}</h4>
                    <button class="remove-card-btn" onclick="TemaEditor.removePhase(${index})">Удалить</button>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Иконка (эмодзи):</label>
                        <input type="text" id="phase-icon-${index}" value="${phase.icon || ''}" placeholder="🎯">
                    </div>
                    <div class="form-group">
                        <label>Цвет фазы:</label>
                        <input type="color" id="phase-color-${index}" value="${phase.color || '#0e4094'}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Заголовок фазы:</label>
                    <input type="text" id="phase-title-${index}" value="${phase.title || ''}" placeholder="Название фазы">
                </div>
                
                <div class="form-group">
                    <label>Краткое описание:</label>
                    <textarea id="phase-description-${index}" placeholder="Краткое описание">${phase.description || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label>Детальное описание:</label>
                    <textarea id="phase-details-${index}" rows="3" placeholder="Подробное описание фазы">${phase.details || ''}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Генерация редактора критериев
    generateCriteriaEditor: function(criteria) {
        if (!criteria || criteria.length === 0) {
            return '<p class="empty-state">Критерии оценки не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }
        
        return criteria.map((criterion, index) => `
            <div class="criterion-editor-card" id="criterion-${index}">
                <div class="card-header">
                    <h4>Критерий ${index + 1}: ${criterion.name || 'Новый критерий'}</h4>
                    <button class="remove-card-btn" onclick="TemaEditor.removeCriterion(${index})">Удалить</button>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Название критерия:</label>
                        <input type="text" id="criterion-name-${index}" value="${criterion.name || ''}" placeholder="Название критерия">
                    </div>
                    <div class="form-group">
                        <label>Максимальный балл:</label>
                        <input type="number" id="criterion-max-score-${index}" value="${criterion.maxScore || 3}" min="1" max="10">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Описание шкалы:</label>
                    <textarea id="criterion-scale-desc-${index}" placeholder="Что оценивает этот критерий">${criterion.scaleDescription || ''}</textarea>
                </div>
                
                <h5>Уровни оценки:</h5>
                <div id="criterion-levels-${index}">
                    ${this.generateLevelsEditor(criterion.levels || [], index)}
                </div>
                <button type="button" class="add-btn" onclick="TemaEditor.addLevel(${index})">+ Добавить уровень</button>
            </div>
        `).join('');
    },

    // Генерация редактора уровней критерия
    generateLevelsEditor: function(levels, criterionIndex) {
        return levels.map((level, levelIndex) => `
            <div class="level-editor" id="level-${criterionIndex}-${levelIndex}">
                <div class="level-header">
                    <span>Уровень ${levelIndex + 1} (${level.score || 0} баллов)</span>
                    <button class="remove-card-btn" onclick="TemaEditor.removeLevel(${criterionIndex}, ${levelIndex})">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Балл:</label>
                        <input type="number" id="level-score-${criterionIndex}-${levelIndex}" value="${level.score || 0}" min="0" max="10">
                    </div>
                    <div class="form-group">
                        <label>Цвет:</label>
                        <input type="color" id="level-color-${criterionIndex}-${levelIndex}" value="${level.color || '#dc3545'}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Краткое название:</label>
                    <input type="text" id="level-label-${criterionIndex}-${levelIndex}" value="${level.label || ''}" placeholder="Название уровня">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="level-description-${criterionIndex}-${levelIndex}" placeholder="Детальное описание уровня">${level.description || ''}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Генерация редактора советов
    generateTipsEditor: function(tips) {
        if (!tips || tips.length === 0) {
            return '<p class="empty-state">Советы не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }
        
        return tips.map((tip, index) => `
            <div class="tip-editor-card" id="tip-${index}">
                <div class="card-header">
                    <h4>Совет ${index + 1}: ${tip.title || 'Новый совет'}</h4>
                    <button class="remove-card-btn" onclick="TemaEditor.removeTip(${index})">Удалить</button>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Иконка (эмодзи):</label>
                        <input type="text" id="tip-icon-${index}" value="${tip.icon || ''}" placeholder="💡">
                    </div>
                    <div class="form-group">
                        <label>Заголовок совета:</label>
                        <input type="text" id="tip-title-${index}" value="${tip.title || ''}" placeholder="Заголовок совета">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Пункты совета (по одному на строку):</label>
                    <textarea id="tip-items-${index}" rows="4" placeholder="Пункт 1\nПункт 2\nПункт 3">${(tip.items || []).join('\n')}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Генерация редактора кнопок CTA
    generateCTAButtonsEditor: function(buttons) {
        if (!buttons || buttons.length === 0) {
            return '<p class="empty-state">Кнопки не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }
        
        return buttons.map((button, index) => `
            <div class="cta-button-editor-card" id="cta-button-${index}">
                <div class="card-header">
                    <h4>Кнопка ${index + 1}</h4>
                    <button class="remove-card-btn" onclick="TemaEditor.removeCTAButton(${index})">Удалить</button>
                </div>
                
                <div class="form-group">
                    <label>Текст кнопки:</label>
                    <input type="text" id="cta-button-text-${index}" value="${button.text || ''}" placeholder="🚀 Текст кнопки">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Ссылка:</label>
                        <input type="text" id="cta-button-url-${index}" value="${button.url || ''}" placeholder="baza.html">
                    </div>
                    <div class="form-group">
                        <label>Тип кнопки:</label>
                        <select id="cta-button-type-${index}">
                            <option value="primary" ${button.type === 'primary' ? 'selected' : ''}>Основная</option>
                            <option value="secondary" ${button.type === 'secondary' ? 'selected' : ''}>Вторичная</option>
                            <option value="success" ${button.type === 'success' ? 'selected' : ''}>Успех</option>
                        </select>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // ФУНКЦИИ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ
    addStep: function() {
        const newStep = {
            id: "step" + Date.now(),
            number: "ШАГ " + (currentData.algorithm.steps.length + 1),
            title: "Новый шаг",
            description: "Описание нового шага",
            items: ["Новый пункт шага"],
            icon: "🎯"
        };
        
        if (!currentData.algorithm.steps) currentData.algorithm.steps = [];
        currentData.algorithm.steps.push(newStep);
        
        const container = document.getElementById('tema-algorithm-steps-container');
        container.innerHTML = this.generateStepsEditor(currentData.algorithm.steps);
    },

    addPhase: function() {
        const newPhase = {
            id: "phase" + Date.now(),
            title: "Новая фаза",
            description: "Описание новой фазы",
            details: "Детальное описание новой фазы",
            icon: "🚀",
            color: "#0e4094"
        };
        
        if (!currentData.implementation.phases) currentData.implementation.phases = [];
        currentData.implementation.phases.push(newPhase);
        
        const container = document.getElementById('tema-implementation-phases-container');
        container.innerHTML = this.generatePhasesEditor(currentData.implementation.phases);
    },

    addCriterion: function() {
        const newCriterion = {
            id: "criterion" + Date.now(),
            name: "Новый критерий",
            maxScore: 3,
            scaleDescription: "Описание критерия оценки",
            levels: [
                { score: 0, label: "Неудовлетворительно", description: "Критерий не выполнен", color: "#dc3545" },
                { score: 1, label: "Удовлетворительно", description: "Частичное выполнение", color: "#ffc107" },
                { score: 2, label: "Хорошо", description: "Хорошее выполнение", color: "#28a745" },
                { score: 3, label: "Отлично", description: "Отличное выполнение", color: "#0e4094" }
            ]
        };
        
        if (!currentData.evaluationCriteria.criteria) currentData.evaluationCriteria.criteria = [];
        currentData.evaluationCriteria.criteria.push(newCriterion);
        
        const container = document.getElementById('tema-criteria-container');
        container.innerHTML = this.generateCriteriaEditor(currentData.evaluationCriteria.criteria);
    },

    addLevel: function(criterionIndex) {
        const newLevel = {
            score: 0,
            label: "Новый уровень",
            description: "Описание нового уровня",
            color: "#6c757d"
        };
        
        if (!currentData.evaluationCriteria.criteria[criterionIndex].levels) {
            currentData.evaluationCriteria.criteria[criterionIndex].levels = [];
        }
        currentData.evaluationCriteria.criteria[criterionIndex].levels.push(newLevel);
        
        const container = document.getElementById(`criterion-levels-${criterionIndex}`);
        container.innerHTML = this.generateLevelsEditor(
            currentData.evaluationCriteria.criteria[criterionIndex].levels,
            criterionIndex
        );
    },

    addTip: function() {
        const newTip = {
            id: "tip" + Date.now(),
            title: "Новый совет",
            items: ["Новый пункт совета"],
            icon: "💡"
        };
        
        if (!currentData.additionalInfo.tips) currentData.additionalInfo.tips = [];
        currentData.additionalInfo.tips.push(newTip);
        
        const container = document.getElementById('tema-additional-tips-container');
        container.innerHTML = this.generateTipsEditor(currentData.additionalInfo.tips);
    },

    addCTAButton: function() {
        const newButton = {
            text: "🔗 Новая кнопка",
            url: "#",
            type: "primary"
        };
        
        if (!currentData.callToAction.buttons) currentData.callToAction.buttons = [];
        currentData.callToAction.buttons.push(newButton);
        
        const container = document.getElementById('tema-cta-buttons-container');
        container.innerHTML = this.generateCTAButtonsEditor(currentData.callToAction.buttons);
    },

    // ФУНКЦИИ УДАЛЕНИЯ ЭЛЕМЕНТОВ
    removeStep: function(index) {
        if (confirm('Удалить этот шаг алгоритма?')) {
            currentData.algorithm.steps.splice(index, 1);
            const container = document.getElementById('tema-algorithm-steps-container');
            container.innerHTML = this.generateStepsEditor(currentData.algorithm.steps);
        }
    },

    removePhase: function(index) {
        if (confirm('Удалить эту фазу реализации?')) {
            currentData.implementation.phases.splice(index, 1);
            const container = document.getElementById('tema-implementation-phases-container');
            container.innerHTML = this.generatePhasesEditor(currentData.implementation.phases);
        }
    },

    removeCriterion: function(index) {
        if (confirm('Удалить этот критерий оценки?')) {
            currentData.evaluationCriteria.criteria.splice(index, 1);
            const container = document.getElementById('tema-criteria-container');
            container.innerHTML = this.generateCriteriaEditor(currentData.evaluationCriteria.criteria);
        }
    },

    removeLevel: function(criterionIndex, levelIndex) {
        if (confirm('Удалить этот уровень?')) {
            currentData.evaluationCriteria.criteria[criterionIndex].levels.splice(levelIndex, 1);
            const container = document.getElementById(`criterion-levels-${criterionIndex}`);
            container.innerHTML = this.generateLevelsEditor(
                currentData.evaluationCriteria.criteria[criterionIndex].levels,
                criterionIndex
            );
        }
    },

    removeTip: function(index) {
        if (confirm('Удалить этот совет?')) {
            currentData.additionalInfo.tips.splice(index, 1);
            const container = document.getElementById('tema-additional-tips-container');
            container.innerHTML = this.generateTipsEditor(currentData.additionalInfo.tips);
        }
    },

    removeCTAButton: function(index) {
        if (confirm('Удалить эту кнопку?')) {
            currentData.callToAction.buttons.splice(index, 1);
            const container = document.getElementById('tema-cta-buttons-container');
            container.innerHTML = this.generateCTAButtonsEditor(currentData.callToAction.buttons);
        }
    },

    // СБОР ДАННЫХ ИЗ ФОРМЫ
    gatherData: function() {
        return {
            pageSettings: {
                title: val('tema-page-title') || "Выбор темы для участия в НТК",
                heroTitle: val('tema-hero-title') || "НАУЧНЫЙ НАВИГАТОР",
                mainSectionTitle: val('tema-main-section-title') || "Выбор темы для участия в НТК",
                lastUpdated: new Date().toISOString()
            },
            algorithm: {
                sectionTitle: val('tema-algorithm-title') || "Алгоритм выбора темы для НТК",
                sectionSubtitle: val('tema-algorithm-subtitle') || "",
                steps: this.gatherStepsData()
            },
            implementation: {
                sectionTitle: val('tema-implementation-title') || "Реализация проекта",
                sectionSubtitle: val('tema-implementation-subtitle') || "",
                phases: this.gatherPhasesData()
            },
            evaluationCriteria: {
                sectionTitle: val('tema-criteria-title') || "Система оценки проектов НТК",
                sectionSubtitle: val('tema-criteria-subtitle') || "",
                maxTotalScore: parseInt(val('tema-criteria-max-score')) || 21,
                criteria: this.gatherCriteriaData()
            },
            additionalInfo: {
                sectionTitle: val('tema-additional-title') || "Дополнительная информация",
                sectionSubtitle: val('tema-additional-subtitle') || "",
                tips: this.gatherTipsData()
            },
            callToAction: {
                title: val('tema-cta-title') || "Готовы выбрать тему для НТК?",
                highlightText: val('tema-cta-highlight') || "",
                buttons: this.gatherCTAButtonsData()
            }
        };
    },

    // Обновленная функция сбора данных шагов
    gatherStepsData: function() {
        const steps = [];
        const containers = document.querySelectorAll('.step-editor-card');
        
        containers.forEach((container, index) => {
            const number = val(`step-number-${index}`);
            const title = val(`step-title-${index}`);
            const description = val(`step-description-${index}`);
            const icon = val(`step-icon-${index}`);
            
            // Собираем пункты с поддержкой ссылок
            const items = [];
            const itemsContainer = container.querySelector(`#step-items-${index}`);
            if (itemsContainer) {
                Array.from(itemsContainer.children).forEach((itemEl, itemIndex) => {
                    const type = val(`step-${index}-item-${itemIndex}-type`) || 'text';
                    const content = val(`step-${index}-item-${itemIndex}-content`);
                    
                    if (content.trim()) {
                        const item = {
                            type: type,
                            content: content
                        };
                        
                        if (type === 'link') {
                            item.url = val(`step-${index}-item-${itemIndex}-url`) || '#';
                            item.description = val(`step-${index}-item-${itemIndex}-description`) || '';
                        }
                        
                        items.push(item);
                    }
                });
            }
            
            if (title.trim()) {
                steps.push({
                    id: "step" + (index + 1),
                    number,
                    title,
                    description,
                    items,
                    icon
                });
            }
        });
        
        return steps;
    },

    gatherPhasesData: function() {
        const phases = [];
        const containers = document.querySelectorAll('.phase-editor-card');
        
        containers.forEach((container, index) => {
            const title = val(`phase-title-${index}`);
            const description = val(`phase-description-${index}`);
            const details = val(`phase-details-${index}`);
            const icon = val(`phase-icon-${index}`);
            const color = val(`phase-color-${index}`);
            
            if (title.trim()) {
                phases.push({
                    id: "phase" + (index + 1),
                    title,
                    description,
                    details,
                    icon,
                    color
                });
            }
        });
        
        return phases;
    },

    gatherCriteriaData: function() {
        const criteria = [];
        const containers = document.querySelectorAll('.criterion-editor-card');
        
        containers.forEach((container, index) => {
            const name = val(`criterion-name-${index}`);
            const maxScore = parseInt(val(`criterion-max-score-${index}`)) || 3;
            const scaleDescription = val(`criterion-scale-desc-${index}`);
            
            if (name.trim()) {
                const levels = this.gatherLevelsData(index);
                criteria.push({
                    id: "criterion" + (index + 1),
                    name,
                    maxScore,
                    scaleDescription,
                    levels
                });
            }
        });
        
        return criteria;
    },

    gatherLevelsData: function(criterionIndex) {
        const levels = [];
        const levelContainers = document.querySelectorAll(`#criterion-levels-${criterionIndex} .level-editor`);
        
        levelContainers.forEach((container, levelIndex) => {
            const score = parseInt(val(`level-score-${criterionIndex}-${levelIndex}`)) || 0;
            const label = val(`level-label-${criterionIndex}-${levelIndex}`);
            const description = val(`level-description-${criterionIndex}-${levelIndex}`);
            const color = val(`level-color-${criterionIndex}-${levelIndex}`);
            
            if (label.trim() && description.trim()) {
                levels.push({
                    score,
                    label,
                    description,
                    color
                });
            }
        });
        
        return levels;
    },

    gatherTipsData: function() {
        const tips = [];
        const containers = document.querySelectorAll('.tip-editor-card');
        
        containers.forEach((container, index) => {
            const title = val(`tip-title-${index}`);
            const icon = val(`tip-icon-${index}`);
            const itemsText = val(`tip-items-${index}`);
            const items = itemsText ? itemsText.split('\n').filter(item => item.trim()) : [];
            
            if (title.trim()) {
                tips.push({
                    id: "tip" + (index + 1),
                    title,
                    items,
                    icon
                });
            }
        });
        
        return tips;
    },

    gatherCTAButtonsData: function() {
        const buttons = [];
        const containers = document.querySelectorAll('.cta-button-editor-card');
        
        containers.forEach((container, index) => {
            const text = val(`cta-button-text-${index}`);
            const url = val(`cta-button-url-${index}`);
            const type = val(`cta-button-type-${index}`);
            
            if (text.trim() && url.trim()) {
                buttons.push({
                    text,
                    url,
                    type
                });
            }
        });
        
        return buttons;
    },

    // СОХРАНЕНИЕ ДАННЫХ
    save: function() {
        const updatedData = this.gatherData();
        downloadJS('tema-data.js', 'window.temaData', updatedData);
    },

    // ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР
    preview: function() {
        const data = this.gatherData();
        
        let html = `
            <html>
            <head>
                <title>Предпросмотр: ${data.pageSettings.title}</title>
                <style>
                    body {font: 14px Arial; padding: 20px; background: #f5f5f5; line-height: 1.6;}
                    h1 {color: #0e4094; text-align: center; margin-bottom: 30px;}
                    h2 {color: #0e4094; margin-top: 40px; padding-bottom: 10px; border-bottom: 2px solid #0e4094;}
                    .section-desc {font-style: italic; color: #666; margin-bottom: 20px;}
                    .step, .phase, .tip {background: white; margin: 20px 0; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 4px solid #0e4094;}
                    .criterion {background: white; margin: 15px 0; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);}
                    .levels {display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;}
                    .level {padding: 10px 15px; border-radius: 8px; color: white; text-align: center; min-width: 100px;}
                    .step h3, .phase h3, .tip h3 {color: #0e4094; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;}
                    .items {margin-top: 15px;}
                    .items li {margin: 8px 0; padding-left: 10px;}
                    .cta-buttons {display: flex; gap: 15px; justify-content: center; margin-top: 30px; flex-wrap: wrap;}
                    .cta-btn {padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;}
                    .cta-btn.primary {background: #0e4094; color: white;}
                    .cta-btn.secondary {background: #6c757d; color: white;}
                    .cta-btn.success {background: #28a745; color: white;}
                    .highlight {background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; border-radius: 5px;}
                </style>
            </head>
            <body>
                <h1>${data.pageSettings.title}</h1>
                
                <h2>${data.algorithm.sectionTitle}</h2>
                <div class="section-desc">${data.algorithm.sectionSubtitle}</div>
        `;
        
        // Добавляем шаги алгоритма
        data.algorithm.steps.forEach(step => {
            html += `
                <div class="step">
                    <h3>${step.icon} ${step.number}: ${step.title}</h3>
                    <p>${step.description}</p>
                    <div class="items">
                        <ul>
                            ${step.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        
        // Добавляем фазы реализации
        html += `<h2>${data.implementation.sectionTitle}</h2><div class="section-desc">${data.implementation.sectionSubtitle}</div>`;
        
        data.implementation.phases.forEach(phase => {
            html += `
                <div class="phase" style="border-left-color: ${phase.color};">
                    <h3>${phase.icon} ${phase.title}</h3>
                    <p><strong>${phase.description}</strong></p>
                    <p>${phase.details}</p>
                </div>
            `;
        });
        
        // Добавляем критерии оценки
        html += `
            <h2>${data.evaluationCriteria.sectionTitle}</h2>
            <div class="section-desc">${data.evaluationCriteria.sectionSubtitle}</div>
            <div style="text-align: center; background: #0e4094; color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>Максимальный балл: ${data.evaluationCriteria.maxTotalScore}</h3>
            </div>
        `;
        
        data.evaluationCriteria.criteria.forEach(criterion => {
            html += `
                <div class="criterion">
                    <h3>${criterion.name}</h3>
                    <p><em>${criterion.scaleDescription}</em> (максимум: ${criterion.maxScore} баллов)</p>
                    <div class="levels">
                        ${criterion.levels.map(level => `
                            <div class="level" style="background: ${level.color};">
                                <div><strong>${level.score}</strong></div>
                                <div>${level.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        // Добавляем дополнительную информацию
        html += `<h2>${data.additionalInfo.sectionTitle}</h2><div class="section-desc">${data.additionalInfo.sectionSubtitle}</div>`;
        
        data.additionalInfo.tips.forEach(tip => {
            html += `
                <div class="tip">
                    <h3>${tip.icon} ${tip.title}</h3>
                    <div class="items">
                        <ul>
                            ${tip.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        
        // Добавляем призыв к действию
        html += `
            <h2>${data.callToAction.title}</h2>
            <div class="highlight">${data.callToAction.highlightText}</div>
            <div class="cta-buttons">
                ${data.callToAction.buttons.map(button => 
                    `<a href="${button.url}" class="cta-btn ${button.type}">${button.text}</a>`
                ).join('')}
            </div>
        `;
        
        html += `
                <div style="margin-top: 40px; text-align: center; color: #666; font-size: 0.9em;">
                    <p>Всего шагов алгоритма: ${data.algorithm.steps.length}</p>
                    <p>Всего фаз реализации: ${data.implementation.phases.length}</p>
                    <p>Всего критериев оценки: ${data.evaluationCriteria.criteria.length}</p>
                    <p>Сгенерировано: ${new Date().toLocaleString('ru-RU')}</p>
                </div>
            </body>
            </html>
        `;
        
        openPreview(html);
    }
};

console.log('✅ TemaEditor загружен');
