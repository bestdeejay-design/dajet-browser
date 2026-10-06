# Dajet

**English** · [Русский](README.ru.md)

Silent to the network. Speaks in style.

**~6 MB** · macOS 14+ · WebKit · free

![Start screen of Dajet — black screen and input line](.github/screenshot.png)

*Dajet start screen (mockup, direction A — [docs/CHOICE.md](docs/CHOICE.md)). Live version: [docs/demo-start.html](docs/demo-start.html).*

---

## What it is

You open Dajet. A screen. One input line. Nothing else.

Type an address — you're on the page. Type words — you search. No side menus, promo tiles, "tips of the day", or tabs staring at you.

## Principle

Dajet holds a position big browsers can't copy: **a home that stays silent**.

Open Network Monitor. Launch Dajet. Zero connections. Without your action — nothing leaves the machine. This is not a promise. It's a verifiable claim, and it's part of the release checklist.

- No telemetry
- No accounts, no cloud
- No ads
- No "online widgets" (weather, news, rates)
- Updates — on request only

## Features

- **One input line** — address or search. Suggestions from your history, nothing leaves the network before Enter
- **Tabs** — `⌘T` new, `⌘W` close. Top or side
- **Pinned tabs** — shrink to an icon, stay out of the way
- **Split View** — two pages side by side (`⌥⌘N`)
- **Ad blocker** — at network level, before render
- **Hide element forever** — `⇧⌘H`, click a cookie banner
- **Reader mode** — `⇧⌘R`
- **Floating video** — `⇧⌘P`
- **Passwords in macOS keychain** — encrypted by the system
- **Chrome extensions** — paste a Chrome Web Store link (macOS 15.4+)

## Start screen

Right now — pure silence: an empty screen and an input line.

The start screen shape is an open project decision. Options and demos: [docs/CHOICE.md](docs/CHOICE.md) · [docs/DEMOS.md](docs/DEMOS.md). Themes and widgets are postponed, not in v1.

## Privacy

| What | Where | Who can read |
|---|---|---|
| Passwords | macOS login keychain | Dajet |
| History, bookmarks | `~/Library/Application Support/Dajet/` | You |
| Cookies | WebKit storage | Sites |
| Everything else | Nowhere | — |

A private tab (`⇧⌘N`) leaves nothing after closing.

## Install

**Download:** [bro.dajet.ru](https://bro.dajet.ru)

**Build it yourself:**

```bash
git clone https://github.com/dajetbro/dajet-browser
cd dajet-browser
./build.sh
```

## Code and license

Active development: [bestdeejay-design/dajet-browser](https://github.com/bestdeejay-design/dajet-browser).

Dajet is a fork of [Search](https://github.com/driceroland/Search) (© Office Commun, MIT). License — [MIT](LICENSE): the Search name and its icon are not used in the distribution.
