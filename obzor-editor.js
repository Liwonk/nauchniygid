// obzor-editor.js - Редактор обзоров НТК
// Версия: 1.2 - 19.09.2025 (Исправлена функция save)
window.ObzorEditor = {
    // Основная функция построения редактора
    build: function() {
        if (!currentData || !currentPageConf) {
            console.error("ObzorEditor: Нет данных для инициализации");
            return;
        }

        let html = `
            <h3 class="section-title">Редактор обзоров НТК</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из obzor-data.js</strong>
            </p>

            <!-- Настройки страницы -->
            <div class="section-container">
                <h4>📄 Настройки страницы</h4>
                <div class="form-group">
                    <label>Заголовок страницы:</label>
                    <input type="text" id="obzor-page-title" value="${currentData.pageSettings?.title || ''}" placeholder="Обзор технологических вызовов">
                </div>
                <div class="form-group">
                    <label>Hero-заголовок:</label>
                    <input type="text" id="obzor-hero-title" value="${currentData.pageSettings?.heroTitle || ''}" placeholder="Научно-технологические вызовы">
                </div>
                <div class="form-group">
                    <label>Основной заголовок:</label>
                    <input type="text" id="obzor-main-title" value="${currentData.pageSettings?.mainSectionTitle || ''}" placeholder="Обзор основных направлений">
                </div>
            </div>

            <!-- Описание компании -->
            <div class="section-container">
                <h4>🏢 Описание компании</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="company-section-title" value="${currentData.companyIntro?.sectionTitle || ''}" placeholder="О компании">
                </div>
                <div class="form-group">
                    <label>Подзаголовок:</label>
                    <input type="text" id="company-section-subtitle" value="${currentData.companyIntro?.sectionSubtitle || ''}" placeholder="Ведущая российская нефтегазовая компания">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="company-description" rows="4" placeholder="Описание деятельности компании...">${currentData.companyIntro?.description || ''}</textarea>
                </div>
            </div>

            <!-- Матрица вызовов -->
            <div class="section-container">
                <h4>🎯 Матрица вызовов</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="challenges-matrix-title" value="${currentData.challengesMatrix?.sectionTitle || ''}" placeholder="Технологические вызовы">
                </div>
                <div class="form-group">
                    <label>Подзаголовок:</label>
                    <input type="text" id="challenges-matrix-subtitle" value="${currentData.challengesMatrix?.sectionSubtitle || ''}" placeholder="Основные направления исследований">
                </div>

                <!-- Этапы разработки -->
                <h5>📅 Этапы разработки</h5>
                <div id="stages-container">`;

        if (currentData.challengesMatrix?.stages) {
            currentData.challengesMatrix.stages.forEach((stage, index) => {
                html += this.generateStageEditor(stage, index);
            });
        }

        html += `
                </div>
                <button type="button" class="add-card-btn" onclick="ObzorEditor.addStage()">➕ Добавить этап</button>

                <!-- Вызовы -->
                <h5>🎯 Технологические вызовы</h5>
                <div id="challenges-container">`;

        if (currentData.challengesMatrix?.challenges) {
            currentData.challengesMatrix.challenges.forEach((challenge, index) => {
                html += this.generateChallengeEditor(challenge, index);
            });
        }

        html += `
                </div>
                <button type="button" class="add-card-btn" onclick="ObzorEditor.addChallenge()">➕ Добавить вызов</button>
            </div>

            <!-- Стратегические вызовы -->
            <div class="section-container">
                <h4>⚡ Стратегические вызовы</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="strategic-title" value="${currentData.strategicChallenges?.sectionTitle || ''}" placeholder="Стратегические приоритеты">
                </div>
                <div class="form-group">
                    <label>Подзаголовок:</label>
                    <input type="text" id="strategic-subtitle" value="${currentData.strategicChallenges?.sectionSubtitle || ''}" placeholder="Ключевые направления развития">
                </div>

                <h5>🚀 Стратегические направления</h5>
                <div id="strategic-challenges-container">`;

        if (currentData.strategicChallenges?.challenges) {
            currentData.strategicChallenges.challenges.forEach((challenge, index) => {
                html += this.generateStrategicChallengeEditor(challenge, index);
            });
        }

        html += `
                </div>
                <button type="button" class="add-card-btn" onclick="ObzorEditor.addStrategicChallenge()">➕ Добавить стратегическое направление</button>
            </div>

            <!-- Статистика решений -->
            <div class="section-container">
                <h4>📊 Статистика решений</h4>
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="stats-title" value="${currentData.solutionStats?.sectionTitle || ''}" placeholder="Наши достижения">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Количество вызовов:</label>
                        <input type="text" id="stats-challenges" value="${currentData.solutionStats?.totalChallenges || ''}" placeholder="57">
                    </div>
                    <div class="form-group">
                        <label>Описание вызовов:</label>
                        <input type="text" id="stats-challenges-desc" value="${currentData.solutionStats?.challengesDescription || ''}" placeholder="технологических вызовов решаем.">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Количество направлений:</label>
                        <input type="text" id="stats-directions" value="${currentData.solutionStats?.totalDirections || ''}" placeholder="6">
                    </div>
                    <div class="form-group">
                        <label>Описание направлений:</label>
                        <input type="text" id="stats-directions-desc" value="${currentData.solutionStats?.directionsDescription || ''}" placeholder="основных направлений исследований.">
                    </div>
                </div>
            </div>

            <!-- Призыв к действию -->
            <div class="section-container">
                <h4>📢 Призыв к действию</h4>
                <div class="form-group">
                    <label>Заголовок CTA:</label>
                    <input type="text" id="cta-title" value="${currentData.callToAction?.title || ''}" placeholder="Готовы присоединиться к решению вызовов?">
                </div>
                <div class="form-group">
                    <label>Выделенный текст:</label>
                    <textarea id="cta-highlight" rows="3" placeholder="Важная информация для привлечения внимания...">${currentData.callToAction?.highlightText || ''}</textarea>
                </div>

                <h5>🔗 Кнопки CTA</h5>
                <div id="cta-buttons-container">
                    <!-- CTA кнопки будут добавлены здесь -->`;

        if (currentData.callToAction?.buttons) {
            currentData.callToAction.buttons.forEach((button, index) => {
                html += this.generateCTAButtonEditor(button, index);
            });
        }

        html += `
                </div>
                <button type="button" class="add-card-btn" onclick="ObzorEditor.addCTAButton()">➕ Добавить кнопку</button>
            </div>

            <!-- Кнопки управления -->
            <div class="btn-group" style="margin-top: 40px;">
                <button class="btn btn-preview" onclick="ObzorEditor.preview()">👁️ Предпросмотр</button>
                <button class="btn btn-save" onclick="ObzorEditor.save()">💾 Сохранить obzor-data.js</button>
            </div>
        `;

        contentEdit.innerHTML = html;
    },

    // Безопасное получение значения элемента
    safeGetElementValue: function(elementId) {
        try {
            const element = document.getElementById(elementId);
            return element ? element.value : '';
        } catch (error) {
            console.warn("ObzorEditor: Ошибка получения значения элемента", elementId, error);
            return '';
        }
    },

    // Генерация редактора этапа
    generateStageEditor: function(stage, index) {
        return `
            <div class="card-editor stage-editor" id="stage-${index}">
                <div class="card-header">
                    <h6>📅 ${stage.name} (${index + 1})</h6>
                    <button type="button" class="remove-card-btn" onclick="ObzorEditor.removeStage(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>ID этапа:</label>
                        <input type="text" id="stage-${index}-id" value="${stage.id}" placeholder="current">
                    </div>
                    <div class="form-group">
                        <label>Название:</label>
                        <input type="text" id="stage-${index}-name" value="${stage.name}" placeholder="Текущие исследования">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Цвет:</label>
                        <input type="color" id="stage-${index}-color" value="${stage.color || '#ffffff'}">
                    </div>
                    <div class="form-group">
                        <label>Описание:</label>
                        <input type="text" id="stage-${index}-description" value="${stage.description}" placeholder="Описание этапа">
                    </div>
                </div>
            </div>
        `;
    },

    // Генерация редактора вызова
    generateChallengeEditor: function(challenge, index) {
        let stagesHTML = '';
        if (currentData.challengesMatrix?.stages) {
            currentData.challengesMatrix.stages.forEach((stage, stageIndex) => {
                const isActive = challenge.stages && challenge.stages[stage.id];
                stagesHTML += `
                    <div class="checkbox-group">
                        <label>
                            <input type="checkbox" id="challenge-${index}-stage-${stage.id}" ${isActive ? 'checked' : ''}>
                            ${stage.name}
                        </label>
                    </div>
                `;
            });
        }

        return `
            <div class="card-editor challenge-editor" id="challenge-${index}">
                <div class="card-header">
                    <h6>🎯 ${challenge.title} (${index + 1})</h6>
                    <button type="button" class="remove-card-btn" onclick="ObzorEditor.removeChallenge(${index})">❌</button>
                </div>
                <div class="form-group">
                    <label>ID вызова:</label>
                    <input type="text" id="challenge-${index}-id" value="${challenge.id}" placeholder="drilling-complications">
                </div>
                <div class="form-group">
                    <label>Заголовок:</label>
                    <input type="text" id="challenge-${index}-title" value="${challenge.title}" placeholder="Осложнения при бурении">
                </div>
                <div class="form-group">
                    <label>Подзаголовок:</label>
                    <textarea id="challenge-${index}-subtitle" rows="2" placeholder="Детальное описание вызова...">${challenge.subtitle}</textarea>
                </div>
                <div class="form-group">
                    <label>Активные этапы:</label>
                    <div class="stages-checkboxes">
                        ${stagesHTML}
                    </div>
                </div>
            </div>
        `;
    },

    // Генерация редактора стратегического вызова
    generateStrategicChallengeEditor: function(challenge, index) {
        const itemsHTML = challenge.items ? challenge.items.map((item, i) => `
            <div class="list-item-editor">
                <input type="text" id="strategic-${index}-item-${i}" value="${item}" placeholder="Элемент списка">
                <button type="button" class="remove-item-btn" onclick="ObzorEditor.removeStrategicItem(${index}, ${i})">❌</button>
            </div>
        `).join('') : '';

        return `
            <div class="card-editor strategic-editor" id="strategic-${index}">
                <div class="card-header">
                    <h6>⚡ ${challenge.title} (${index + 1})</h6>
                    <button type="button" class="remove-card-btn" onclick="ObzorEditor.removeStrategicChallenge(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>ID раздела:</label>
                        <input type="text" id="strategic-${index}-id" value="${challenge.id}" placeholder="kin45-section">
                    </div>
                    <div class="form-group">
                        <label>Заголовок:</label>
                        <input type="text" id="strategic-${index}-title" value="${challenge.title}" placeholder="Кинетика нефтегазовых систем КИН 45">
                    </div>
                    <div class="form-group">
                        <label>Цвет:</label>
                        <input type="color" id="strategic-${index}-color" value="${challenge.color || '#0e4094'}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Элементы списка:</label>
                    <div id="strategic-${index}-items">${itemsHTML}</div>
                    <button type="button" class="add-item-btn" onclick="ObzorEditor.addStrategicItem(${index})">➕ Добавить элемент</button>
                </div>
            </div>
        `;
    },

    // Генерация редактора CTA кнопки
    generateCTAButtonEditor: function(button, index) {
        return `
            <div class="card-editor cta-button-editor" id="cta-button-${index}">
                <div class="card-header">
                    <h6>🔗 ${button.text} (${index + 1})</h6>
                    <button type="button" class="remove-card-btn" onclick="ObzorEditor.removeCTAButton(${index})">❌</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Текст кнопки:</label>
                        <input type="text" id="cta-button-${index}-text" value="${button.text}" placeholder="Подать заявку">
                    </div>
                    <div class="form-group">
                        <label>URL:</label>
                        <input type="text" id="cta-button-${index}-url" value="${button.url}" placeholder="tema.html">
                    </div>
                    <div class="form-group">
                        <label>Тип кнопки:</label>
                        <select id="cta-button-${index}-type">
                            <option value="primary" ${button.type === 'primary' ? 'selected' : ''}>Primary</option>
                            <option value="secondary" ${button.type === 'secondary' ? 'selected' : ''}>Secondary</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },

    // Добавление нового этапа
    addStage: function() {
        const container = document.getElementById('stages-container');
        const index = container.children.length;
        const stageHTML = this.generateStageEditor({
            id: `stage${index + 1}`,
            name: `Этап ${index + 1}`,
            color: '#ffffff',
            description: ''
        }, index);
        container.insertAdjacentHTML('beforeend', stageHTML);
    },

    // Добавление нового вызова
    addChallenge: function() {
        const container = document.getElementById('challenges-container');
        const index = container.children.length;
        const challengeHTML = this.generateChallengeEditor({
            id: `challenge${index + 1}`,
            title: `Вызов ${index + 1}`,
            subtitle: '',
            stages: {}
        }, index);
        container.insertAdjacentHTML('beforeend', challengeHTML);
    },

    // Добавление нового стратегического вызова
    addStrategicChallenge: function() {
        const container = document.getElementById('strategic-challenges-container');
        const index = container.children.length;
        const strategicHTML = this.generateStrategicChallengeEditor({
            id: `strategic${index + 1}`,
            title: `Направление ${index + 1}`,
            color: '#0e4094',
            items: []
        }, index);
        container.insertAdjacentHTML('beforeend', strategicHTML);
    },

    // Добавление элемента в стратегический вызов
    addStrategicItem: function(strategicIndex) {
        const container = document.getElementById(`strategic-${strategicIndex}-items`);
        const itemIndex = container.children.length;
        const itemHTML = `
            <div class="list-item-editor">
                <input type="text" id="strategic-${strategicIndex}-item-${itemIndex}" value="" placeholder="Новый элемент">
                <button type="button" class="remove-item-btn" onclick="ObzorEditor.removeStrategicItem(${strategicIndex}, ${itemIndex})">❌</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    },

    // Добавление CTA кнопки
    addCTAButton: function() {
        const container = document.getElementById('cta-buttons-container');
        const index = container.children.length;
        const buttonHTML = this.generateCTAButtonEditor({
            text: `Кнопка ${index + 1}`,
            url: '',
            type: 'primary'
        }, index);
        container.insertAdjacentHTML('beforeend', buttonHTML);
    },

    // Удаление этапа
    removeStage: function(index) {
        if (confirm('Удалить этот этап? Действие необратимо.')) {
            document.getElementById(`stage-${index}`)?.remove();
        }
    },

    // Удаление вызова
    removeChallenge: function(index) {
        if (confirm('Удалить этот вызов? Действие необратимо.')) {
            document.getElementById(`challenge-${index}`)?.remove();
        }
    },

    // Удаление стратегического вызова
    removeStrategicChallenge: function(index) {
        if (confirm('Удалить это стратегическое направление? Действие необратимо.')) {
            document.getElementById(`strategic-${index}`)?.remove();
        }
    },

    // Удаление элемента из стратегического вызова
    removeStrategicItem: function(strategicIndex, itemIndex) {
        const container = document.getElementById(`strategic-${strategicIndex}-items`);
        if (container && container.children[itemIndex]) {
            container.children[itemIndex].remove();
        }
    },

    // Удаление CTA кнопки
    removeCTAButton: function(index) {
        if (confirm('Удалить эту кнопку? Действие необратимо.')) {
            document.getElementById(`cta-button-${index}`)?.remove();
        }
    },

    // Сбор данных этапов
    collectStagesData: function() {
        const stages = [];
        const container = document.getElementById('stages-container');
        
        if (!container || container.children.length === 0) {
            console.log("ObzorEditor: Контейнер stages-container пуст");
            return stages;
        }

        try {
            Array.from(container.children).forEach((stageEl, index) => {
                if (!stageEl) return;
                
                stages.push({
                    id: this.safeGetElementValue(`stage-${index}-id`) || `stage${index + 1}`,
                    name: this.safeGetElementValue(`stage-${index}-name`) || `Этап ${index + 1}`,
                    color: this.safeGetElementValue(`stage-${index}-color`) || '#ffffff',
                    description: this.safeGetElementValue(`stage-${index}-description`) || ''
                });
            });
        } catch (error) {
            console.error("ObzorEditor: Ошибка при сборе данных этапов", error);
        }

        return stages;
    },

    // Сбор данных вызовов
    collectChallengesData: function() {
        const challenges = [];
        const container = document.getElementById('challenges-container');
        
        if (!container || container.children.length === 0) {
            console.log("ObzorEditor: Контейнер challenges-container пуст");
            return challenges;
        }

        try {
            Array.from(container.children).forEach((challengeEl, index) => {
                if (!challengeEl) {
                    console.warn("ObzorEditor: Пустой элемент challengeEl для индекса", index);
                    return;
                }

                const stages = {};
                const stagesContainer = challengeEl.querySelector('.stages-checkboxes');
                
                if (stagesContainer) {
                    const checkboxes = stagesContainer.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        if (checkbox && checkbox.id && checkbox.id.includes('-stage-')) {
                            try {
                                const stageId = checkbox.id.split('-stage-')[1];
                                if (stageId) stages[stageId] = checkbox.checked;
                            } catch (splitError) {
                                console.warn("ObzorEditor: Ошибка парсинга ID чекбокса:", checkbox.id, splitError);
                            }
                        } else {
                            console.warn("ObzorEditor: Некорректный чекбокс этапа:", checkbox);
                        }
                    });
                } else {
                    console.log("ObzorEditor: Не найден контейнер .stages-checkboxes для challenge", index);
                }

                const challengeData = {
                    id: this.safeGetElementValue(`challenge-${index}-id`) || `challenge${index + 1}`,
                    title: this.safeGetElementValue(`challenge-${index}-title`) || `Вызов ${index + 1}`,
                    subtitle: this.safeGetElementValue(`challenge-${index}-subtitle`) || '',
                    stages: stages
                };

                challenges.push(challengeData);
            });
        } catch (error) {
            console.error("ObzorEditor: Ошибка при сборе данных вызовов", error);
        }

        return challenges;
    },

    // Сбор данных стратегических вызовов
    collectStrategicChallengesData: function() {
        const strategicChallenges = [];
        const container = document.getElementById('strategic-challenges-container');
        
        if (!container || container.children.length === 0) {
            console.log("ObzorEditor: Контейнер strategic-challenges-container пуст");
            return strategicChallenges;
        }

        try {
            Array.from(container.children).forEach((strategicEl, index) => {
                if (!strategicEl) return;
                
                const items = [];
                const itemsContainer = strategicEl.querySelector(`#strategic-${index}-items`);
                
                if (itemsContainer) {
                    Array.from(itemsContainer.children).forEach((itemEl, itemIndex) => {
                        if (!itemEl) return;
                        
                        const input = itemEl.querySelector(`#strategic-${index}-item-${itemIndex}`);
                        if (input && input.value && input.value.trim()) {
                            items.push(input.value.trim());
                        }
                    });
                }

                strategicChallenges.push({
                    id: this.safeGetElementValue(`strategic-${index}-id`) || `strategic${index + 1}`,
                    title: this.safeGetElementValue(`strategic-${index}-title`) || `Направление ${index + 1}`,
                    color: this.safeGetElementValue(`strategic-${index}-color`) || '#0e4094',
                    items: items
                });
            });
        } catch (error) {
            console.error("ObzorEditor: Ошибка при сборе данных стратегических вызовов", error);
        }

        return strategicChallenges;
    },

    // Сбор данных CTA кнопок
    collectCTAButtonsData: function() {
        const buttons = [];
        const container = document.getElementById('cta-buttons-container');
        
        if (!container || container.children.length === 0) {
            console.log("ObzorEditor: Контейнер cta-buttons-container пуст");
            return buttons;
        }

        try {
            Array.from(container.children).forEach((buttonEl, index) => {
                if (!buttonEl) return;
                
                buttons.push({
                    text: this.safeGetElementValue(`cta-button-${index}-text`) || `Кнопка ${index + 1}`,
                    url: this.safeGetElementValue(`cta-button-${index}-url`) || '',
                    type: this.safeGetElementValue(`cta-button-${index}-type`) || 'primary'
                });
            });
        } catch (error) {
            console.error("ObzorEditor: Ошибка при сборе данных CTA кнопок", error);
        }

        return buttons;
    },

    // Сбор всех данных
    collectData: function() {
        try {
            const data = {
                pageSettings: {
                    title: this.safeGetElementValue('obzor-page-title') || 'Обзор технологических вызовов',
                    heroTitle: this.safeGetElementValue('obzor-hero-title') || 'Научно-технологические вызовы',
                    mainSectionTitle: this.safeGetElementValue('obzor-main-title') || 'Обзор основных направлений',
                    lastUpdated: new Date().toISOString()
                },
                companyIntro: {
                    sectionTitle: this.safeGetElementValue('company-section-title') || 'О компании',
                    sectionSubtitle: this.safeGetElementValue('company-section-subtitle') || 'Ведущая российская нефтегазовая компания',
                    description: this.safeGetElementValue('company-description') || ''
                },
                challengesMatrix: {
                    sectionTitle: this.safeGetElementValue('challenges-matrix-title') || 'Технологические вызовы',
                    sectionSubtitle: this.safeGetElementValue('challenges-matrix-subtitle') || 'Основные направления исследований',
                    stages: this.collectStagesData(),
                    challenges: this.collectChallengesData()
                },
                strategicChallenges: {
                    sectionTitle: this.safeGetElementValue('strategic-title') || 'Стратегические приоритеты',
                    sectionSubtitle: this.safeGetElementValue('strategic-subtitle') || 'Ключевые направления развития',
                    challenges: this.collectStrategicChallengesData()
                },
                solutionStats: {
                    sectionTitle: this.safeGetElementValue('stats-title') || 'Наши достижения',
                    totalChallenges: this.safeGetElementValue('stats-challenges') || '57',
                    challengesDescription: this.safeGetElementValue('stats-challenges-desc') || 'технологических вызовов решаем.',
                    totalDirections: this.safeGetElementValue('stats-directions') || '6',
                    directionsDescription: this.safeGetElementValue('stats-directions-desc') || 'основных направлений исследований.'
                },
                callToAction: {
                    title: this.safeGetElementValue('cta-title') || 'Готовы присоединиться к решению вызовов?',
                    highlightText: this.safeGetElementValue('cta-highlight') || 'Важная информация для привлечения внимания.',
                    buttons: this.collectCTAButtonsData()
                }
            };

            console.log("ObzorEditor: Собранные данные", data);
            return data;
        } catch (error) {
            console.error("ObzorEditor: Ошибка при сборе данных", error);
            return {
                pageSettings: {
                    title: 'Обзор технологических вызовов',
                    heroTitle: 'Научно-технологические вызовы',
                    mainSectionTitle: 'Обзор основных направлений',
                    lastUpdated: new Date().toISOString()
                },
                companyIntro: {
                    sectionTitle: 'О компании',
                    sectionSubtitle: 'Ведущая российская нефтегазовая компания',
                    description: ''
                },
                challengesMatrix: {
                    sectionTitle: 'Технологические вызовы',
                    sectionSubtitle: 'Основные направления исследований',
                    stages: [],
                    challenges: []
                },
                strategicChallenges: {
                    sectionTitle: 'Стратегические приоритеты',
                    sectionSubtitle: 'Ключевые направления развития',
                    challenges: []
                },
                solutionStats: {
                    sectionTitle: 'Наши достижения',
                    totalChallenges: '',
                    challengesDescription: '',
                    totalDirections: '',
                    directionsDescription: ''
                },
                callToAction: {
                    title: '',
                    highlightText: '',
                    buttons: []
                }
            };
        }
    },

    // Предпросмотр данных
    preview: function() {
        const data = this.collectData();
        
        const previewHTML = `
            <h1>${data.pageSettings.heroTitle}</h1>
            <h2>${data.pageSettings.mainSectionTitle}</h2>
            <hr>
            <h3>${data.companyIntro.sectionTitle}</h3>
            <p><em>${data.companyIntro.sectionSubtitle}</em></p>
            <p>${data.companyIntro.description}</p>
            <hr>
            <h3>${data.challengesMatrix.sectionTitle}</h3>
            <p><em>${data.challengesMatrix.sectionSubtitle}</em></p>
            <p><strong>Этапов:</strong> ${data.challengesMatrix.stages.length}</p>
            <p><strong>Вызовов:</strong> ${data.challengesMatrix.challenges.length}</p>
            <hr>
            <h3>${data.strategicChallenges.sectionTitle}</h3>
            <p><em>${data.strategicChallenges.sectionSubtitle}</em></p>
            <p><strong>Стратегических направлений:</strong> ${data.strategicChallenges.challenges.length}</p>
            <hr>
            <p><strong>Файл obzor-data.js готов к скачиванию!</strong></p>
        `;

        if (typeof openPreview === 'function') {
            openPreview(previewHTML);
        } else {
            alert('Предпросмотр недоступен');
        }
    },

    // Сохранение данных - ИСПРАВЛЕННАЯ ФУНКЦИЯ
    save: function() {
        const updatedData = this.collectData();
        
        // Используем downloadJS как в других редакторах
        downloadJS('obzor-data.js', `window.obzorData = ${JSON.stringify(updatedData, null, 4)};`);
        
        // Обновляем текущие данные
        currentData = {...currentData, ...updatedData};
    }
};

// Глобальная регистрация
window.ObzorEditor = window.ObzorEditor;
console.log("✅ ObzorEditor загружен");