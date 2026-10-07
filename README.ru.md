<picture><img src="assets/header.svg" alt="Dajet"></picture>

# Dajet

**Молчит в сеть. Говорит стилем.** — тихий браузер для macOS. ~7 МБ · WebKit · бесплатно.

Открываешь Dajet. Экран. Одна строка ввода. Ничего больше.

**🌐 Версии:** [English](README.md) · **Русский**

## Что это

Dajet занимает позицию, которую большие браузеры не могут скопировать: **дом, который молчит**.

Запусти и открой Network Monitor — ноль соединений. Без твоего действия ничего не уходит в сеть. Это не обещание: проверяемое заявление, входит в релиз-чеклист.

- Нет телеметрии, аккаунтов и облака
- Нет рекламы и «онлайн-виджетов» (погода, новости, курсы)
- Обновления — только по запросу

## Что умеет

- **Одна строка ввода** — адрес или поиск; подсказки из локальной истории, ничего не уходит в сеть до Enter
- **Блокировщик рекламы** — на уровне сети, до рендера
- **Скрой элемент навсегда** — `⇧⌘H`, кликни по cookie-баннеру
- **Режим чтения** `⇧⌘R` · **Плавающее видео** `⇧⌘P`
- **Split View** — две страницы рядом (`⌥⌘N`); закреплённые вкладки сжимаются до иконки
- **Пароли** в macOS keychain — зашифрованы системой
- **Chrome-расширения** — вставь ссылку Chrome Web Store (macOS 15.4+)
- **Приватная вкладка** (`⇧⌘N`) — не оставляет ничего после закрытия

## Приватность

| Что | Где | Кто может читать |
|---|---|---|
| Пароли | macOS login keychain | Dajet |
| История, закладки | `~/Library/Application Support/Dajet/` | Ты |
| Cookies | хранилище WebKit | Сайты |
| Всё остальное | Нигде | — |

## Установка

**Скачать:** [последний релиз, DMG](https://github.com/bestdeejay-design/dajet-browser/releases/latest/download/Dajet.dmg) · **Собрать самому:**

```bash
git clone https://github.com/bestdeejay-design/dajet-browser
cd dajet-browser
./build.sh
```

CI-проверки идут в [GitHub Actions](https://github.com/bestdeejay-design/dajet-browser/actions). Живой сайт: [bro.dajet.ru](https://bro.dajet.ru).

## Лицензия

MIT — [LICENSE](LICENSE). Разработка: [bestdeejay-design/dajet-browser](https://github.com/bestdeejay-design/dajet-browser).

---

<picture><img src="assets/footer.svg" alt=""></picture>

*Dajet — форк [Search](https://github.com/driceroland/Search) (© Office Commun, MIT). Имя Search и его иконка в дистрибутиве не используются.*