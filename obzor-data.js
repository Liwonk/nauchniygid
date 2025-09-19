// obzor-data.js - Данные для страницы "Обзор компании" с исправленным содержанием второго слайда
// Обновлено: 12.08.2025 - убрана интерактивность таблицы

window.obzorData = {
    // Основные настройки страницы
    pageSettings: {
        title: "Обзор структуры компании и текущих вызовов",
        heroTitle: "НАУЧНЫЙ НАВИГАТОР", 
        mainSectionTitle: "Обзор структуры компании и текущих вызовов",
        lastUpdated: "2025-08-12T16:30:00.000Z"
    },

    // Введение в компанию
    companyIntro: {
        sectionTitle: "ПАО «Газпром нефть»",
        sectionSubtitle: "Интегрированная нефтегазовая компания полного цикла",
        description: "«Газпром нефть» реализует полный цикл операций: от разведки и добычи углеводородов до переработки нефти и реализации продукции. Компания присутствует в 16 регионах РФ и 4 зарубежных странах."
    },

    // Основная таблица вызовов (слайд 1)
    challengesMatrix: {
        sectionTitle: "Текущие вызовы перед компанией",
        sectionSubtitle: "Соответствие технологических вызовов этапам развития активов",
        
        // Колонки таблицы (этапы развития)
        stages: [
            { id: "current", name: "ТЕКУЩИЕ АКТИВЫ", color: "#ffffff", description: "Зрелые месторождения" },
            { id: "triz_west", name: "ТРИЗ ЗАП. СИБИРЬ", color: "#ffffff", description: "Трудноизвлекаемые запасы" },
            { id: "east_siberia", name: "ВОСТОЧНАЯ СИБИРЬ", color: "#ffffff", description: "Новые регионы освоения" },
            { id: "kin45", name: "КИН 45", color: "#ffffff", description: "Повышение нефтеотдачи" },
            { id: "arctic", name: "АРКТИКА (СУША)", color: "#ffffff", description: "Экстремальные условия" },
            { id: "shelf", name: "ШЕЛЬФ", color: "#ffffff", description: "Морская добыча" }
        ],

        // Строки таблицы (технологические вызовы)
        challenges: [
            {
                id: "drilling_complications",
                title: "Бурение и освоение в осложненных условиях",
                subtitle: "Разработка, строительство и заканчивание скважин, эксплуатация в условиях АВПД/АНПД и Шельфа",
                stages: {
                    current: false,
                    triz_west: true,
                    east_siberia: true,
                    kin45: false,
                    arctic: true,
                    shelf: true
                }
            },
            {
                id: "kin_increase",
                title: "Увеличение КИН третичными МУН",
                subtitle: "Повышение эффективности разработки запасов",
                stages: {
                    current: true,
                    triz_west: true,
                    east_siberia: true,
                    kin45: true,
                    arctic: false,
                    shelf: true
                }
            },
            {
                id: "remote_facilities",
                title: "Обустройство удаленных объектов в сложных климатических условиях",
                subtitle: "Снижение совокупной стоимости владения объектов КС в криолитозоне",
                stages: {
                    current: false,
                    triz_west: false,
                    east_siberia: true,
                    kin45: false,
                    arctic: true,
                    shelf: false
                }
            },
            {
                id: "remote_operations",
                title: "Эксплуатация удалённых объектов и инфраструктуры",
                subtitle: "Автономизация и удалённое управление активами/инфраструктурой, добыча в осложненных условиях",
                stages: {
                    current: false,
                    triz_west: true,
                    east_siberia: true,
                    kin45: false,
                    arctic: true,
                    shelf: false
                }
            },
            {
                id: "exploration_efficiency",
                title: "Эффективность изучения новых объектов и регионов",
                subtitle: "Высокотехнологичные методы полевых и скважинных исследований",
                stages: {
                    current: true,
                    triz_west: true,
                    east_siberia: true,
                    kin45: false,
                    arctic: true,
                    shelf: true
                }
            },
            {
                id: "mfrp_development",
                title: "Развитие и удешевление МГРП",
                subtitle: "Поиск и развитие технологий повышения эффективности многостадийного ГРП",
                stages: {
                    current: true,
                    triz_west: true,
                    east_siberia: false,
                    kin45: false,
                    arctic: false,
                    shelf: true
                }
            }
        ]
    },

    // ИСПРАВЛЕННЫЙ СЛАЙД 2: Ключевые технологические вызовы по стратегическим ставкам
    strategicChallenges: {
        sectionTitle: "Ключевые технологические вызовы по стратегическим ставкам",
        sectionSubtitle: "Технологические решения для различных регионов и направлений деятельности",
        challenges: [
            {
                id: "kin45_section",
                title: "КИН 45",
                color: "#0e4094",
                items: [
                    "Локализация оборудования и ПАВ",
                    "Повышение эффективности ПАВ/ПАА и оборудования для заказчика",
                    "Локализация и расширение производства компрессоров"
                ]
            },
            {
                id: "triz_western",
                title: "ТРИЗ ЗАПАДНОЙ СИБИРИ",
                color: "#1a5bb5",
                items: [
                    "Технологии локализации ТРИЗ и ГРР",
                    "Оптимизация бурения и эффективность заканчивания",
                    "Эффективность ГРП"
                ]
            },
            {
                id: "eastern_siberia",
                title: "ВОСТОЧНАЯ СИБИРЬ",
                color: "#0071bc",
                items: [
                    "Разработка карбонатных месторождений с низким ГЗ",
                    "Эксплуатация удаленных объектов и инфраструктуры",
                    "Борьба с осложнениями"
                ]
            },
            {
                id: "shelf_section",
                title: "ШЕЛЬФ",
                color: "#2d5aa0",
                items: [
                    "Системы подводной добычи (ПДК, ПНК)",
                    "Платформенные решения, искусственные острова"
                ]
            },
            {
                id: "arctic_section",
                title: "АРКТИКА",
                color: "#3b82c7",
                items: [
                    "Высокая стоимость программы ГРР",
                    "Строительство в криолитозоне",
                    "Информативность ГРР"
                ]
            }
        ]
    },

    // Статистика решений
    solutionStats: {
        sectionTitle: "Результаты работы с вызовами",
        totalChallenges: "57+",
        challengesDescription: "Крупные тех. вызовы проработаны",
        totalDirections: "6",
        directionsDescription: "Комплексных направлений тех. развития сформировано"
    },

    // Призыв к действию
    callToAction: {
        title: "Готовы решать технологические вызовы?",
        highlightText: "Важно: НТК — это ваша возможность предложить инновационные решения для стратегических задач компании и принять участие в технологическом развитии отрасли.",
        buttons: [
            { text: "🎯 Выбрать тему НТК", url: "tema.html", type: "primary" },
            { text: "🗂️ База направлений НТК", url: "baza.html", type: "secondary" }
        ]
    }
};

console.log('obzor-data.js загружен:', window.obzorData);
