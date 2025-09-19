// pages-config.js - Конфигурация страниц для редактирования
window.pagesConfig = {
    'preim': {
        title: 'Преимущества участия в НТК',
        file: 'preim.html',
        description: 'Описание преимуществ участия в научно-техническом конкурсе',
        dataFile: 'preim-data.js',
        type: 'page-content',
        icon: '⭐',
        status: 'active' 
    },
    'obzor': {
        title: 'Обзор структуры компании и текущих вызовов',
        file: 'obzor.html', 
        description: 'Обзор структуры компании, стратегических направлений и текущих вызовов в рамках НТК',
        dataFile: 'obzor-data.js',
        type: 'page-content',
        icon: '🏢',
        status: 'active'  
    },
    'tema': {
        title: 'Выбор темы для участия в НТК',
        file: 'tema.html',
        description: 'Руководство по выбору темы для участия в конкурсе',
        dataFile: 'tema-data.js',
        type: 'guide-content',
        icon: '🎯',
        status: 'active'  
    },
    'baza': {
        title: 'База актуальных направлений тем НТК',
        file: 'baza.html',
        description: 'База актуальных направлений тем НТК (ежегодное обновление)',
        dataFile: 'content-data.js',
        type: 'modal-content',
        icon: '🗂️',
        status: 'active'  
    },
    'kurator': {
        title: 'Список кураторов НТК',
        file: 'kurator.html',
        description: 'Список кураторов НТК (ежегодное обновление)',
        dataFile: 'kurator-data.js',
        type: 'people-content',
        icon: '👥',
        status: 'active'  
    },
    'zayavka': {
        title: 'Подача заявки на участие в НТК',
        file: 'razrabotka.html', // пока ведет на заглушку
        description: 'Процедура и требования для подачи заявки на участие',
        dataFile: 'zayavka-data.js',
        type: 'form-content',
        icon: '📋',
        status: 'development' 
    },
    'kommunikacii': {
        title: 'График и ссылки на коммуникационные сессии НТК',
        file: 'razrabotka.html', // пока ведет на заглушку
        description: 'Расписание коммуникационных сессий и ссылки для участия',
        dataFile: 'kommunikacii-data.js',
        type: 'schedule-content',
        icon: '📅',
        status: 'development' 
    },
    'ntk': {
        title: 'Дорожная карта проведения НТК',
        file: 'ntk.html',
        description: 'Подробная дорожная карта этапов проведения конкурса',
        dataFile: 'ntk-data.js',
        type: 'timeline-content',
        icon: '🗺️',
        status: 'active'  
    },
    'organizaciya': {
        title: 'Организация проведения НТК на базе ДО',
        file: 'razrabotka.html', // пока ведет на заглушку
        description: 'Особенности организации конкурса в дочерних обществах',
        dataFile: 'organizaciya-data.js',
        type: 'organizational-content',
        icon: '🏗️',
        status: 'development' 
    },
    'additional': {
        title: 'Дополнительные материалы',
        file: 'razrabotka.html', // пока ведет на заглушку  
        description: 'Дополнительные материалы и ресурсы для участников',
        dataFile: 'additional-data.js',
        type: 'resources-content',
        icon: '📚',
        status: 'development' 
    },
    
    'svyaz': {
        title: 'Обратная связь',
        file: 'svyaz.html',
        description: 'Форма обратной связи с администрацией',
        dataFile: 'svyaz-data.js',
        type: 'contact-form',
        icon: '📧',
        status: 'active'
    },
    'team': {
        title: 'Команда проекта',
        file: 'team.html',
        description: 'Редактирование списка участников команды',
        dataFile: 'team-data.js',
        type: 'team-info',
        icon: '👥',
        status: 'active'
    }
};

// Метаданные
window.contentTypes = {
    'page-content': {
        name: 'Обычная страница',
        description: 'Страница с заголовком, подзаголовком и основным контентом',
        fields: ['title', 'subtitle', 'content', 'sections']
    },
    'modal-content': {
        name: 'Модальный контент',
        description: 'Страница с модальными окнами и карточками',
        fields: ['sections', 'cards', 'modal_data']
    },
    'timeline-content': {
        name: 'Временная шкала',
        description: 'Дорожная карта с этапами и временными рамками',
        fields: ['title', 'stages', 'timeline']
    },
    'people-content': {
        name: 'Список людей',
        description: 'Список кураторов, контактов или участников',
        fields: ['title', 'people', 'departments']
    },
    'guide-content': {
        name: 'Руководство',
        description: 'Пошаговое руководство или инструкция',
        fields: ['title', 'steps', 'tips', 'examples']
    },
    'overview-content': {
        name: 'Обзорная информация',
        description: 'Структурированная обзорная информация',
        fields: ['title', 'overview', 'structure', 'challenges']
    },
    'form-content': {
        name: 'Форма заявки',
        description: 'Интерактивная форма для подачи заявок',
        fields: ['title', 'form_fields', 'requirements', 'instructions']
    },
    'schedule-content': {
        name: 'Расписание',
        description: 'График мероприятий и коммуникационных сессий',
        fields: ['title', 'events', 'schedule', 'links']
    },
    'organizational-content': {
        name: 'Организационная информация',
        description: 'Информация об организации и проведении мероприятий',
        fields: ['title', 'organization', 'procedures', 'contacts']
    },
    'resources-content': {
        name: 'Ресурсы и материалы',
        description: 'Дополнительные материалы и ресурсы',
        fields: ['title', 'resources', 'documents', 'links']
    },
    'contact-form': {
        name: 'Форма обратной связи',
        description: 'Настройки формы обратной связи',
        fields: ['title', 'form_config', 'recipients', 'messages']
    },
    'contact-info': {
        name: 'Контактная информация',
        description: 'Контакты организаторов и ответственных лиц',
        fields: ['title', 'contacts', 'departments', 'locations']
    }
};

window.getPageStatus = function(pageKey) {
    const page = window.pagesConfig[pageKey];
    return page ? page.status : 'unknown';
};

window.getPagesByStatus = function(status) {
    return Object.keys(window.pagesConfig).filter(key => 
        window.pagesConfig[key].status === status
    );
};

console.log('pages-config.js загружен, доступные страницы:', Object.keys(window.pagesConfig));
console.log('Готовые к редактированию:', window.getPagesByStatus('active'));
console.log('В разработке:', window.getPagesByStatus('development'));
