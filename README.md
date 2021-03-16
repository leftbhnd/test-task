# Frontend — тестовое задание

Предлагаем вам решить тестовое задание.
Необходимо реализовать небольшое приложение с набором CRUD-операций.

Предъявляются следующие требования к приложению:

- Получить данные с backend'a и вывести их в табличку.
- Сделать кнопку добавления новой записи.
- Запись посылать на бэкэнд.
- Кнопка удаления записи должна быть напротив каждой строки таблицы, по клику запись удаляется запросом на бэкэнде, по успеху — удаляется на фронтэнде.
- Кнопка редактирования должна быть напротив каждой строки таблицы.
  - По клику на нее, в таблице все инпуты должны стать редактируемыми и на месте кнопки «редактировать», должна появиться кнопка «сохранить».
  - По нажатию на «сохранить», должен отправиться запрос на бэкэнд, по успеху — инпуты опять должны стать read only и кнопка поменяться на «редактировать».
- Сделать инпут для фильтрации.

## Ресурсы

- [Дизайн в Figma](https://www.figma.com/file/szLDQB0uwxtAXZ2LL7aL1L/Frontend-%E2%80%94-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5) (можете выбрать любой).
- [Шрифт IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono?preview.text_type=custom).

## Условия

- Используйте Vue/React.
- Используйте JS/TS.
- Работоспособность проверяйте в актуальном chrome.
- Детали, которых не хватает в задаче, можно выбрать на свое усмотрение.

## Есть 3 пути решения. В зависимости от ваших навыков, вы можете выбрать любой удобный

1. Реализовать свой небольшой сервер.
1. Развернуть docker контейнер с backend (будет инструкция, как развернуть)
1. Представим, что бэкендеры обещали развернуть среду со следующими методами и интерфейсами, но сейчас у них нет времени (вы можете реализовать свои заглушки отталкиваясь от следующих интерфейсов):

```ts
interface Item {
  id: number
}

/** Ответ методов POST PUT DELETE */
interface Response {
  /** Указывает на результат запроса */
  success: boolean
  /** Полезная нагрузка в виде Item записи или {}, в случае ошибки */
  payload: Item | {}
  /** Описание операции/ошибки */
  description: string
}

GET -> /api/
interface Response {
  success: boolean
  payload: Item[]
  description: string
}

POST -> /api/
(Content-Type: application/json)
interface Request {
  item: Item
}

PUT -> /api/
(Content-Type: application/json)
interface Request {
  item: Item
}

DELETE -> /api/
(Content-Type: application/json)
interface Request {
  /** id элемента, который необходимо удалить из базы */
  id: number
}
```

**Решение можно прислать в виде ссылки на любой публичный git-репозиторий: GitHub, Bitbucket, GitLab и т.п.**

Будет плюсом если:

- Будет использован TS
- Будет использован линтер
- Будет использован стандарт для коммитов
- Код будет покрыт тестами

Желаем успехов!  
Если будут какие-то вопросы, пишите - добавим уточнения в репу.

<hr>

Команда Promobot
