Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-21 20:20 +0700

    #14
    
    1. Удален jQuery
    2. Вынесен отделно в компанент Debug блок со в ременными ссылками
    3. Переработано SideMenu 

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-19 19:39 +0700

    #13
    
    1. Добавлена прокрутка StorageBar на страницу /company
    2. Добавлен CHANGELOG

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-15 16:51:19 +0700

    #12
    
    1. Добавлен обработчик неудачных логинов.
    2. Добавлена валидация на поля login и password.
    3. Добавлен компонент SnackBar для отображения уведомлений.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-14 12:40:36 +0700

    #11
    1. Добавлена логика в компонент product-parcel
    2.Изменен стиль компонента Notification

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-13 17:49:05 +0700

    #11
    
    1. Переезд на SASS/SCSS
    2. Правки /producrt

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-12 19:59:49 +0700

    #10
    
    1. Добавлен поиск по bitrix_id.
    2. Добавлен слайдер.
    3. Добавлена подгрузка данных в компоненты на странице /product
    4. Измене компонент Preloader, теперь его можно вызывать в компонентах через provide/inject

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-11 18:34:23 +0700

    #9
    
    Добавлен storage product, обработчик doSearch

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-11 17:08:01 +0700

    #8
    
    Добавлена статическая страница /product с компонентами.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-07 14:36:53 +0700

    #7
    
    1. Добавлена обработка пустых массивов storages и documents в модели companys.
    2. Добавлена связь между компонентами CompanyStorgeDoc и CompanyCalendar по onClick на документ в CompanyStorgeDoc  в  CompanyCalendar  происходит gotoDate
    3.Замена favicon

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-05 13:24:49 +0700

    #6
    
    Добавлен подсчет скидок на компонент CompanySaleBar

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-05 00:43:44 +0700

    #5
    
    Добавлено заполнение ManagerCard, tooltip со скидками, обмен между компонентами Storage происходит по id а не по guid так как guid повторяется

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-04 17:14:58 +0700

    #4
    
    Fix

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-09-30 19:34:15 +0700

    #4
    
    1. Добавлены компоненты ManagerCard, CompanySaleBar
    2. Добавлены страницы /login, /404
    3. Добавлены методы авторизации с хранением токена в localStorage и без.
    4. Настроен router на работу с авторизированным пользователем.
    5. Правки css

Author: Vadim Zaboturin <34269051+crazy-tosser@users.noreply.github.com>
Date:   2021-09-28 17:29:09 +0700

    .
    
    Для /company на календарь добавлено отображение документов

Author: Vadim Zaboturin <34269051+crazy-tosser@users.noreply.github.com>
Date:   2021-09-27 11:08:48 +0700

    На /company добавлен интерактивный календарь

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-09-26 23:32:39 +0700

    На /company добавлена интерактивность в выборе между компонентами

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-09-26 15:51:59 +0700

    Обновлена страница /company. Добавлен vuex+axios. Правки в router

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2021-09-21 03:41:04 +0300

    fix

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2021-09-21 02:53:06 +0300

    update functional auth

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2021-09-20 04:23:55 +0300

    fix 2

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2021-09-20 04:09:06 +0300

    fix

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2021-09-20 04:02:34 +0300

    some fix

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2021-06-17 20:05:04 +0300

    init
