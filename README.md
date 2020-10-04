# News-explorer-api

## Бекэнд для приложения news-explorer - API, c помощью которого осуществляется аутентификации пользователей и сохранения статей. 
## API расположен на домене: https://www.api.my-news-explorer.gq, https://api.my-news-explorer.gq

### Используемые технологии:
#### - Node.js, express.js
#### - DB: MongoDB, mongoose,

#### В приложении реализовано шифрование пользовательских паролей с помощью bcrypt, настроены Rate-Limit и Helmet. Выпущен и подключен SSL-сертификат для безопасного обмена информацией медлу клиентом и сервером.  


### Информация по запуску: 
#### - склонировать репозиторий;
#### - установить зависимости - npm i;
#### - запустить приложение в dev-режиме: npm run dev;
#### - для продакшн режима создать и загрузить на сервер файл .env с переменными окружения (см. .env-sample)
