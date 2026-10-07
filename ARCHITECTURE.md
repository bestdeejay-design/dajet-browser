# Dajet — схема устройства

<!-- Тип диаграммы: flowchart -->
```mermaid
flowchart LR
    subgraph SRC["~/Projects/dajet-browser — локальная разработка"]
        direction TB
        CODE["Sources/Dajet/*.swift — 100 файлов кода"]
        BSH["build.sh release dmg"]
        RSH["release.sh — сборка → GitHub Release → фид → push"]
        B["build/ — артефакты: app, dmg, zip, appcast — НЕ в git"]
    end
    subgraph ORIGIN["bestdeejay-design/dajet-browser — GitHub main"]
        direction TB
        DOCS["docs/ — лендинг + фид (CNAME → bro.dajet.ru)"]
        F["docs/appcast.json — JSON-фид: версия, build, sha256, url"]
        REL["GitHub Releases — v<VERSION>-dajet: Dajet.dmg, Dajet.zip"]
    end
    subgraph SITE["bro.dajet.ru — GitHub Pages (папка /docs)"]
        direction LR
        U3["/appcast.json"]
        U4["/appcast.json.zip — 404 (нет Developer ID для подписи)"]
    end
    subgraph RELEASES["GitHub Releases — стабильный URL"]
        direction LR
        R1["/releases/latest/download/Dajet.dmg — для людей"]
        R2["/releases/latest/download/Dajet.zip — для апдейтера"]
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
    RSH --> B
    B -->|"release.sh: gh release create"| REL
    REL -->|"GitHub раздаёт /releases/latest/download"| RELEASES
    RSH -->|"обновляет фид в docs/ + push"| DOCS
    DOCS -->|"GitHub Pages раздаёт"| SITE
    F -.->|"копия"| U3
    R1 -->|"ручная установка"| AP
    R2 -.->|"для апдейтера"| UP
    UP -->|"проверка обновлений"| U3
    U4 -.->|"скрыт — апдейтер его не видит"| UP
    AP <--> PD
    DOCS -.->|"копия README и маркетинг-доков"| SH1
    SH1 -.->|"ссылка"| SH2
```

## Легенда

- **Локальная разработка** (`~/Projects/dajet-browser`) — исходный код и скрипты. Артефакты `build/` в git не хранятся, они пересоздаются командой `./build.sh release dmg`; `./release.sh` делает из них релиз целиком.
- **Рабочий репозиторий** (`bestdeejay-design/dajet-browser`) — источник правды: код, документация и папка `docs/`, которая напрямую публикуется на bro.dajet.ru через GitHub Pages.
- **GitHub Releases** (`v<VERSION>-dajet`) — хранилище установочных файлов `Dajet.dmg` и `Dajet.zip`. У них стабильные URL `/releases/latest/download/…`, поэтому фид и лендинг называют один адрес навсегда, а история git не пухнет от бинарников.
- **Сайт** (`bro.dajet.ru`) — раздаёт только лендинг и JSON-фид обновлений `appcast.json`; сам фид указывает на GitHub Releases.
- **Подписанный фид** (`appcast.json.zip`) — то, что реально читает апдейтер установленного Dajet. Он недоступен (404), пока сборка не подписана Developer ID: без платного аккаунта Apple апдейтер честно сообщает «обновлений нет».
- **Витрины** (`dajetbro/*`) — публичные карточки проекта в организации Dajet design studio: только README и маркетинговые тексты, релизных файлов не содержат.
- **Установленный Dajet** — приложение на Mac; сессия, окна и история лежат в `~/Library/Application Support/Dajet/` и не затрагиваются обновлением — обновляется только бандл приложения, окна остаются на экране.
