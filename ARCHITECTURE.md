# Dajet — схема устройства

<!-- Тип диаграммы: flowchart -->
```mermaid
flowchart LR
    subgraph SRC["~/Projects/dajet-browser — локальная разработка"]
        direction TB
        CODE["Sources/Dajet/*.swift — 100 файлов кода"]
        BSH["build.sh release dmg"]
        B["build/ — артефакты: app, dmg, zip, appcast — НЕ в git"]
    end
    subgraph ORIGIN["bestdeejay-design/dajet-browser — GitHub main"]
        direction TB
        DOCS["docs/ — лендинг + релизные файлы (CNAME → bro.dajet.ru)"]
        F["docs/appcast.json — JSON-фид: версия, build, sha256"]
    end
    subgraph SITE["bro.dajet.ru — GitHub Pages (папка /docs)"]
        direction LR
        U1["/Dajet.dmg"]
        U2["/Dajet.zip"]
        U3["/appcast.json"]
        U4["/appcast.json.zip — 404 (нет Developer ID для подписи)"]
    end
    subgraph MAC["Установленный Dajet на этом Mac"]
        direction TB
        AP["/Applications/Dajet.app"]
        PD["~/Library/Application Support/Dajet/ — сессия, окна, история"]
        UP["Updater.swift — проверка фида, verify, swap"]
    end
    subgraph SHOW["Витрины dajetbro"]
        direction TB
        SH1["dajetbro/dajet-browser — README + маркетинговые docs"]
        SH2["dajetbro/dajetbro — профильный README студии"]
    end
    CODE --> BSH
    BSH --> B
    B -->|"cp в docs/ + коммит + push"| DOCS
    DOCS -->|"GitHub Pages раздаёт"| SITE
    F -.->|"копия"| U3
    U1 -->|"ручная установка"| AP
    U2 -.->|"для апдейтера"| UP
    UP -->|"проверка обновлений"| U3
    U4 -.->|"скрыт — апдейтер его не видит"| UP
    AP <--> PD
    DOCS -.->|"копия README и маркетинг-доков"| SH1
    SH1 -.->|"ссылка"| SH2
```

## Легенда

- **Локальная разработка** (`~/Projects/dajet-browser`) — исходный код и скрипт сборки. Артефакты `build/` в git не хранятся, они пересоздаются командой `./build.sh release dmg`.
- **Рабочий репозиторий** (`bestdeejay-design/dajet-browser`) — источник правды: код, документация и папка `docs/`, которая напрямую публикуется на bro.dajet.ru через GitHub Pages.
- **Сайт** (`bro.dajet.ru`) — раздаёт лендинг, установочный `Dajet.dmg`/`Dajet.zip` и JSON-фид обновлений `appcast.json`.
- **Подписанный фид** (`appcast.json.zip`) — то, что реально читает апдейтер установленного Dajet. Он недоступен (404), пока сборка не подписана Developer ID: без платного аккаунта Apple апдейтер честно сообщает «обновлений нет».
- **Витрины** (`dajetbro/*`) — публичные карточки проекта в организации Dajet design studio: только README и маркетинговые тексты, релизных файлов не содержат.
- **Установленный Dajet** — приложение на Mac; сессия, окна и история лежат в `~/Library/Application Support/Dajet/` и не затрагиваются обновлением — обновляется только бандл приложения, окна остаются на экране.
