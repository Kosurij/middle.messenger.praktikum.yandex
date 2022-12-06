## Описание

Учебный проект второго спринта курса "Middle фронтенд разработчик". 

Добавлены:

- Из функциональности:
  - Валидация форм на фокус / блур / сабмит;
  - Переход на SPA: все рендерится на стороне клиента.
- Из инструментов:
  - TypeScript, линтеры;
  - Создан общий компонент и шина событий;
  - Внедрен компонентный подход.

## Ссылки.

[Ссылка на Netlify](https://lucky-truffle-2d27d8.netlify.app)

[Ссылка на PR](https://github.com/Kosurij/middle.messenger.praktikum.yandex/pull/1)

[Ссылка на макет в Figma](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1)

## Локальный запуск.

1. `npm install` — Установка необходимых зависимостей.
2. `npm start` — запуск проекта с отдачей статики локальным сервером (localhost:3000).
3. `npm dev` — запуск проекта для разработки сборщиком parcel (localhost:1234).

## FAQ

> Не собирается приложение при запуске `npm start`. 
> Ошибка `Building _array_like_to_array.mjs...
Error: Does not have node 1053`

В редких случаях возможно появление данное ошибки, которая полностю уходит при отсутствии поля `engines` в `package.json`.

Что нужно делать:
1. Удалить папку `.parcel-cache`
2. Удалить папку `dist`
3. Удалить из `package.json` поля `engines` и `targets`
4. Повторно запустить проект.



