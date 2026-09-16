# Installing Simple Budget Calculator

Pick the section that matches where you want it to run. Every option is the same idea: put the `SimpleBudgetCalculator` folder somewhere a web server can serve it, then open it in a browser.

---

## Option A — Your own website (cPanel / shared hosting)

Works on InMotion, Bluehost, HostGator, SiteGround, GoDaddy cPanel, and most shared hosts.

1. Log in to cPanel and open **File Manager**.
2. Go to your site's web root. Usually `public_html`. If the site is an addon domain, go into that domain's folder instead (for example `public_html/example.com`).
3. Click **Upload** and upload `SimpleBudgetCalculator.zip`.
4. Back in File Manager, right-click the zip → **Extract**. It creates a folder named `SimpleBudgetCalculator`.
5. Delete the zip (right-click → Delete).
6. Open `https://yourdomain.com/SimpleBudgetCalculator/` in a browser.

You must use `https://`. If your site doesn't have an SSL certificate, turn one on in cPanel (**SSL/TLS Status** → enable AutoSSL). Without it the page loads but won't install or work offline.

To put it at a different address, rename the folder. The app uses relative paths, so any folder name and any depth works.

**Verify it worked:** open the page, press F12 → **Application** tab → **Service Workers**. You should see `sw.js` listed as activated. On the same tab, **Manifest** should show the name and icons with no errors.

---

## Option B — Test locally with XAMPP (Windows / Mac / Linux)

1. Install XAMPP from apachefriends.org and start **Apache** from the XAMPP control panel.
2. Copy the `SimpleBudgetCalculator` folder into XAMPP's `htdocs` folder:
   - Windows: `C:\xampp\htdocs\SimpleBudgetCalculator`
   - Mac: `/Applications/XAMPP/htdocs/SimpleBudgetCalculator`
3. Open `http://localhost/SimpleBudgetCalculator/` in Chrome.

`localhost` is the one address where browsers allow service workers over plain http, so install and offline mode work here without SSL. If you open it as `http://127.0.0.1/...` or by your machine's IP, they won't.

Other phones on your Wi-Fi can load it by IP for a look, but they can't install it. For real phone testing, use Option A or C.

---

## Option C — Free static hosting (no server of your own)

All of these give you HTTPS automatically.

**Netlify (easiest):** go to app.netlify.com, sign in, and drag the `SimpleBudgetCalculator` folder onto the "Deploy" area. You get a URL in about ten seconds.

**GitHub Pages:** create a repository, upload the folder's contents (the files, not the folder), then Settings → Pages → Source: main branch → Save. URL is `https://username.github.io/repo-name/`.

**Cloudflare Pages / Vercel:** same drag-and-drop or Git flow.

---

## Option D — Python, no XAMPP

From a terminal inside the `SimpleBudgetCalculator` folder:

```
python -m http.server 8080
```

Open `http://localhost:8080/`. Same localhost rule as XAMPP.

---

## Common problems

**"I changed something and it doesn't show up."**
You didn't bump `CACHE_VERSION` in `sw.js`, or you did and the browser hasn't picked it up yet. Bump it, then in DevTools → Application → Service Workers click **Unregister**, and hard-reload (Ctrl+Shift+R).

**No install button in Chrome.**
Check the address starts with `https://` (or `http://localhost`). Then DevTools → Application → Manifest — any red error there explains it. The most common one is a wrong path to an icon, which happens if files were moved out of the folder.

**Fonts look wrong.**
The `fonts/` folder didn't upload, or the host is blocking `.woff2`. On Apache, add a `.htaccess` in the folder with:
```
AddType font/woff2 .woff2
```

**iPhone: data disappeared after installing to Home Screen.**
Expected. iOS keeps the installed app's storage separate from Safari's. Enter your numbers in the installed app.

**Works on desktop, blank on phone.**
Nearly always a mixed-content or certificate problem. Confirm the certificate is valid on the phone (no warning page) and that nothing in the page is being loaded over http.

---

## Removing it

Delete the folder from the server. Users who installed it will see a blank/offline page next time; they uninstall it like any app.
