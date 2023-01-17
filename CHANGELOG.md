Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2023-01-17

    #0.2.62.1
    1. Временно скрыл кнопку WORD в КП
    2. Добавленный временный калькулятор наценки/скидки в КП
    3. в КП1, добавлено перенаправление на страницу создания заказа

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2023-01-07

    #0.2.62
    1. При переходе на страницу КП из списка заказов или из оформления нового заказа в КП подставляется выбранный заказ
    
Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2022-12-29

    #0.2.61-fix
    1. Some text hase been replaced in KP
    2. Bug fixed: the dropdown now sets the value of the address, instead of the label

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-28

    #0.2.61
    1. На странице КП добавлен выбор контрагента и выбор адреса самовывоза

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-27

    #0.2.60
    1. На странице КП предоплата вносится в процентах, Поставщик выбирается из контрагентов.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-26

    #0.2.59
    1. На странице КП добавил обработку заголовка КП, загрузку лого.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-24

    #0.2.58
    1. На странице КП добавил дополнения.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-23

    #0.2.57
    1. На странице КП добавил создание КП на основе черновика.

Author: Vasilii Polshakov <45201a@gmail.com>
Date:   2022-12-20

    #0.2.56-fix
    1. Last name hidden in personal buttons Name component
    2. Main notification text is replace
    3. Replaced production websoket address

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-19

    #0.2.56
    1. Аватар в профиле изменил тип на base64 и при пустом аватаре ставится заглушка
    2. Исправил ошибку с фильтром статуса на странице с заказами
    3. Из страницы с заказами нельзя перейти к оформлению претензии если статус заказа не Отгружен или Закрыт
    4. Исправил - при оформлении заказа если MAX_DISCOUNT = 0 то MAX_DISCOUNT не учитывается

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-12

    #0.2.55
    1. Добавил выбор типа коммерческого предложения PDF или WORD
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-08

    #0.2.54
    1. В конструктор КП добавлен поиск организации по ИНН

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-04

    #0.2.53
    1. Добавлен конструктор КП
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-11-22

    #0.2.52
    1. Работа с таблицей с заказами. Улучшил поведение масштабируемых колонок.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-11-19

    #0.2.51
    1. В таблице с заказами можно менять размер колонок и скрывать колонки.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-11-12

    #0.2.50
    1. При создании черновика можно задать имя
    2. В окне с черновиками имя можно менять

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-11-08

    #0.2.49
    1. На странице product/ исправлена подгрузка данных во всплывающем окне при поиске продукта. Сделал переадресацию на страницу product/:article
    2. В модальном окне с черновиками можно править названия. (пока без сохранения)

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-11-04

    #0.2.48
    1. Добавил ссылки на черновик в SideNavigation И SideMenu


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-27

    #0.2.47
    1. Доработки


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-26

    #0.2.46
    1. Добавлен выбор выбор куда включить счет ФРО или ЭС в зависимости от товаров в счете, если нет какого то склада то его и не покажет
    2. При пересчете  заказа учитывается MAX_DISCOUNT   


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-25

    #0.2.45
    1. Добавлена стоимость за доставку 900р и выбор куда включить счет ФРО или ЭС
    2. При создании заказа убрал ссылку на создание отгрузки


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-24

    #0.2.44
    1. Правка заказа вместе с информацией о доставке
    2. В таблицу с предложениями добавлен резерв


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-23

    #0.2.43
    1. Изменены карточки Storage для организации в соответствии с требованием ТЗ от 30,09,22
    2. Исправил баг с залипанием меню TopNav при переходе с одной страницы на другую
    3. Исправил ошибку отображения списков заказов, когда в заказе нет статуса или он некорректен.
    4. Правки дизайна


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-22

    #0.2.42
    1. При создании заказа можно выбирать адреса и дату для доставки
    2. Изменил название документов на карточке CompanyStorageCard

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-10-13

    #0.2.41
    1. Обновлена модель при создании заказа. Добавлены поля комментарий, запрос сертификатов и доставка.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-12-12

    #0.2.39
    1. Добавлена ссылка на запрос счета


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-29

    #0.2.38
    1. На карту OrderDetail отдельно подсчитывается общая сумма заказа и отдельно общая сумма предзаказа
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-27

    #0.2.37
    1. В таблицу Заказы добавлены иконки для статуса заказа
    2. Исправил баг - при повторении заказа цены из order_detail брались с учетом скидки 
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-22

    #0.2.36
    1. На страницу /profile добавлена карта с редактированием настроек оповещения 


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-20

    #0.2.35
    1. Добавлен аватар и фио в панель PersonalBar
    2. Редактирование и сохранение персональной информации


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-19

    #0.2.34
    1. Ссылка на редактирование профиля. 
    2. Редактирование Store, оптимизация.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-13

    #0.2.33
    1. Исправлены орфографические ошибки
    2. На странице company список складов теперь без скроллбара и можно выбирать стрелками
    3. Страница company адаптирована для мобильных устройств
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-13

    #0.2.32
    1. Изменил карту с информацией о менеджере. подгружается автоматически по uid и если не удалось подгрузить картинку - ставит заглушку
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-09

    #0.2.31
    1. Меню nav со ссылками на страницы Поиск товара Новый заказ Заказы Отгрузки Претензии теперь при прокрутки вниз прилипает к верху 
    2. Добавил pagination на страницы отгрузки и претензии

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-07

    #0.2.30
    1. Обновил таблицу со скидками

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-06

    #0.2.29
    1. Добавил pagination в таблицу с заказами с разбивкой на 10,25,50,все
    2. Добавил кнопку обновить на страницу с заказами
 
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-09-01

    #0.2.28
    1. Изменена модель создания заказа.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-08-31

    #0.2.27
    1. BagFix: Изменение заказа приведено в соответствии  с бекендом.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-08-30

    #0.2.26
    1. В списке заказов счет скачать можно только если проставлен статус check.doc_status?.StatusSchet

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-08-29

    #0.2.25
    1. Правки дизайна
    2. При создании заказа кнопка закрыть модальное окно недоступна до момента ответа сервера об успешном создании заказа
    3. При любой ошибке сервера теперь не перебрасывает на страницу 500 а всплывает окно с ошибкой.
    4. Загрузка документов http://89.111.136.61/api/order/4daff841-2540-11ed-8ce3-005056bb3b36/documents всегда возвращает 500. Добавил обработку этого события.
    5. Статус Резерв устанавливается если у заказа есть счета со статусом  1 - Предзаказ и  6 - В резерве. Править можно только заказы со статусом Резерв
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-08-22

    #0.2.24
    1. На страницу Заказы добавлен признак того что заказ в резерве
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-08-19

    #0.2.23
    1. Для мобильной вкрсии сделал автоматически скрываемое при скроллинге меню
    2. Правки css под мобильную версию
    3. Добавлена возможность при оформлении заказа добавить заказ в резерв
    4. Добавлена возможность редактировать заказ

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-08-01

    #0.2.22
    1. Большая правка css под мобильную версию.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-07-01

    #0.2.21
    1. Добавлен прогрессбар времени до закрытия Popup оповещения.
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-30

    #0.2.21
    1. Оповещения на Notification-bar можно удалять.
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-29

    #0.2.20
    1. Переехали с WebPack на Vite
    2. Изменил логику основного меню. При открытии меню не сдвигает контент а накрывает его и контент становится размытым.
    3. При клике на ссылку из основного меню меню закрывается.
    4. Доработал Logout

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-27

    #0.2.19
    1. Добавлена поддержка WebSocket сервера
    2. Добавлен компонент Notification
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-21

    #0.2.18
    1. Добавлен пункт изменить заказ. Временно отключен, ждем появления ендпоинта в бекенде.
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-17

    #0.2.17
    1. Работа над разделом help
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-15

    #0.2.16
    1. Работа над разделом help
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-09

    #0.2.15
    1. Работа над разделом help
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-09

    #0.2.14
    1. Работа над разделом help
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-08

    #0.2.13
    1. Работа над разделом help
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-06-06

    #0.2.12
    1. Размеры карточек складов теперь статические и не меняются
    2. Работа над разделом help
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-31

    #0.2.11
    1. Изменил логику отображение баланса  на карточках складов
    2. Убрал ссылку на сайт

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-24

    #0.2.10
    1. Небольшие правки дизайна
    2. Перенес карточку с документами в карточку с информацией о складе. Информация меняется от переключения showDoc

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-23

    #0.2.9
    1. Небольшие правки дизайна
    2. Имя менеджера отображается из GET /api/partners а телефоны из GET /api/manager
    3. Вынес адрес скачивания документов в отдельные файлы .env

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-19

    #0.2.8
    1. Убрал Создание претензии и Создание заявки на отгрузку если нет заказов.
    2. Изменение дизайна карты склада.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-17

    #0.2.7
    1. Добавил анимации в карту редактирования клиента
    2. На странице company изменил ссылку в Подробнее на /orders

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-16

    #0.2.6
    1. Добавил обработчик 404 в GET_CLAIMS.
    2. Изменил Карту склада, убрал шкалу со скидками.
    3. Добавил новый вид подсказок

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-05-06

    #0.2.5
    1. Добавил ссылку на список претензий в SideMenu.
    2. Добавил адрес терминала на страницу с созданием заявок на отгрузку раздел До транспортной
    3. BagFix: при создании нескольких заявок подряд на странице с успехом вместо прелоадера показывал номер заказа прошлой заявки пока создавалась новая заявка.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-26

    #0.2.4
    1. В календарь добавлены переключение вида Месяц | Неделя | День
    2. Изменил высоту пустых строк на карточке организации, теперь высота карточки не меняется при изменении контрагента.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-26

    #0.2.3
    1. На компоненте склад поменял если отсрочка 0 дней меняем поле на Предоплата


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-25

    #0.2.2
    1. Исправлена орфографическая ошибка
    2. Добавил индикатор наличия заказа в виде вывода количества позиций в TopNav напротив нового заказа.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-20

    #0.2.1
    1. При создании/редактировании адресов добавлено поле addres. Добавление происходит в одном окне в два шага. Сначала добавляется адрес, потом наименование.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-14

    #0.2.0
    1. При переходе по Способ получения товара в окне создания заказа старый заказ удаляется.
    2. В меню SideMenu добавил индикатор наличия заказа в виде вывода количества позиций в корзине.
   
   
   
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-14

    #0.1.99
    1. BagFix
   
   
   
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-14

    #0.1.98
    1. Правки дизайна
    
    
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-12

    #0.1.97
    1. При оформлении заявки на отгрузку выбор контрагента работает как фильтр списка заказов.
    2. Добавил прелоадер при оформлении заявки на отгрузку на время создания заявки в бекенде.
    
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-11

    #0.1.96
    1. Скидка не применяется на страницах product и order если статус товара status == 'Outlet' || status == 'Discount' || status == 'Activity'
    
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-11

    #0.1.95
    1. На странице с Отгрузки  добавил детали заявки.
    2. Убрал фильтры на страницах Заказы Отгрузки Претензии.
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-08

    #0.1.94
    1. bagFix
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-08

    #0.1.93
    1. На странице оформления заказа скидка применяется в таблицу с характеристиками
    2. На странице оформления заказа в карте с позициями заказа скидка применяется к каждой характеристике и суммарно считается итог в зависимости от выбранной организации
    


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-07

    #0.1.92
    1. На странице /product в компонет с калькулятором цен цена поступает с учетом скидки.
    2. При оформлении претензии выбор контрагента должен работать как фильтр списка заказов.



Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-06

    #0.1.91
    1. Добавил вывод версии приложения в панель навигации Sidebar.
    2. Добавил контекстное меню при клике на аватарку. В меню только выход.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-05

    #0.1.90
    1. Добавил страницу Интерактивный  каталог как iframe к /public/catalog/mobile/index.html
    2. В меню навигации SideNavigation добавил параметр чтобы при щелчке по некоторым пунктам меню сворачивалось. Сворачивается по всем каталогам.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-05

    #0.1.89
    1. Исправлен баг: при создании претензии если добавить еще одну претензию то сбрасывалось количество выбранных товаров.
    2. На странице списка заказов убрал поведение- в выпадающем меню все ссылки вели в начало страницы при нажатии.
    3. Из окна Детали заказа убрал возможность повторить заказ если детали заказа не перелетели с сервера.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-04-04

    #0.1.88
    1. Исправлен баг: при выборе активной компании не корректно отображалась информация о складах.
    2. На карту Информация о Компании добавлен функционал редактирования информации. Пока без отправки в бекенд, так как там нет методов
    3. Добавлен компонент Input.
    4. Во всех местах заменил Счёт № {{check.n}} на Счет.
    5. Добавлен обработчик ошибки 404 на действие Создать заказ.
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-29

    #0.1.87
    1. Добавлена возможность повторить заказ из таблици с заказами
    2. Из таблици с деталями добавлена возможность повторить заказ
    3. В таблиуе создания заказа добавлены колонка артикул и кнопку перехода к заказу продукта по артикулу

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-28

    #0.1.85
    1. Добавлен список претензий


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-28

    #0.1.86
    1. BugFix Добавлен ID заказа в создание претензии.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-25

    #0.1.84
    1. На странице оформления претензий список товаров отображается из выбранного заказа
    2. Адреса доставки в разделе логистика можно создавать/удалять/редактировать
    3. Цена в заголовках продукта и создания заказа отображается с бекенда как product.PRICE_OPT
       
       
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-24

    #0.1.83
    1. На странице список заказов в модальном окне Детали заказа появилась таблица с черновиком заказа.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-23

    #0.1.82
    1. BagFix создание заявки на отгрузку ТК
    
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-22

    #0.1.81
    1. На странице список заказов добавил календарь в фильтр заголовка ДАТА СОЗДАНИЯ
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-22

    #0.1.80
    1. На странице продукт в списке с характеристиками цены считаются с учетом скидки выбранного контрагента.
    2. Доработаны фильтры на странице Заказы и Отгрузки
 

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-21

    #0.1.79
    1. Хотелки и пожелалки. Незначительное движение ссылок из одного места в другое. Падеж ссылок за отсутствием оных нужных количествах. Счет можно скачать при статусе счета >= 2. Счет нельзя скачать при статусе счета < 2
   


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-18

    #0.1.78
    1. Добавлен список созданных заявок на отгрузку
    2. Убрал дебаг
    3. Протестировано на пустом пользователе, добавлены исключения - нет заказов, нет заявок на отгрузку, нет привязанных складов
    4. Добавлен обработчик ошибки создания заказа.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-17

    #0.1.77
    
    1. Добавлены все возможности Создать заявку на отгрузку
    2. Добавлена функция получения списка заявок на отгрузку


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-16

    #0.1.76
    
    1. На страницу с заказами добавлен фильтр по статусу заказа


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-15

    #0.1.75
    
    1. На страницу с заказами добавил фильтр в заголовок таблицы. Пока только для НАИМЕНОВАНИЕ
    

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-14

    #0.1.74
    
    1. На странице создания заявки на открузку Самовывоз добавлена карта и статический адрес.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-13

    #0.1.73
    
    1. Добавлена возможность загружать в претензии несколько файлов
    2. Добавлен обработчик успеха создания претензий


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-13

    #0.1.72
    
    1. Добавлена логика в страницу создания претензии


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-11

    #0.1.71
    
    1. На страницу с поиском товара добавлен ProductSearchInput с ajax-поиском товаров и показе ссылок в выпадающем меню 


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-10

    #0.1.70
    
    1. На ProductSliderCard оставлена только одна кнопка Заказать
    2. Добавлен поиск скидки по массиву с характеристиками и на ProductHeaderCard скидка применяется.


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-10

    #0.1.69
    
    1. На CompanyStorageCard добавлена шкала индивидуальных скидок.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-05

    #0.1.68
    
    1. BagFix в список заказов добавлена проверка на наличие массива счетов
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-03

    #0.1.67
    
    1. Добавлена логика на страницу создания отгрузок. Только для самовывоза.
    2. Делаю раздел с адресами заказов, бекенд не работает
    3. Для календаря добавлено состояние с ошибкой
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-02

    #0.1.66
    
    1. Изменен компонент OrderSearchCard - теперь он фильтрует таблицу с заказами согласно полям
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-01

    #0.1.65
    
    1. Добавлен переход из меню подробно в списке заказов на страницу оформления претензий
    2. Статические страницы для списка, создания и успеха претензии
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-03-01

    #0.1.64
    
    1. Добавлен переход из меню подробно в списке заказов на страницу оформления заявок на транспорт
    2. Создано модальное окно для деталей заказа.
    3. Делаю раздел с адресами заказов, бекенд не работает
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-24

    #0.1.63
    
    1. Добавлен обработчик Не найдено для запросов к каталогу
    2. В компоненте ProductSearchInput сделана привязка поисков артиклов в каталоге

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-24

    #0.1.62
    
    1. Добвлен рабочий функционал черновиков

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-17

    #0.1.61
    
    1. В заказе в слайдер добавлен компонент ProductInfoCard вместо ссылок на сертификаты и детали
    2. На компнент с OrderCard добавлена кнопка добавления в черновик. Черновики хранятся в LocaleStorage и при загрузки страницы оттуда достаются
    3. Добавлен компонент со списком черновиков и в TopNav кнопка для открытия компонента

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-17

    #0.1.60
    
    1. На страницу с заказами добавлена обработка статусов документов

    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-14

    #0.1.59
    
    1. На компонент ShipmentAddressInput добавлены функции сохранения и выбора адресов клавишами вверх.вниз.
    2. Адреса можно редактировать

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-13

    #0.1.58
    
    1. Для компонента ShipmentAddressInput добавил ajax поиск с подсказками с dadata.ru
    2. Адреса можно удалять

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-11

    #0.1.57
    
    1. В основное меню добавлен пункт с выходом из ЛК
    2. В список заказов добавлены ссылки на 4 сопроводительных документа
    3. Добавлена страница с редактированием адресов доставки

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-07

    #0.1.56
    
    1. На компонент TopNav добавлены кнопки быстрого перехода на нужные страницы.
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-03

    #0.1.55
    
    1. На странице с заказами, счета выводятся из массива checks.
    
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-02-02

    #0.1.54
    
    1. На карту компаний CompanyStorageCard добавлен переключатель для вкл/вкл отображения карты Документов CompanyStorageCard.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-28

    #0.1.53
    
    1. На страницу /orders добавлены ссылки на скачивание и просмотр счетов сформированных по результатам сформированного заказа.
 
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-27

    #0.1.52
    
    1. Добавлен компонент ProductSliderFullscreen. При клике на картинку в любом слайдере продукта открывается изображение в большом размере.
 
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-26

    #0.1.51
    
    1. #BagFix: отображение компонента CatalogPagination при не загруженном каталоге.
 
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-24

    #0.1.50
    
    1. На компонент ProductSearchResultCard со списком сопутсвующих артикулов добавлена кнопка поиска продукта.
    2. Небольшие правки дизайна
 
Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-18

    #0.1.49
    
    1. Добавлен компонент ProductSearchInput - текстовое поле для поиска продукта по наименованию или артикулу.
    2. Небольшие правки дизайна
 


Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-18 19:07+0700

    #0.1.48
    
    1. Добавлена модель Orders запрос данных с api/orders для нее
    2. На страницу Заказы добавлено отображение модели Orders в таблицу
    3. На страницу Заказы работают фильтры Контрагенит и Период (все считается из данных модели)

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-15 10:07+0700

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-16 19:26+0700

    #46
    
    1. Перенес кнопки со страницы заказа на модальное окно
    2. Исправил баг с удалением позиций из заказа 

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-15 10:07+0700

    #45
    
    1. AmountInput - Исправлена ошибка присутсвия в начале 0 при ручном вводе
    2. При создании нового заказа если количество заказываемого больше остатка то позиция разбивается на заказ и предзаказ.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2022-01-05 17:43 +0700

    #44
    
    1. Добавлена поддержка TypeScript. Переезжаем на TS

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-12-09 19:52 +0700

    #43
    
    1. Добавлен интерактивный компонент DatePicker

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-12-03 18:55 +0700

    #42
    
    1. В SideMenu добавил ссылку на сайт psk.expert
    2. Исправлена формулировка на странице с созданием заказа

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-12-03 17:05 +0700

    #41
    
    1. На странице со списком заявок на отгрузку добавил таблицу
    2. В панель навигации добавил логотип
    3. В SideMenu добавил ссылки

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-12-02 19:18 +0700

    #40
    
    1. На странице Заявка на отгрузку представление заполняется из полей формы

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-12-02 19:18 +0700

    #39
    
    1. Добавлена таблица на страницу с заказами

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-12-01 15:48 +0700

    #38
    
    1. Добавлены статические страницы shipments и shipments/request

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-30 19:27 +0700

    #37
    
    1. Обновлен дизайн страницы входа

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-29 16:31 +0700

    #36
    
    1. Изменения в меню навигации SideNavigation

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-27 20:50 +0700

    #35
    
    1. В меню разделы находящиеся в разработке стали отображаться с замком. Появилась подсказка.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-27 18:07 +0700

    #34
    
    1. Реализован компонент с новостями и слайдер предложений
    2. Главная страница готова.

Author: Vadim Zaboturin <vadimzab@gmail.com>
Date:   2021-11-23 21:34 +0700

    #33
    
    1. Добавил ответ на успешное добавление заказа в модальном окне страница /order.
    2. Убрал из ответа поиска те позиции в которых пустой артикул - это категории каталога.
    3. Сделал компонент ProductSearchResultCard со списком найденых товаров ограниченной высотой со скроллером
    4. Для позиций по которым нет предложений добавил преддложение с характеристикой 'Только предзаказ' для того чтобы позицию можно было добавить в заказ. 
    5. При создании заказа в компоненте с характеристиками корректно отображаются ПП/ДАТА

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
