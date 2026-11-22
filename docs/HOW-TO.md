# Как се поддържа bultrain.eu

Всичко се прави в тази папка. Публикуването е автоматично: когато нещо влезе в клона `main` в GitHub, Cloudflare изгражда сайта и го качва за 1–2 минути.

## Проверка преди публикуване
```bash
npm run dev        # сайтът на http://localhost:5173 (обновява се при запис)
npm run lint       # трябва да е чисто
npm run build      # изгражда dist/ и всички страници (трябва да завърши без грешки)
```

## Къде е кое
| Какво | Къде |
|---|---|
| Всички текстове (BG и EN) | `src/i18n/translations.js` (блок `bg:` от ред ~10, блок `en:` след него) |
| Политика за поверителност | `src/i18n/privacy-policy.js` (и двата езика, един файл) |
| Условия | `src/i18n/translations.js`, блок `terms` |
| Статии в пресата | `src/data/press.js` (+ превод в `translations.js`, блок `media.articles`) |
| Оценки в магазините | `src/data/press.js`, `ratings` |
| Ревюта | `src/i18n/translations.js`, блок `press.reviews` |
| **Нова версия на приложението** | `src/data/releases.js` (+ превод в `translations.js`, блок `releases.items`) |
| Стъпки на тура | `translations.js`, блок `tour.steps` |
| Данни на живо (табла, радар) | идват от `https://api.bultrain.eu`; не се пишат на ръка |
| Снимки и видео | `public/img/…`, `public/video/…`; оригиналите са в `design-source/inbox/` (не са в GitHub) и се обработват със `scripts/build-assets.mjs` и `scripts/build-app-update-assets.mjs` |
| robots, llms.txt | `public/robots.txt`, `public/llms.txt` |

## Често правени неща
- **Нова версия на приложението:** добави един запис най-долу в `src/data/releases.js` и два реда превод. Няма нова секция и няма нов линк в менюто.
- **Нова статия:** виж инструкцията най-горе в `src/data/press.js` (2 стъпки).
- **Промяна на текст:** намери го с Cmd+F в `translations.js`, смени го на двата езика. `{n}`, `{p}` и подобни не се пипат.
- **Дата на политиката:** `PRIVACY_UPDATED` и `LEGAL_UPDATED` в `src/site/legal-meta.js` (смени я само когато текстът наистина се променя).

## Публикуване
1. Работи в отделен клон (`git checkout -b име`), запиши (`git commit`), изпрати (`git push`).
2. Когато си доволен, влей в `main`. След 1–2 минути сайтът е нов.
3. Уведоми Bing: `npm run indexnow` (по желание, след по-големи промени).

## Ако нещо се счупи
- Върни последното публикуване: `git revert <commit>` и push в `main` (Cloudflare публикува отново старото).
- Cloudflare → Workers & Pages → проекта → **Deployments** показва дали build-ът е минал и защо не.

## Какво е настроено извън кода (в панелите)
- **Cloudflare:** DNS, пренасочване `www` → `bultrain.eu` (301), AI Crawl Control (всички ботове са разрешени).
- **Cloudflare → Scrape Shield → Email Address Obfuscation трябва да е ИЗКЛЮЧЕНО.** Когато е включено, Cloudflare подменя имейла в HTML-а с „[email protected]“, страницата не съвпада с това, което очаква React (грешка #418 в конзолата), прерисува се наново и сайтът става по-бавен (на мобилно оценката пада от 100 към ~89). Имейлът е умишлено публичен.
- **Google Search Console** и (по желание) **Bing Webmaster Tools**: sitemap `https://bultrain.eu/sitemap.xml`.
- **Защитни заглавия (CSP, HSTS…):** пишат се автоматично при build (`scripts/post-build.mjs`).

Подробности за хостинга: `docs/DEPLOY.md`. API на данните: `docs/NETWORK-API.md`.
