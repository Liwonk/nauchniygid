// svyaz-data.js - Данные для страницы обратной связи
// Обновлено: 2025-01-27
window.svyazData = {
    pageTitle: "Обратная связь",
    hero: {
        title: "НАУЧНЫЙ НАВИГАТОР",
        pageTitle: "Обратная связь"
    },
    
    mainSection: {
        title: "Обратная связь",
        subtitle: "Поделитесь своими предложениями и идеями по улучшению Научного навигатора",
        description: "При нажатии \"Отправить\" откроется Outlook с готовым письмом"
    },

    form: {
        title: "Форма обратной связи",
        subtitle: "Поделитесь своими предложениями и идеями по улучшению Научного навигатора",
        description: "При нажатии \"Отправить\" откроется Outlook с готовым письмом",
        
        fields: {
            name: {
                label: "Ваше имя",
                placeholder: "Введите ваше имя",
                required: true,
                type: "text"
            },
            email: {
                label: "Email для связи",
                placeholder: "your.email@gazprom-neft.ru",
                required: true,
                type: "email"
            },
            department: {
                label: "Подразделение",
                placeholder: "Укажите ваше подразделение",
                required: false,
                type: "text"
            },
            feedbackType: {
                label: "Тип обращения",
                required: true,
                type: "select",
                options: [
                    { value: "", text: "Выберите тип обращения" },
                    { value: "suggestion", text: "Предложение по улучшению" },
                    { value: "bug", text: "Сообщение об ошибке" },
                    { value: "question", text: "Вопрос" },
                    { value: "feature", text: "Запрос новой функции" },
                    { value: "content", text: "Замечание по контенту" },
                    { value: "technical", text: "Техническая проблема" },
                    { value: "other", text: "Другое" }
                ]
            },
            message: {
                label: "Ваше сообщение",
                placeholder: "Опишите детально ваше предложение, замечание или вопрос...",
                required: true,
                type: "textarea",
                rows: 6
            }
        },

        submitButton: {
            text: "Отправить через Outlook",
            loadingText: "Подготовка письма..."
        }
    },

    emailConfig: {
        recipients: "Boyko.YaA@gazprom-neft.ru, Vlasov.VVa@gazprom-neft.ru, Zhironkin.VS@gazprom-neft.ru, Kleyn.AI@tomsk.gazprom-neft.ru, Krasikova.AE@gazprom-neft.ru, Ptushkin.ID@gazprom-neft.ru, Chekanina.EA@tmn.gazprom-neft.ru, Shirokovskiy.MI@gazprom-neft.ru",
        subject: "Обратная связь - Научный навигатор",
        bodyTemplate: {
            greeting: "Здравствуйте!",
            intro: "Новое обращение через форму обратной связи:",
            fields: {
                name: "Имя",
                email: "Email", 
                department: "Подразделение",
                type: "Тип обращения",
                message: "Сообщение"
            },
            footer: "Дата отправки",
            signature: "С уважением,\nКоманда Научного навигатора"
        }
    },

    messages: {
        success: {
            title: "✅ Готово!",
            text: "Outlook открыт с готовым письмом. Проверьте содержимое и нажмите \"Отправить\" в почтовом клиенте."
        },
        error: {
            title: "❌ Ошибка",
            text: "Не удалось открыть Outlook. Попробуйте еще раз или обратитесь к системному администратору."
        },
        validation: {
            required: "Пожалуйста, заполните все обязательные поля (отмеченные *)",
            email: "Введите корректный email адрес",
            minLength: "Слишком короткое сообщение (минимум 10 символов)"
        }
    },

    helpSection: {
        title: "Нужна помощь?",
        subtitle: "Альтернативные способы связи",
        contacts: [
            {
                title: "Техническая поддержка",
                description: "По вопросам работы платформы",
                contact: "support-ntk@gazprom-neft.ru",
                icon: "🔧"
            },
            {
                title: "Координатор НТК",
                description: "По вопросам участия в конкурсе",
                contact: "ntk@gazprom-neft.ru", 
                icon: "🎯"
            },
            {
                title: "Горячая линия",
                description: "Срочные вопросы",
                contact: "+7 (800) 555-35-35",
                icon: "📞"
            }
        ]
    },

    additionalInfo: {
        title: "Дополнительная информация",
        items: [
            {
                title: "Время ответа",
                description: "Мы стараемся отвечать на все обращения в течение 2-3 рабочих дней"
            },
            {
                title: "Конфиденциальность",
                description: "Ваши данные обрабатываются согласно политике конфиденциальности компании"
            },
            {
                title: "Статус обращения",
                description: "О ходе рассмотрения вашего обращения мы сообщим на указанный email"
            }
        ]
    },

    categories: {
        suggestion: "Предложение по улучшению",
        bug: "Сообщение об ошибке", 
        question: "Вопрос",
        feature: "Запрос новой функции",
        content: "Замечание по контенту",
        technical: "Техническая проблема",
        other: "Другое"
    },

    lastUpdated: new Date().toLocaleString('ru-RU')
};

console.log('svyaz-data.js загружен');
