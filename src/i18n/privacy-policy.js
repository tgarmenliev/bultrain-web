// The privacy policy, in both languages. It is the single source for /privacy, /en/privacy and the store-facing
// /privacy-app page (see src/site/PolicyBody.jsx). Section numbers are added when rendering.
//
// Every fact here comes from how the BulTrain backend actually works. Do NOT add claims that are not true of the
// code (for example "encrypted at rest" or "anonymous"). Block types: { p: html } | { ul: [html] } | { table: { head, rows } } | { h: text }.
// Strings contain our own static HTML (<strong>, <a>) - never user input.

const MAIL = '<a href="mailto:bultrain.app@gmail.com">bultrain.app@gmail.com</a>'
const CPDP = '<a href="https://cpdp.bg" target="_blank" rel="noopener noreferrer">cpdp.bg</a>'
const CF = '<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare</a>'

export const privacyBg = {
  heading: 'Политика за поверителност',
  lastUpdated: 'Последна актуализация',
  intro: 'Тази политика обяснява какви данни обработваме, когато използвате приложението BulTrain и уебсайта bultrain.eu, защо ги обработваме, колко дълго ги пазим и как можете да ги контролирате. Написана е на обикновен език и описва само това, което наистина правим.',
  summaryTitle: 'Накратко',
  summary: [
    'Няма акаунти. Не искаме и не получаваме имена, имейл адреси или телефонни номера.',
    '<strong>Местоположението Ви не напуска телефона.</strong> Умната аларма го използва само на Вашето устройство.',
    'За известията за закъснение и Live Activity нашият сървър пази случаен идентификатор на инсталацията, токен за известия и пътуванията, за които сте включили известия (влак, гари, часове).',
    'Тези данни се изтриват автоматично: при премахване на приложението, след 180 дни без активност, а пътуванията – 7 дни след края им.',
    'Уебсайтът не използва бисквитки, анализ или реклама.',
  ],
  sections: [
    {
      title: 'Кой отговаря за данните',
      blocks: [{ p: `Администратор е Тихомир Гърменлиев (физическо лице), създател на BulTrain. За всякакви въпроси относно данните: ${MAIL}.` }],
    },
    {
      title: 'Какви данни обработваме',
      blocks: [
        { p: 'BulTrain не изисква профил. Когато включите известия за пътуване, приложението и нашият сървър обработват следното:' },
        {
          ul: [
            '<strong>Идентификатор на инсталацията</strong> – случайно число, генерирано от приложението. Не е акаунт и не съдържа информация за Вас, но е устойчив идентификатор на тази инсталация, затова не го считаме за анонимен.',
            '<strong>Токен за известия</strong> (от Apple или Google), платформата (iOS или Android) и средата, в която работи приложението.',
            '<strong>Пътувания с включени известия</strong> – номер на влак, гари, планирани часове и идентификатора на инсталацията.',
            '<strong>Токен на Live Activity</strong> (само iOS) – влак, гари и часове, без идентификатора на инсталацията.',
            '<strong>Дневник на изпратените известия</strong> – идентификатор, час и резултат от изпращането.',
          ],
        },
        { p: 'Сървърът <strong>не получава</strong> Вашето местоположение, име, имейл адрес или телефонен номер. Данните за влаковете (позиции и закъснения) идват от публичния канал на Министерството на транспорта и съобщенията, не от потребителите.' },
      ],
    },
    {
      title: 'Местоположение и Умна аларма',
      blocks: [
        { p: 'Функцията „Умна аларма“ използва местоположението на устройството Ви (включително във фонов режим, ако го разрешите), за да Ви извести, преди да пристигнете на Вашата гара. Местоположението се обработва <strong>изцяло на Вашето устройство</strong> и не се изпраща към наши сървъри или към трети страни. Алармата работи и без интернет връзка.' },
        { p: 'Можете да разрешите или забраните достъпа до местоположението и до известията по всяко време от настройките на устройството си.' },
      ],
    },
    {
      title: 'За какво използваме данните и на какво основание',
      blocks: [
        {
          ul: [
            'Изпращане на известия за закъснение и Live Activity за пътуванията, които сте избрали. Основание: <strong>изпълнение на услугата</strong>, която сте поискали, и <strong>Вашето съгласие</strong> за известията (разрешението, което давате в устройството си).',
            'Сигурност на услугата и защита от злоупотреби, включително ограничаване на честотата на заявките. Основание: <strong>наш легитимен интерес</strong> услугата да работи надеждно и безопасно.',
          ],
        },
        { p: 'Не използваме данните за реклама, профилиране или продажба.' },
      ],
    },
    {
      title: 'Колко дълго пазим данните',
      blocks: [
        {
          table: {
            head: ['Данни', 'Колко дълго'],
            rows: [
              ['Идентификатор на инсталацията, токен за известия, платформа и среда', 'Изтриват се веднага, щом Apple или Google съобщят, че приложението е премахнато; автоматично след 180 дни без нито едно обаждане от приложението до сървъра (никога, докато има пътуване в ход); или при Ваша заявка.'],
              ['Пътувания с включени известия', '7 дни след края на пътуването. Край е ръчното спиране, потвърденото пристигане или, автоматично, до 45 минути след планираното пристигане.'],
              ['Дневник на изпратените известия', '48 часа.'],
              ['Токен на Live Activity', 'До 2 часа след планираното пристигане (на практика до около 3 часа).'],
              ['Резервни копия на базата данни', '30 дни на сървъра и 180 дни в отделно хранилище. Съдържат същите данни като базата.'],
              ['Журнали на приложението (сървъра)', 'До около 14 дни. Идентификаторът се записва само с първите 8 знака.'],
              ['Журнали на уеб сървъра', 'До около 14 дни: IP адрес, час и адрес на заявката. Идентификаторът на инсталацията не е в тях.'],
              ['Журнали на Cloudflare', `Cloudflare поддържа собствени журнали, чийто срок не контролираме. Вижте политиката на ${CF}.`],
            ],
          },
        },
        { p: '<strong>Резервните копия.</strong> Изтриването по заявка не изтрива копията веднага: те изтичат сами в срока си (30 дни на сървъра, 180 дни в отделното хранилище), след което данните изчезват окончателно.' },
      ],
    },
    {
      title: 'IP адреси',
      blocks: [{ p: 'Заявките към нашия сървър минават през Cloudflare (прокси). Cloudflare и уеб сървърът обработват IP адреса Ви, за да върнат отговор и да защитят услугата. Ограничението на честотата на заявките държи IP адреса само в паметта, за по-малко от минута. Не свързваме IP адресите с идентификатора на инсталацията.' }],
    },
    {
      title: 'Кой получава данни',
      blocks: [
        {
          ul: [
            '<strong>Apple</strong> (APNs) – токен за известия и съдържание на известията.',
            '<strong>Google</strong> (FCM) – токен за известия и съдържание на известията.',
            '<strong>Cloudflare</strong> – прокси на заявките, включително IP адреси.',
            '<strong>Hetzner</strong> – хостинг на сървъра.',
            '<strong>Backblaze</strong> – хранилище за резервните копия на базата данни.',
          ],
        },
        { p: 'Не продаваме данни и не ги предоставяме на рекламодатели или маркетингови агенции. Тези доставчици ги обработват само за да работи услугата.' },
      ],
    },
    {
      title: 'Сигурност',
      blocks: [{ p: 'Връзката между приложението и нашия сървър е по HTTPS (TLS 1.3); остарелите версии TLS 1.0 и 1.1 се отказват. Известията към Apple и Google също се изпращат по HTTPS. Тези мерки защитават данните при предаване. Не твърдим, че данните са анонимни: идентификаторът е устойчив идентификатор на инсталацията.' }],
    },
    {
      title: 'Уебсайтът: бисквитки и локално съхранение',
      blocks: [{ p: 'Този уебсайт <strong>не използва бисквитки</strong> и не съдържа инструменти за проследяване, анализ или реклама. Когато смените езика или темата (светла или тъмна), сайтът записва този избор в локалната памет на Вашия браузър (localStorage, ключове „bultrain-lang“ и „bultrain-theme“), за да го запомни при следващо посещение. Тази информация остава във Вашето устройство, не се изпраща към нас и не Ви идентифицира. Можете да я изтриете по всяко време от настройките на браузъра. Затова не показваме банер за съгласие.' }],
    },
    {
      title: 'Вашите права и как да изтриете данните си',
      blocks: [
        { p: `Имате право на достъп, коригиране, изтриване, ограничаване на обработването, преносимост и възражение. За да упражните правата си, пишете на ${MAIL}.` },
        { h: 'Как да поискате изтриване' },
        {
          ul: [
            '<strong>Деинсталирайте приложението.</strong> Данните за инсталацията се изтриват веднага, щом Apple или Google съобщят, че приложението е премахнато, или най-късно след 180 дни без активност.',
            `<strong>Пишете ни</strong> на ${MAIL} и посочете, че искате изтриване на данните си.`,
          ],
        },
        { p: 'Тъй като не пазим имена или имейл адреси, не винаги можем да свържем Вашето искане с конкретна инсталация. Ще направим всичко възможно да Ви помогнем и ще Ви отговорим в срок до един месец. Резервните копия се изтриват по сроковете в таблицата по-горе.' },
        { p: `Имате право и да подадете жалба до Комисията за защита на личните данни (${CPDP}).` },
      ],
    },
    {
      title: 'Деца',
      blocks: [{ p: `BulTrain не е насочено към деца и не събираме съзнателно данни от деца под 14 години. Ако смятате, че дете ни е предоставило данни, пишете ни на ${MAIL} и ще ги изтрием.` }],
    },
    {
      title: 'Връзки към други сайтове',
      blocks: [{ p: 'Сайтът съдържа връзки към App Store, Google Play, медии и социални мрежи. Те имат собствени политики за поверителност, за които не отговаряме.' }],
    },
    {
      title: 'Промени в тази политика',
      blocks: [{ p: 'Можем да обновяваме тази политика. Датата на последната актуализация е в началото на страницата. При съществени промени ще Ви уведомим чрез тази страница.' }],
    },
    {
      title: 'Контакт',
      blocks: [{ p: `За въпроси, искания и притеснения относно поверителността: ${MAIL}.` }],
    },
  ],
}

