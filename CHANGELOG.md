Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-18 13:27 +0700

    #32
    
    1. Готова модель для регистрации заказа.
    2. Добавлена страница /orders

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-17 15:35 +0700

    #31
    
    1. В компонент OrderCard добавлен блок для предзаказа. Логика: Выбирать позиций в характеристиках можно сколько угодно, но если количество больше остатка то это уйдет в предзаказ иначе позиция уйдет в заказ.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-16 20:30 +0700

    #30
    
    1. Кнопка оформить заказ активна. Создается заказ и отправляется на сервер. Обрабатываются ошибки.
    2. Создал компонент модального окна
    3. Добавлен ui button
    4. Правки дизайна

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-15 15:40 +0700

    #29
    
    1. Добавил компонент SelectInput
    2. На странице /order связал SelectInput с выбором company

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-09 20:09 +0700

    #28
    
    1. Для каталога добавил CatalogPagination, теперь можно листать страницы

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-09 17:43 +0700

    #27
    
    1. Парвки дизайна страници каталога
    2. Добавлен компонент CatalogItem на котором ссылки на страницу с описанием и страницу с заказом


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-09 13:52 +0700

    #26
    
    1. Страница формирования /order заказа готова.
    2. Для /order добавлен параметр в router, формироовать заказ можно по ссылке /order/:article
    3. Компоненты OrderHeaderCard и OrderCard интерактивные и связаны с таблицей приложений ProductOffersOrderCard
    4. Количество добавляемых характеристик ограничено параметром остатка - больше добавить нельзя.
    5. Правки дизайна

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-06 19:10 +0700

    #25
    
    1. На странице /order компонент с характеристиками стал интерактивный, возвращает массив выбранных характеристик продукта.
    2. Для /order сделан слайдер изображений
    3. Добавлен компонент для создания заказа

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-04 20:08 +0700

    #24
    
    1. Доработка комопонента ProductOffersOrderCard на странице /order
    2. Изменение поведения компонентов imput и checkbutton
    3. Правка дизайна

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-02 17:25 +0700

    #23
    
    1. На страницу /catalog добавил кнопку вверх

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-02 17:25 +0700

    #22
    
    1. Связал страницу /catalog с /product. Теперь из каталога можно переходить к конкретному товару по клику

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-1 14:12 +0700

    #21
    
    1. Правки дизайна на странице /catalog
    2. Добавлена анимация в переключение страниц

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-31 16:32 +0700

    #20
    
    1. Добавлена страница order
    2. Правки дизайна
    3. Изменена страница /catalog, добавлено меню по категориям, каталог подгружается.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-29 16:32 +0700

    #19
    
    1. Добавлена страница order
    2. Правки дизайна

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-28 17:17 +0700

    #18
    
    1. Переделан слайдер

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-26 12:52 +0700

    #17
    
    1. В компоненте CompanyAboutSmallCard название складов теперь первые буквы слов в заглавном регистре

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-25 20:20 +0700

    #16
    
    1. Добавлены ссылки с роутами для /company
    2. Добавлен копонент на главную CompanyAboutSmallCard

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-10-23 20:20 +0700

    #15
    
    1. Доработано меню Sidebar
    2. В меню добавлен switch c debugMode
    
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
