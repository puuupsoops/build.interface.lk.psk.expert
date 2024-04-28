# lk.psk.expert

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Расчет скидки
| Статус | Скидка клиента |Ограничение| Дополнительно |
|--------|--------|-----------|---------------|
|Outlet|❌||Распродажа (_ликвидация товара, позиция закрывается_)|
|Discount|❌||Скидка (_видимо включена уже в цену_)|
|Activity|❌||_Закуп от производителя_ |
|New collection|✅| не больше `MAX_DISCOUNT` из 1С |
|(Пустой)|✅| |- (слэш) в ЛК|
|~~Soon~~|||_не используется_|
|~~Upgrade~~|||_не используется_|
|~~Под заказ~~|||_не используется_|
|~~Расширение ассортимента~~|||_не используется_|