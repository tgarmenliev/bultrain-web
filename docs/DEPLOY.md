# Публикуване на bultrain.eu

Сайтът е **статичен**: `npm run build` създава папка `dist/`, която се качва на всеки статичен хостинг. Няма сървърен код.

## Какво прави `npm run build`

1. `vite build` – пакетира приложението в `dist/`.
2. `vite build --ssr` – прави временен сървърен пакет (`.ssr/`, изтрива се).
3. `scripts/prerender.mjs` – рисува **всяка страница, на двата езика**, в готов HTML файл (с `<title>`, описание, canonical, `hreflang`, вграден CSS) и пише `sitemap.xml` и `404.html`.
4. `scripts/post-build.mjs` – пише `dist/_headers` (CSP, HSTS и др.; хешът на вградения скрипт се смята автоматично).

Резултат:

| Адрес | Файл |
|---|---|
| `/` (български) | `index.html` |
| `/en` (английски) | `en.html` |
| `/privacy`, `/terms`, `/contact`, `/privacy-app` | `privacy.html` … |
| `/en/privacy`, `/en/terms`, `/en/contact` | `en/privacy.html` … |
| непознат адрес | `404.html` (със статус 404) |

Плоски файлове `име.html` работят с „чисти адреси" (без `.html`) на Netlify, Cloudflare Pages, Vercel и nginx.
**Не е нужен SPA fallback** (`/* → /index.html`). Не го добавяй: непознатите адреси трябва да връщат истински 404.

## Езикът е в адреса

- `/` е български, `/en` е английски. Така Google индексира и двата и показва правилния на правилните хора (`hreflang` е в `<head>` и в `sitemap.xml`).
- Сайтът **не пренасочва автоматично** по език на браузъра (това би объркало търсачките). Посетител с небългарски браузър, който никога не е избирал език, вижда тиха покана „Read in English".
- Който веднъж е избрал английски с превключвателя, при следващо отваряне на български адрес отива на `/en`.

## Хостинг

### Netlify или Cloudflare Pages (готово)

Build command: `npm run build` · Publish directory: `dist`. И двата четат `dist/_headers` сами. Нищо друго не се настройва.

### Vercel

Добави `vercel.json` (преведи `dist/_headers` в `headers`) и включи чисти адреси:

```json
{ "cleanUrls": true, "trailingSlash": false }
```

Заглавията (CSP, HSTS, …) копирай от `dist/_headers` – те са един и същи списък.

### nginx / собствен сървър

```nginx
root /var/www/bultrain/dist;
location / { try_files $uri $uri.html $uri/ =404; }
error_page 404 /404.html;
location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
location /fonts/  { add_header Cache-Control "public, max-age=31536000, immutable"; }
# + заглавията от dist/_headers (add_header …), и gzip/brotli
```

## Преди първото публикуване – проверка

- Домейнът в `src/i18n/routes.js` (`SITE_ORIGIN`) и `public/robots.txt` е `https://bultrain.eu`. Ако основният адрес е с `www`, смени го и пусни пренасочване от другия.
- HTTPS е включен (HSTS ще го изисква).
- Отвори `/`, `/en`, `/privacy`, `/en/terms` и един несъществуващ адрес (трябва да е 404).
- Google Search Console: добави сайта и подай `https://bultrain.eu/sitemap.xml`.

## Добавяне на нова страница

1. Компонент в `src/pages/`, ред в `loaders` в `src/App.jsx` и `<Route>`.
2. Заглавие/описание в `src/site/seo.js`, адрес в `PAGES` в `src/i18n/routes.js`.
3. Ред в `PAGE_CHUNKS` в `scripts/prerender.mjs`.
