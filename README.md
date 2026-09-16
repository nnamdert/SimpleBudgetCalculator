# Simple Budget Calculator

A one-page monthly budget calculator that installs as an app on phones and desktops and works offline.
No accounts, no server code, no tracking. Everything the user types stays in their own browser.

© nnamdert.page. Free to use and host. Keep the footer credit intact.

## What it does

- Income at the top, expense categories below, a bar at the bottom showing what's left.
- Add or remove income sources and expense categories.
- Numbers save automatically on the device (browser localStorage) and are there on the next visit.
- Installable: Chrome/Edge on desktop and Android show an install button; iPhone/iPad users get a one-time "Share → Add to Home Screen" hint.
- Works with no internet connection after the first visit.

## What's in the folder

| File | Purpose |
|---|---|
| `index.html` | The whole app: page, styles, and script in one file |
| `manifest.json` | Tells the browser the app's name, icon, and colors for installing |
| `sw.js` | Service worker: caches the app so it works offline |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` | App icons |
| `fonts/` | Self-hosted fonts (no Google Fonts call, so offline and private) |
| `README.md` | This file |
| `INSTALL.md` | Step-by-step hosting instructions |

## Requirements

- A web server that can serve static files. That's it. No PHP, no database.
- **HTTPS** for the install button and offline mode to work. Browsers refuse to run service workers over plain `http://` — the one exception is `http://localhost`, which is why XAMPP works for local testing.

## Privacy

Nothing is sent anywhere. Data lives in the browser's localStorage on that one device. Clearing browser data erases it. There is no sync between devices by design.

## Customizing

Open `index.html` in a text editor.

- **Default categories and amounts:** edit the `DEFAULT_STATE` object near the top of the `<script>` block.
- **Colors:** the `:root { ... }` block at the top of `<style>`.
- **App name on the home screen:** `manifest.json` (`name`, `short_name`) and the `apple-mobile-web-app-title` meta tag in `index.html`.
- **Storage key:** if you change categories in a way that should reset everyone's saved data, change `STORAGE_KEY` from `sbc-state-v1` to `sbc-state-v2`.

## After ANY change to any file

Open `sw.js` and bump `CACHE_VERSION` (for example `sbc-v1` → `sbc-v2`). If you skip this, people who already installed the app keep seeing the old cached version indefinitely. This is the single most common PWA mistake.

## Browser support

Chrome, Edge, Firefox, Safari 15.4+. Install prompt: Chrome/Edge desktop, Chrome Android. iOS: manual Add to Home Screen (Safari doesn't offer a prompt).
