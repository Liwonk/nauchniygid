// preim-editor.js - Редактор преимуществ НТК
// Версия: 1.0

window.PreimEditor = {
    // Основная функция построения редактора
    build: function() {
        if (!currentData || !currentPageConf) {
            console.error('PreimEditor: Данные не загружены');
            return;
        }

        let html = `
            <h3 class="section-title">⭐ Редактирование преимуществ НТК</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из preim-data.js</strong>
            </p>
            
            <!-- Основные настройки страницы -->
            <div class="section-container">
                <h4>⚙️ Основные настройки страницы</h4>
                
                <div class="form-group">
                    <label>Заголовок страницы:</label>
                    <input type="text" id="preim-page-title" value="${currentData.pageSettings?.title || ''}" placeholder="Заголовок страницы">
                </div>
                
                <div class="form-group">
                    <label>Заголовок Hero-секции:</label>
                    <input type="text" id="preim-hero-title" value="${currentData.pageSettings?.heroTitle || ''}" placeholder="Заголовок hero-секции">
                </div>
                
                <div class="form-group">
                    <label>Основной заголовок раздела:</label>
                    <input type="text" id="preim-main-section-title" value="${currentData.pageSettings?.mainSectionTitle || ''}" placeholder="Основной заголовок">
                </div>
            </div>

            <!-- Преимущества для молодых специалистов -->
            <div class="section-container">
                <h4>👨‍💼 Преимущества для молодых специалистов</h4>
                
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="preim-young-title" value="${currentData.youngSpecialists?.sectionTitle || ''}" placeholder="Заголовок секции">
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="preim-young-subtitle" placeholder="Подзаголовок секции">${currentData.youngSpecialists?.sectionSubtitle || ''}</textarea>
                </div>
                
                <div id="preim-young-benefits-container">
                    ${this.generateBenefits(currentData.youngSpecialists?.benefits || [], 'young')}
                </div>
                
                <button class="add-btn" onclick="PreimEditor.addBenefit('young')">+ Добавить преимущество</button>
            </div>

            <!-- Преимущества для кураторов -->
            <div class="section-container">
                <h4>👨‍🏫 Преимущества для кураторов</h4>
                
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="preim-curator-title" value="${currentData.curators?.sectionTitle || ''}" placeholder="Заголовок секции">
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="preim-curator-subtitle" placeholder="Подзаголовок секции">${currentData.curators?.sectionSubtitle || ''}</textarea>
                </div>
                
                <div id="preim-curator-benefits-container">
                    ${this.generateBenefits(currentData.curators?.benefits || [], 'curator')}
                </div>
                
                <button class="add-btn" onclick="PreimEditor.addBenefit('curator')">+ Добавить преимущество</button>
            </div>

            <!-- Преимущества для компании -->
            <div class="section-container">
                <h4>🏢 Преимущества для компании</h4>
                
                <div class="form-group">
                    <label>Заголовок секции:</label>
                    <input type="text" id="preim-company-title" value="${currentData.company?.sectionTitle || ''}" placeholder="Заголовок секции">
                </div>
                
                <div class="form-group">
                    <label>Подзаголовок секции:</label>
                    <textarea id="preim-company-subtitle" placeholder="Подзаголовок секции">${currentData.company?.sectionSubtitle || ''}</textarea>
                </div>
                
                <h5>Список преимуществ:</h5>
                <div id="preim-company-benefits-container">
                    ${this.generateCompanyBenefits(currentData.company?.benefits || [])}
                </div>
                <button class="add-btn" onclick="PreimEditor.addCompanyBenefit()">+ Добавить пункт</button>
                
                <h5 style="margin-top: 30px;">Метрики компании:</h5>
                <div id="preim-company-metrics-container">
                    ${this.generateMetrics(currentData.company?.metrics || [])}
                </div>
                <button class="add-btn" onclick="PreimEditor.addMetric()">+ Добавить метрику</button>
            </div>

            <!-- Призыв к действию -->
            <div class="section-container">
                <h4>🚀 Призыв к действию</h4>
                
                <div class="form-group">
                    <label>Заголовок CTA:</label>
                    <input type="text" id="preim-cta-title" value="${currentData.callToAction?.title || ''}" placeholder="Заголовок призыва к действию">
                </div>
                
                <div class="form-group">
                    <label>Выделенный текст:</label>
                    <textarea id="preim-cta-highlight" placeholder="Важный текст">${currentData.callToAction?.highlightText || ''}</textarea>
                </div>
                
                <h5>Кнопки действий:</h5>
                <div id="preim-cta-buttons-container">
                    ${this.generateCTAButtons(currentData.callToAction?.buttons || [])}
                </div>
                <button class="add-btn" onclick="PreimEditor.addCTAButton()">+ Добавить кнопку</button>
            </div>

            <div class="btn-group" style="margin-top: 40px;">
                <button class="btn btn-preview" onclick="PreimEditor.preview()">👁️ Предварительный просмотр</button>
                <button class="btn btn-save" onclick="PreimEditor.save()">💾 Скачать preim-data.js</button>
            </div>
        `;

        contentEdit.innerHTML = html;
    },

    // Генерация карточек преимуществ
    generateBenefits: function(benefits, type) {
        if (!benefits || benefits.length === 0) {
            return '<p class="empty-state">Преимущества не добавлены. Нажмите кнопку ниже для добавления.</p>';
        }
        
        return benefits.map((benefit, index) => `
            <div class="benefit-card-editor" id="${type}-benefit-${index}">
                <div class="card-header">
                    <h4>Преимущество ${index + 1}</h4>
                    <button class="remove-card-btn" onclick="PreimEditor.removeBenefit('${type}', ${index})">Удалить</button>
                </div>
                
                <div class="form-group">
                    <label>Иконка (эмодзи):</label>
                    <input type="text" id="${type}-icon-${index}" value="${benefit.icon || ''}" placeholder="🎯">
                </div>
                
                <div class="form-group">
                    <label>Заголовок:</label>
                    <input type="text" id="${type}-benefit-title-${index}" value="${benefit.title || ''}" placeholder="Заголовок преимущества">
                </div>
                
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea id="${type}-benefit-desc-${index}" placeholder="Описание преимущества">${benefit.description || ''}</textarea>
                </div>
            </div>
        `).join('');
    },

    // Генерация преимуществ компании
    generateCompanyBenefits: function(benefits) {
        if (!benefits || benefits.length === 0) {
            return '<p class="empty-state">Преимущества для компании не добавлены.</p>';
        }
        
        return benefits.map((benefit, index) => `
            <div class="company-benefit-editor" id="company-benefit-${index}">
                <div class="form-group">
                    <label>Пункт ${index + 1}:</label>
                    <div class="input-with-delete">
                        <textarea id="company-benefit-text-${index}" placeholder="Текст преимущества">${benefit}</textarea>
                        <button class="remove-item-btn" onclick="PreimEditor.removeCompanyBenefit(${index})">×</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Генерация метрик
    generateMetrics: function(metrics) {
        if (!metrics || metrics.length === 0) {
            return '<p class="empty-state">Метрики не добавлены.</p>';
        }
        
        return metrics.map((metric, index) => `
            <div class="metric-card-editor" id="metric-${index}">
                <div class="card-header">
                    <h4>Метрика ${index + 1}</h4>
                    <button class="remove-card-btn" onclick="PreimEditor.removeMetric(${index})">Удалить</button>
                </div>
                
                <div class="form-group">
                    <label>Значение:</label>
                    <input type="text" id="metric-value-${index}" value="${metric.value || ''}" placeholder="85%">
                </div>
                
                <div class="form-group">
                    <label>Описание:</label>
                    <input type="text" id="metric-desc-${index}" value="${metric.description || ''}" placeholder="Описание метрики">
                </div>
            </div>
        `).join('');
    },

    // Генерация кнопок CTA
    generateCTAButtons: function(buttons) {
        if (!buttons || buttons.length === 0) {
            return '<p class="empty-state">Кнопки не добавлены.</p>';
        }
        
        return buttons.map((button, index) => `
            <div class="cta-button-editor" id="cta-button-${index}">
                <div class="card-header">
                    <h4>Кнопка ${index + 1}</h4>
                    <button class="remove-card-btn" onclick="PreimEditor.removeCTAButton(${index})">Удалить</button>
                </div>
                
                <div class="form-group">
                    <label>Текст кнопки:</label>
                    <input type="text" id="cta-btn-text-${index}" value="${button.text || ''}" placeholder="🚀 Текст кнопки">
                </div>
                
                <div class="form-group">
                    <label>Ссылка:</label>
                    <input type="text" id="cta-btn-url-${index}" value="${button.url || ''}" placeholder="tema.html">
                </div>
                
                <div class="form-group">
                    <label>Тип кнопки:</label>
                    <select id="cta-btn-type-${index}">
                        <option value="primary" ${button.type === 'primary' ? 'selected' : ''}>Основная</option>
                        <option value="secondary" ${button.type === 'secondary' ? 'selected' : ''}>Вторичная</option>
                        <option value="success" ${button.type === 'success' ? 'selected' : ''}>Успех</option>
                    </select>
                </div>
            </div>
        `).join('');
    },

    // Функции добавления элементов
    addBenefit: function(type) {
        const newBenefit = {
            icon: "🎯",
            title: "Новое преимущество",
            description: "Описание преимущества"
        };
        
        if (!currentData[type === 'young' ? 'youngSpecialists' : 'curators'].benefits) {
            currentData[type === 'young' ? 'youngSpecialists' : 'curators'].benefits = [];
        }
        
        currentData[type === 'young' ? 'youngSpecialists' : 'curators'].benefits.push(newBenefit);
        
        const container = document.getElementById(`preim-${type}-benefits-container`);
        container.innerHTML = this.generateBenefits(
            currentData[type === 'young' ? 'youngSpecialists' : 'curators'].benefits, 
            type
        );
    },

    addCompanyBenefit: function() {
        if (!currentData.company.benefits) currentData.company.benefits = [];
        currentData.company.benefits.push("Новое преимущество для компании");
        
        const container = document.getElementById('preim-company-benefits-container');
        container.innerHTML = this.generateCompanyBenefits(currentData.company.benefits);
    },

    addMetric: function() {
        const newMetric = { value: "100%", description: "Новая метрика" };
        if (!currentData.company.metrics) currentData.company.metrics = [];
        currentData.company.metrics.push(newMetric);
        
        const container = document.getElementById('preim-company-metrics-container');
        container.innerHTML = this.generateMetrics(currentData.company.metrics);
    },

    addCTAButton: function() {
        const newButton = { text: "🔗 Новая кнопка", url: "#", type: "primary" };
        if (!currentData.callToAction.buttons) currentData.callToAction.buttons = [];
        currentData.callToAction.buttons.push(newButton);
        
        const container = document.getElementById('preim-cta-buttons-container');
        container.innerHTML = this.generateCTAButtons(currentData.callToAction.buttons);
    },

    // Функции удаления элементов
    removeBenefit: function(type, index) {
        if (confirm('Удалить это преимущество?')) {
            currentData[type === 'young' ? 'youngSpecialists' : 'curators'].benefits.splice(index, 1);
            const container = document.getElementById(`preim-${type}-benefits-container`);
            container.innerHTML = this.generateBenefits(
                currentData[type === 'young' ? 'youngSpecialists' : 'curators'].benefits, 
                type
            );
        }
    },

    removeCompanyBenefit: function(index) {
        if (confirm('Удалить этот пункт?')) {
            currentData.company.benefits.splice(index, 1);
            const container = document.getElementById('preim-company-benefits-container');
            container.innerHTML = this.generateCompanyBenefits(currentData.company.benefits);
        }
    },

    removeMetric: function(index) {
        if (confirm('Удалить эту метрику?')) {
            currentData.company.metrics.splice(index, 1);
            const container = document.getElementById('preim-company-metrics-container');
            container.innerHTML = this.generateMetrics(currentData.company.metrics);
        }
    },

    removeCTAButton: function(index) {
        if (confirm('Удалить эту кнопку?')) {
            currentData.callToAction.buttons.splice(index, 1);
            const container = document.getElementById('preim-cta-buttons-container');
            container.innerHTML = this.generateCTAButtons(currentData.callToAction.buttons);
        }
    },

    // Сбор данных из формы
    gatherData: function() {
        return {
            pageSettings: {
                title: val('preim-page-title') || "Преимущества участия в НТК",
                heroTitle: val('preim-hero-title') || "НАУЧНЫЙ НАВИГАТОР",
                mainSectionTitle: val('preim-main-section-title') || "Преимущества участия в НТК",
                lastUpdated: new Date().toISOString()
            },
            youngSpecialists: {
                sectionTitle: val('preim-young-title') || "Для молодых специалистов",
                sectionSubtitle: val('preim-young-subtitle') || "",
                benefits: this.gatherBenefitData('young')
            },
            curators: {
                sectionTitle: val('preim-curator-title') || "Для кураторов",
                sectionSubtitle: val('preim-curator-subtitle') || "",
                benefits: this.gatherBenefitData('curator')
            },
            company: {
                sectionTitle: val('preim-company-title') || "Для компании",
                sectionSubtitle: val('preim-company-subtitle') || "",
                benefits: this.gatherCompanyBenefitData(),
                metrics: this.gatherMetricData()
            },
            callToAction: {
                title: val('preim-cta-title') || "Готовы начать свой путь в НТК?",
                highlightText: val('preim-cta-highlight') || "",
                buttons: this.gatherCTAButtonData()
            }
        };
    },

    gatherBenefitData: function(type) {
        const benefits = [];
        const containers = document.querySelectorAll(`#preim-${type}-benefits-container .benefit-card-editor`);
        
        containers.forEach((container, index) => {
            const icon = document.getElementById(`${type}-icon-${index}`)?.value || "";
            const title = document.getElementById(`${type}-benefit-title-${index}`)?.value || "";
            const description = document.getElementById(`${type}-benefit-desc-${index}`)?.value || "";
            
            if (title.trim()) {
                benefits.push({ icon, title, description });
            }
        });
        
        return benefits;
    },

    gatherCompanyBenefitData: function() {
        const benefits = [];
        const containers = document.querySelectorAll('#preim-company-benefits-container .company-benefit-editor');
        
        containers.forEach((container, index) => {
            const text = document.getElementById(`company-benefit-text-${index}`)?.value || "";
            if (text.trim()) benefits.push(text);
        });
        
        return benefits;
    },

    gatherMetricData: function() {
        const metrics = [];
        const containers = document.querySelectorAll('#preim-company-metrics-container .metric-card-editor');
        
        containers.forEach((container, index) => {
            const value = document.getElementById(`metric-value-${index}`)?.value || "";
            const description = document.getElementById(`metric-desc-${index}`)?.value || "";
            
            if (value.trim() && description.trim()) {
                metrics.push({ value, description });
            }
        });
        
        return metrics;
    },

    gatherCTAButtonData: function() {
        const buttons = [];
        const containers = document.querySelectorAll('#preim-cta-buttons-container .cta-button-editor');
        
        containers.forEach((container, index) => {
            const text = document.getElementById(`cta-btn-text-${index}`)?.value || "";
            const url = document.getElementById(`cta-btn-url-${index}`)?.value || "";
            const type = document.getElementById(`cta-btn-type-${index}`)?.value || "primary";
            
            if (text.trim() && url.trim()) {
                buttons.push({ text, url, type });
            }
        });
        
        return buttons;
    },

    // Сохранение данных
    save: function() {
        const updatedData = this.gatherData();
        downloadJS('preim-data.js', 'window.preimData', updatedData);
    },

    // Предварительный просмотр
    preview: function() {
        const data = this.gatherData();
        let html = `
            <html>
            <head>
                <title>${data.pageSettings.title}</title>
                <style>
                    body {font: 14px Arial; padding: 20px; background: #f5f5f5;}
                    h1 {color: #0e4094; text-align: center;}
                    h2 {color: #0e4094; margin-top: 40px;}
                    .benefit {background: white; margin: 15px 0; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);}
                    .metric {background: linear-gradient(135deg, #0e4094, #1a5bb5); color: white; padding: 20px; margin: 10px 0; border-radius: 10px; text-align: center;}
                </style>
            </head>
            <body>
                <h1>${data.pageSettings.title}</h1>
                
                <h2>${data.youngSpecialists.sectionTitle}</h2>
                <p><em>${data.youngSpecialists.sectionSubtitle}</em></p>
        `;
        
        data.youngSpecialists.benefits.forEach(benefit => {
            html += `
                <div class="benefit">
                    <h3>${benefit.icon} ${benefit.title}</h3>
                    <p>${benefit.description}</p>
                </div>
            `;
        });
        
        html += `<h2>${data.curators.sectionTitle}</h2><p><em>${data.curators.sectionSubtitle}</em></p>`;
        
        data.curators.benefits.forEach(benefit => {
            html += `
                <div class="benefit">
                    <h3>${benefit.icon} ${benefit.title}</h3>
                    <p>${benefit.description}</p>
                </div>
            `;
        });
        
        html += `<h2>${data.company.sectionTitle}</h2><p><em>${data.company.sectionSubtitle}</em></p>`;
        
        data.company.benefits.forEach(benefit => {
            html += `<p>• ${benefit}</p>`;
        });
        
        data.company.metrics.forEach(metric => {
            html += `<div class="metric"><h3>${metric.value}</h3><p>${metric.description}</p></div>`;
        });
        
        html += '</body></html>';
        openPreview(html);
    }
};

console.log('✅ PreimEditor загружен');