export const privacyEn = {
  heading: 'Privacy Policy',
  lastUpdated: 'Last updated',
  intro: 'This policy explains what data we process when you use the BulTrain app and the bultrain.eu website, why we process it, how long we keep it and how you can control it. It is written in plain language and describes only what we actually do.',
  summaryTitle: 'In short',
  summary: [
    'There are no accounts. We do not ask for or receive names, email addresses or phone numbers.',
    '<strong>Your location never leaves your phone.</strong> The Smart Alarm uses it only on your device.',
    'For delay notifications and Live Activities, our server keeps a random installation ID, a notification token and the trips you turned notifications on for (train, stations, times).',
    'This data is deleted automatically: when the app is removed, after 180 days of inactivity, and trips 7 days after they end.',
    'The website uses no cookies, analytics or advertising.',
  ],
  sections: [
    {
      title: 'Who is responsible for the data',
      blocks: [{ p: `The controller is Tihomir Garmenliev (an individual), creator of BulTrain. For any question about data: ${MAIL}.` }],
    },
    {
      title: 'What data we process',
      blocks: [
        { p: 'BulTrain does not require an account. When you turn on notifications for a trip, the app and our server process the following:' },
        {
          ul: [
            '<strong>Installation ID</strong> – a random number generated by the app. It is not an account and holds no information about you, but it is a persistent identifier of this installation, so we do not consider it anonymous.',
            '<strong>Notification token</strong> (from Apple or Google), the platform (iOS or Android) and the environment the app is running in.',
            '<strong>Trips with notifications on</strong> – train number, stations, planned times and the installation ID.',
            '<strong>Live Activity token</strong> (iOS only) – train, stations and times, without the installation ID.',
            '<strong>Log of notifications sent</strong> – the identifier, the time and the result of sending.',
          ],
        },
        { p: 'The server does <strong>not receive</strong> your location, name, email address or phone number. Train data (positions and delays) comes from the Ministry of Transport and Communications’ public feed, not from users.' },
      ],
    },
    {
      title: 'Location and the Smart Alarm',
      blocks: [
        { p: 'The “Smart Alarm” feature uses your device’s location (including in the background, if you allow it) to alert you before you arrive at your station. Your location is processed <strong>entirely on your device</strong> and is never sent to our servers or to third parties. The alarm works even without an internet connection.' },
        { p: 'You can allow or deny access to location and notifications at any time in your device settings.' },
      ],
    },
    {
      title: 'What we use the data for, and on what basis',
      blocks: [
        {
          ul: [
            'Sending delay notifications and Live Activities for the trips you chose. Basis: <strong>providing the service</strong> you asked for, and <strong>your consent</strong> to notifications (the permission you give in your device).',
            'Keeping the service secure and protecting it from abuse, including rate limiting of requests. Basis: <strong>our legitimate interest</strong> in keeping the service reliable and safe.',
          ],
        },
        { p: 'We do not use data for advertising, profiling or sale.' },
      ],
    },
    {
      title: 'How long we keep data',
      blocks: [
        {
          table: {
            head: ['Data', 'How long'],
            rows: [
              ['Installation ID, notification token, platform and environment', 'Deleted immediately when Apple or Google report that the app has been removed; automatically after 180 days with no call from the app to the server (never while a trip is in progress); or on your request.'],
              ['Trips with notifications on', '7 days after the trip ends. The end is a manual stop, a confirmed arrival or, automatically, up to 45 minutes after the planned arrival.'],
              ['Log of notifications sent', '48 hours.'],
              ['Live Activity token', 'Up to 2 hours after the planned arrival (in practice up to about 3 hours).'],
              ['Database backups', '30 days on the server and 180 days in separate storage. They contain the same data as the database.'],
              ['Application (server) logs', 'Up to about 14 days. The identifier is recorded only as its first 8 characters.'],
              ['Web server logs', 'Up to about 14 days: IP address, time and the address requested. The installation ID is not in them.'],
              ['Cloudflare logs', `Cloudflare keeps its own logs, whose retention we do not control. See the ${CF} privacy policy.`],
            ],
          },
        },
        { p: '<strong>Backups.</strong> Deleting data on request does not delete the backups straight away: they expire on their own within their retention period (30 days on the server, 180 days in separate storage), after which the data is gone for good.' },
      ],
    },
    {
      title: 'IP addresses',
      blocks: [{ p: 'Requests to our server pass through Cloudflare (a proxy). Cloudflare and the web server process your IP address to return a response and to protect the service. The rate limiter keeps the IP address in memory only, for less than a minute. We do not link IP addresses to the installation ID.' }],
    },
    {
      title: 'Who receives data',
      blocks: [
        {
          ul: [
            '<strong>Apple</strong> (APNs) – notification token and notification content.',
            '<strong>Google</strong> (FCM) – notification token and notification content.',
            '<strong>Cloudflare</strong> – proxy for requests, including IP addresses.',
            '<strong>Hetzner</strong> – hosting of the server.',
            '<strong>Backblaze</strong> – storage for database backups.',
          ],
        },
        { p: 'We do not sell data or share it with advertisers or marketing agencies. These providers process it only to make the service work.' },
      ],
    },
    {
      title: 'Security',
      blocks: [{ p: 'The connection between the app and our server uses HTTPS (TLS 1.3); outdated TLS 1.0 and 1.1 are refused. Notifications to Apple and Google are also sent over HTTPS. These measures protect data in transit. We do not claim the data is anonymous: the identifier is a persistent installation identifier.' }],
    },
    {
      title: 'The website: cookies and local storage',
      blocks: [{ p: 'This website <strong>does not use cookies</strong> and contains no tracking, analytics or advertising tools. When you change the language or the theme (light or dark), the site saves that choice in your browser’s local storage (localStorage, keys “bultrain-lang” and “bultrain-theme”) so it can remember it on your next visit. That information stays on your device, is not sent to us and does not identify you. You can delete it at any time from your browser settings. For this reason we do not show a consent banner.' }],
    },
    {
      title: 'Your rights and how to delete your data',
      blocks: [
        { p: `You have the right of access, rectification, erasure, restriction of processing, portability and objection. To exercise your rights, write to ${MAIL}.` },
        { h: 'How to request deletion' },
        {
          ul: [
            '<strong>Uninstall the app.</strong> The installation’s data is deleted immediately when Apple or Google report that the app has been removed, or after 180 days of inactivity at the latest.',
            `<strong>Write to us</strong> at ${MAIL} and say that you want your data deleted.`,
          ],
        },
        { p: 'Because we do not keep names or email addresses, we cannot always link your request to a specific installation. We will do our best to help and will reply within one month. Backups are deleted on the schedule in the table above.' },
        { p: `You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (${CPDP}).` },
      ],
    },
    {
      title: 'Children',
      blocks: [{ p: `BulTrain is not aimed at children and we do not knowingly collect data from children under 14. If you believe a child has given us data, write to ${MAIL} and we will delete it.` }],
    },
    {
      title: 'Links to other sites',
      blocks: [{ p: 'The site contains links to the App Store, Google Play, news outlets and social networks. They have their own privacy policies, for which we are not responsible.' }],
    },
    {
      title: 'Changes to this policy',
      blocks: [{ p: 'We may update this policy. The date of the last update is at the top of the page. If a change is significant, we will let you know on this page.' }],
    },
    {
      title: 'Contact',
      blocks: [{ p: `For questions, requests and concerns about privacy: ${MAIL}.` }],
    },
  ],
}
