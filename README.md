<picture><img src="assets/header.svg" alt="Dajet"></picture>

# Dajet

**Silence, styled.** — a quiet browser for macOS. ~7 MB · WebKit · free.

Open Dajet. A screen. One input line. Nothing else.

**🌐 Versions:** [English](README.md) · [Русский](README.ru.md)

## What it is

Dajet holds a position big browsers can't copy: **a home that stays silent**.

Launch it, open Network Monitor — zero connections. Nothing leaves the machine without your action. Not a promise: a verifiable claim, part of the release checklist.

- No telemetry, no accounts, no cloud
- No ads, no "online widgets" (weather, news, rates)
- Updates — on request only

## What it can

- **One input line** — address or search; suggestions from local history, nothing leaves before Enter
- **Ad blocker** — at network level, before render
- **Hide element forever** — `⇧⌘H`, click a cookie banner away
- **Reader mode** `⇧⌘R` · **Floating video** `⇧⌘P`
- **Split View** — two pages side by side (`⌥⌘N`); pinned tabs shrink to an icon
- **Passwords** in macOS keychain — encrypted by the system
- **Chrome extensions** — paste a Chrome Web Store link (macOS 15.4+)
- **Private tab** (`⇧⌘N`) — leaves nothing after closing

## Privacy

| What | Where | Who can read |
|---|---|---|
| Passwords | macOS login keychain | Dajet |
| History, bookmarks | `~/Library/Application Support/Dajet/` | You |
| Cookies | WebKit storage | Sites |
| Everything else | Nowhere | — |

## Install

**Download:** [bro.dajet.ru](https://bro.dajet.ru) · **Build from source:**

```bash
git clone https://github.com/dajetbro/dajet-browser
cd dajet-browser
./build.sh
```

CI checks run on [GitHub Actions](https://github.com/bestdeejay-design/dajet-browser/actions). Live site: [bro.dajet.ru](https://bro.dajet.ru).

## License

MIT — [LICENSE](LICENSE). Development: [bestdeejay-design/dajet-browser](https://github.com/bestdeejay-design/dajet-browser).

---

<picture><img src="assets/footer.svg" alt=""></picture>

*Dajet is a fork of [Search](https://github.com/driceroland/Search) (© Office Commun, MIT). The Search name and icon are not used in the distribution.*