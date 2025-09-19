// svyaz-editor.js - Редактор обратной связи
// Версия: 1.0

window.SvyazEditor = {
    build: function() {
        let formFieldsHTML = '';
        if(currentData.form && currentData.form.fields){
            Object.keys(currentData.form.fields).forEach((fieldKey, idx) => {
                const field = currentData.form.fields[fieldKey];
                formFieldsHTML += this.generateFieldEditor(fieldKey, field);
            });
        }

        let contactsHTML = '';
        if(currentData.helpSection && currentData.helpSection.contacts){
            currentData.helpSection.contacts.forEach((contact, idx) => {
                contactsHTML += this.generateContactEditor(contact, idx);
            });
        }

        let html = `
            <h3 class="section-title">📧 Форма обратной связи</h3>
            <p style="background: #d4edda; padding: 10px; border-radius: 5px; color: #155724; margin-bottom: 20px;">
                <strong>✅ Загружены данные из svyaz-data.js</strong>
            </p>
            
            <h4>Основные настройки</h4>
            <div class="form-group">
                <label>Заголовок страницы</label>
                <input id="cf-page-title" value="${currentData.pageTitle || ''}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Заголовок секции</label>
                    <input id="cf-main-title" value="${currentData.mainSection?.title || ''}">
                </div>
                <div class="form-group">
                    <label>Подзаголовок секции</label>
                    <input id="cf-main-subtitle" value="${currentData.mainSection?.subtitle || ''}">
                </div>
            </div>
            
            <h4>Настройки формы</h4>
            <div class="form-row">
                <div class="form-group">
                    <label>Заголовок формы</label>
                    <input id="cf-form-title" value="${currentData.form?.title || ''}">
                </div>
                <div class="form-group">
                    <label>Описание формы</label>
                    <input id="cf-form-desc" value="${currentData.form?.description || ''}">
                </div>
            </div>
            
            <h4>Поля формы</h4>
            <div id="form-fields-container">
                ${formFieldsHTML}
            </div>
            <button class="add-card-btn" onclick="SvyazEditor.addFormField()">+ Добавить поле</button>
            
            <h4>Email настройки</h4>
            <div class="form-group">
                <label>Получатели (через запятую)</label>
                <textarea id="cf-recipients" rows="3">${currentData.emailConfig?.recipients || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Тема письма</label>
                <input id="cf-subject" value="${currentData.emailConfig?.subject || ''}">
            </div>
            
            <h4>Контакты помощи</h4>
            <div id="contacts-container">
                ${contactsHTML}
            </div>
            <button class="add-card-btn" onclick="SvyazEditor.addContact()">+ Добавить контакт</button>
            
            <div class="btn-group">
                <button class="btn btn-preview" onclick="SvyazEditor.preview()">👁️ Предпросмотр</button>
                <button class="btn btn-save" onclick="SvyazEditor.save()">💾 Скачать svyaz-data.js</button>
            </div>
        `;
        
        contentEdit.innerHTML = html;
    },

    generateFieldEditor: function(fieldKey, field) {
        return `
            <div class="modal-card-editor" id="field-${fieldKey}">
                <div class="modal-card-header">
                    <h6>Поле: ${field.label || fieldKey}</h6>
                    <button class="remove-card-btn" onclick="SvyazEditor.removeFormField('${fieldKey}')">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Ключ поля</label>
                        <input id="field-key-${fieldKey}" value="${fieldKey}" readonly>
                    </div>
                    <div class="form-group">
                        <label>Заголовок поля</label>
                        <input id="field-label-${fieldKey}" value="${field.label || ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Тип поля</label>
                        <select id="field-type-${fieldKey}">
                            <option value="text" ${field.type==='text'?'selected':''}>Текст</option>
                            <option value="email" ${field.type==='email'?'selected':''}>Email</option>
                            <option value="textarea" ${field.type==='textarea'?'selected':''}>Многострочный текст</option>
                            <option value="select" ${field.type==='select'?'selected':''}>Выпадающий список</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Обязательное поле</label>
                        <select id="field-required-${fieldKey}">
                            <option value="true" ${field.required?'selected':''}>Да</option>
                            <option value="false" ${!field.required?'selected':''}>Нет</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Placeholder</label>
                    <input id="field-placeholder-${fieldKey}" value="${field.placeholder || ''}">
                </div>
                ${field.type === 'select' ? this.generateOptionsEditor(fieldKey, field.options || []) : ''}
            </div>
        `;
    },

    generateOptionsEditor: function(fieldKey, options) {
        let optionsHTML = options.map((option, idx) => `
            <div class="option-editor" id="option-${fieldKey}-${idx}">
                <div class="option-header">
                    <span>Опция ${idx + 1}</span>
                    <button class="remove-card-btn" onclick="SvyazEditor.removeOption('${fieldKey}', ${idx})">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Значение</label>
                        <input id="option-value-${fieldKey}-${idx}" value="${option.value || ''}">
                    </div>
                    <div class="form-group">
                        <label>Текст</label>
                        <input id="option-text-${fieldKey}-${idx}" value="${option.text || ''}">
                    </div>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="form-group">
                <label>Опции выпадающего списка</label>
                <div id="options-${fieldKey}">
                    ${optionsHTML}
                </div>
                <button type="button" class="add-card-btn" onclick="SvyazEditor.addOption('${fieldKey}')">+ Добавить опцию</button>
            </div>
        `;
    },

    generateContactEditor: function(contact, idx) {
        return `
            <div class="contacts-editor" id="contact-${idx}">
                <div class="contact-header">
                    <h6>Контакт ${idx + 1}</h6>
                    <button class="remove-card-btn" onclick="SvyazEditor.removeContact(${idx})">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Заголовок</label>
                        <input id="contact-title-${idx}" value="${contact.title || ''}">
                    </div>
                    <div class="form-group">
                        <label>Иконка</label>
                        <input id="contact-icon-${idx}" value="${contact.icon || ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Описание</label>
                    <input id="contact-desc-${idx}" value="${contact.description || ''}">
                </div>
                <div class="form-group">
                    <label>Контакт (email или телефон)</label>
                    <input id="contact-contact-${idx}" value="${contact.contact || ''}">
                </div>
            </div>
        `;
    },

    addFormField: function() {
        const container = document.getElementById('form-fields-container');
        const newFieldKey = `field_${Date.now()}`;
        container.insertAdjacentHTML('beforeend', this.generateFieldEditor(newFieldKey, {
            label: 'Новое поле',
            type: 'text',
            required: false,
            placeholder: ''
        }));
    },

    removeFormField: function(fieldKey) {
        if(confirm('Удалить поле формы?')) {
            document.getElementById(`field-${fieldKey}`)?.remove();
        }
    },

    addContact: function() {
        const container = document.getElementById('contacts-container');
        const idx = container.children.length;
        container.insertAdjacentHTML('beforeend', this.generateContactEditor({
            title: 'Новый контакт',
            icon: '📞',
            description: 'Описание контакта',
            contact: 'contact@company.ru'
        }, idx));
    },

    removeContact: function(idx) {
        if(confirm('Удалить контакт?')) {
            document.getElementById(`contact-${idx}`)?.remove();
        }
    },

    addOption: function(fieldKey) {
        const container = document.getElementById(`options-${fieldKey}`);
        const idx = container.children.length;
        const optionHTML = `
            <div class="option-editor" id="option-${fieldKey}-${idx}">
                <div class="option-header">
                    <span>Опция ${idx + 1}</span>
                    <button class="remove-card-btn" onclick="SvyazEditor.removeOption('${fieldKey}', ${idx})">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Значение</label>
                        <input id="option-value-${fieldKey}-${idx}" value="">
                    </div>
                    <div class="form-group">
                        <label>Текст</label>
                        <input id="option-text-${fieldKey}-${idx}" value="Новая опция">
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', optionHTML);
    },

    removeOption: function(fieldKey, idx) {
        if(confirm('Удалить опцию?')) {
            document.getElementById(`option-${fieldKey}-${idx}`)?.remove();
        }
    },

    save: function() {
        const formFields = {};
        const fieldsContainer = document.getElementById('form-fields-container');
        [...fieldsContainer.children].forEach(fieldDiv => {
            const fieldId = fieldDiv.id.replace('field-', '');
            const fieldKey = val(`field-key-${fieldId}`) || fieldId;
            const fieldType = val(`field-type-${fieldId}`);
            
            formFields[fieldKey] = {
                label: val(`field-label-${fieldId}`),
                type: fieldType,
                required: val(`field-required-${fieldId}`) === 'true',
                placeholder: val(`field-placeholder-${fieldId}`)
            };

            if (fieldType === 'select') {
                const options = [];
                const optionsContainer = document.getElementById(`options-${fieldId}`);
                if (optionsContainer) {
                    [...optionsContainer.children].forEach((optionDiv, idx) => {
                        options.push({
                            value: val(`option-value-${fieldId}-${idx}`),
                            text: val(`option-text-${fieldId}-${idx}`)
                        });
                    });
                }
                formFields[fieldKey].options = options;
            }
        });

        const contacts = [];
        const contactsContainer = document.getElementById('contacts-container');
        [...contactsContainer.children].forEach((contactDiv, idx) => {
            contacts.push({
                title: val(`contact-title-${idx}`),
                icon: val(`contact-icon-${idx}`),
                description: val(`contact-desc-${idx}`),
                contact: val(`contact-contact-${idx}`)
            });
        });

        const outputData = {
            ...currentData,
            pageTitle: val('cf-page-title'),
            mainSection: {
                title: val('cf-main-title'),
                subtitle: val('cf-main-subtitle'),
                description: currentData.mainSection?.description || ''
            },
            form: {
                ...currentData.form,
                title: val('cf-form-title'),
                description: val('cf-form-desc'),
                fields: formFields
            },
            emailConfig: {
                ...currentData.emailConfig,
                recipients: val('cf-recipients'),
                subject: val('cf-subject')
            },
            helpSection: {
                ...currentData.helpSection,
                contacts: contacts
            },
            lastUpdated: new Date().toLocaleString('ru-RU')
        };

        downloadJS('svyaz-data.js', 'window.svyazData', outputData);
    },

    preview: function() {
        const title = val('cf-page-title');
        const mainTitle = val('cf-main-title');
        const formTitle = val('cf-form-title');
        
        let html = `
            <html>
            <head>
                <title>${title}</title>
                <style>body{font:14px Arial;padding:20px}h2{color:#0e4094}h3{color:#333}</style>
            </head>
            <body>
                <h1>${title}</h1>
                <h2>${mainTitle}</h2>
                <h3>${formTitle}</h3>
                <p>Форма обратной связи будет здесь...</p>
            </body>
            </html>
        `;
        openPreview(html);
    }
};

console.log('✅ SvyazEditor загружен');
