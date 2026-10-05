// ============================================================================
// BulTrain: centralized translation dictionary
// Two locales: 'bg' (Bulgarian, original) and 'en' (English).
// Access via the useLanguage() hook: const { t } = useLanguage(), then read t.section.key.
// Keep the two trees structurally identical. Unused keys were pruned by measuring what the
// site actually reads (every route, both languages, every data state).
// ============================================================================

export const translations = {
  bg: {
    nav: {
      media: 'Отзвук',
      about: 'Зад проекта',
      support: 'Подкрепа',
      cta: 'Свали безплатно',
      menu: 'Меню',
      skip: 'Към съдържанието',
      live: 'На живо',
      tour: 'Приложението',
      alarm: 'Аларма',
      theme: 'Смени темата',
      language: 'Език',
    },
    common: { backHome: 'Назад към началната страница', readMore: 'Прочети повече' },
    hero: {
      headlineLine1: 'Пътувай умно.',
      headlineLine2: 'И не изпускай',
      headlineAccent: 'гарата си.',
      subheading: 'Разписания и табла на БДЖ в реално време. Умни аларми по локация, които те известяват преди твоята спирка — създадено специално за теб.',
      facts: [
        { value: '702', label: 'гари' },
        { value: '550', label: 'влака' },
        { value: '4,8★', label: 'в Google Play' },
      ],
      photoCredit: 'Снимка: Тихомир Гърменлиев',
      photoAlt: 'Червен локомотив на гара',
    },
    tour: {
      title: 'Едно пътуване, от търсенето до заключения екран.',
      lead: 'Така изглежда пътуване с BulTrain, стъпка по стъпка и направено с грижа за твоето преживяване.',
      steps: [
        {
          title: 'Търсиш и виждаш закъснението веднага',
          text: 'Избираш откъде и докъде. И веднага виждаш дали влакът закъснява.',
          alt: 'Резултати от търсене със закъснения',
        },
        {
          title: 'Табло на всяка гара',
          text: 'Заминаващи и пристигащи влакове на всяка една от 702 гари в България.',
          alt: 'Табло на гара',
        },
        {
          title: 'Следиш конкретния влак',
          text: 'Виждаш на коя спирка е влакът и колко закъснява. Всичко е на един екран.',
          alt: 'Маршрут на влак със спирки и закъснения',
        },
        {
          title: 'Влакът ти, на заключения екран',
          text: 'Закъснение, лента с прогреса и време до пристигане, без да отключваш телефона и без да отваряш приложението. Получаваш известие, когато закъснението се промени и точно преди да пристигнеш.',
          tag: 'Live Activity',
          alt: 'Заключен екран с Live Activity на BulTrain',
        },
      ],
      ios: 'iOS',
      iosStatus: 'Налично сега',
      androidSoon: 'Скоро налично и за Android',
      cta: 'Свали за iOS',
    },
    alarm: {
      tag: 'Умна аларма и следене на пътуването',
      title: 'Запази пътуването. BulTrain ще го следи вместо теб.',
      lead: 'След като запазиш пътуването си, приложението следи влака и те известява, преди да стигнеш твоята гара. Не е нужно да броиш спирките или да гледаш през прозореца.',
      points: [
        {
          title: 'Алармата те известява преди гарата',
          text: 'Умната аларма следи къде си по GPS и изпраща известие, преди да стигнеш гарата си. Работи и без интернет, а местоположението ти не напуска телефона.',
        },
        {
          title: 'Виждаш пътуването на живо',
          text: 'На коя спирка е влакът, коя е следващата и колко закъснява. Всички спирки с планиран и реален час са на един екран.',
        },
        {
          title: 'Запазеното пътуване е винаги с теб',
          text: 'Натискаш „Запази пътуване“ и разписанието му остава в телефона. Можеш да го отвориш и без връзка.',
        },
      ],
      note: 'Алармата ползва GPS на телефона, затова може да изразходва повече батерия.',
      altTrip: 'Детайли за маршрута с бутон „Запази пътуване“',
      altRoute: 'Маршрут на влак със спирки и закъснения',
      altAlarm: 'Умна аларма за пристигане',
    },
    promises: {
      statement: 'Данните са официални.',
      sub: 'Закъсненията идват от официалния публичен поток на Министерството на транспорта и съобщенията. Ако той не е наличен, виждаш ясно обозначен час по разписание.',
      items: [
        {
          title: 'Алармата работи без интернет',
          text: 'Алармата за пристигане работи изцяло с GPS и без мобилно покритие. Работи и когато няма връзка.',
        },
        {
          title: 'Без профил, без следене',
          text: 'Местоположението ти не напуска телефона. Не искаме профил и не събираме лични данни.',
        },
      ],
    },
    notFound: {
      title: 'Страницата не е намерена.',
      text: 'Адресът може да е грешен или страницата да е преместена.',
    },
    meta: {
      title: 'BulTrain: влаковете в България на живо',
      description: 'BulTrain показва закъснения и позиции на влаковете в България в реално време от официалните данни. Табла на гари, разписание и аларма за пристигане. За iOS и Android.',
      design: 'Дизайн система',
    },

    press: {
      title: 'За BulTrain в медиите и оценката за него.',
      storesLabel: 'Оценките',
      dublinCaption: 'На европейското състезание за млади иноватори в Дъблин.',
      dublinAlt: 'Тихомир Гърменлиев до щанда на BulTrain на състезанието в Дъблин',
      ratingCount: '{n} оценки',
      outOf: 'от 5',
      translated: 'Преведено от български',
      reviews: [
        {
          text: 'Браво! Най-сетне работещо приложение без реклами. Похвално е, че може да се вижда разписанието и на спирките, а не само на гарите. Изненада ме, че се вижда времето за изчакване на връзка, когато има прекачване. Вижда се и причината за закъснението на влака! Още веднъж БРАВО! БЛАГОДАРЯ, че помислихте за нас, пътниците.',
          name: 'Пламен Г.',
          store: 'Google Play',
          date: '2024-04-16',
          lang: 'bg',
        },
        {
          text: 'Приложението е супер. Просто пример как ТРЯБВА да се правят нещата и приложенията.',
          name: 'Даниел К.',
          store: 'Google Play',
          date: '2026-06-30',
          lang: 'bg',
        },
        {
          text: 'Exceptional design and usability! Traveling by train in Bulgaria has never been easier - this app makes everything smooth and convenient.',
          name: 'dellinex',
          store: 'App Store',
          date: '2026-04-12',
          lang: 'en',
        },
      ],
    },
    maker: {
      name: 'Тихомир Гърменлиев',
      role: 'Създател на BulTrain. Студент в Технически университет София.',
      intro: 'BulTrain започна като ученически проект в ТУЕС. Днес е приложение за iOS и Android, което показва закъснения и позиции на влаковете от официалните данни на жп мрежата. За гарите направих и собствен e-ink дисплей.',
      quote: 'Целта ми винаги е била да реша свой или чужд проблем с помощта на технологиите.',
      quoteBy: 'Тихомир Гърменлиев, за Economy.bg',
      awardsTitle: 'Отличия',
      educationTitle: 'Образование',
      johnAtanasov: {
        label: 'Грамота „Джон Атанасов“ – Проект с висок обществен принос',
        detail: 'За проекта BulTrain. Връчена от Президента на Република България Илияна Йотова.',
      },
      dublin: {
        label: 'Финал на европейско състезание за млади иноватори, Дъблин',
        detail: 'С BulTrain',
      },
      presidentCaption: 'Грамота „Джон Атанасов“ – Проект с висок обществен принос, точно за проекта BulTrain, връчена от Президента на Република България Илияна Йотова. Снимка: Президентство на Република България.',
      presidentAlt: 'Тихомир Гърменлиев с Президента на Република България Илияна Йотова при връчването на грамотата му, пред държавния герб',
      portraitAlt: 'Тихомир Гърменлиев на перон, пред влак',
    },
    network: {
      title: 'Влаковете в България, в този момент.',
      lead: '{running} влака в движение, за {withRealtime} има данни на живо.',
      leadNone: '{running} влака в движение, по разписание.',
      justNow: 'току-що',
      minAgo: 'преди {n} мин',
      updated: 'Обновено {age}',
      stale: 'Данните са стари: преди {n} мин.',
      offline: 'Връзката е прекъсната. Показани са последните получени данни, от {age}.',
      starting: 'Данните се зареждат.',
      rateLimited: 'Твърде много заявки. Опитваме отново след малко.',
      unavailable: 'Данните не са достъпни в момента.',
      noRealtime: 'Няма данни на живо',
      noRealtimeNote: 'Източникът в момента не дава актуални данни.',
      onTime: 'навреме',
      onTimeNote: 'С под 5 мин закъснение, само влаковете с данни на живо ({n} от {total}).',
      avg: 'средно закъснение',
      avgNote: 'Само влаковете с данни на живо.',
      unit: 'мин',
      max: 'най-голямо закъснение',
      noDelayed: 'Няма закъсняващ влак',
      noDelayedNote: 'Всички влакове с данни на живо са в рамките на нормата.',
      board: {
        title: 'Табло на гара',
        departures: 'ЗАМИНАВАЩИ',
        time: 'ВРЕМЕ',
        to: 'КЪМ',
        updated: 'Обновено',
        unavailable: 'Таблото не е достъпно',
        unavailableNote: 'Няма данни от повече от 15 минути.',
        empty: 'Няма влакове в този списък.',
        note: 'Таблото показва заминаващите влакове от избраната гара. Закъснение се показва, когато има данни на живо.',
      },
      device: {
        caption: 'Направих такова e-ink табло за гара.',
        alt: 'E-ink табло с пристигащи влакове в София, със закъснения и „On time“',
      },
      radar: {
        title: 'Всеки влак е точка',
        description: 'Тази карта показва местоположението на всички влакове в реално време.',
        onMap: '{shown} от {total} влака са на картата, за {missing} няма позиция.',
        allOnMap: 'Всички {total} влака са на картата.',
        legendOk: 'под 5 мин закъснение',
        legendLate: 'закъснява 5 мин или повече',
        legendUnknown: 'няма данни за закъснение',
        map: 'Карта на влаковете в България',
        list: 'Списък на влаковете',
        delay: 'закъснение',
        unknownDelay: 'неизвестно',
        none: 'В момента няма влакове с позиция.',
        route: 'Маршрут',
        progress: 'изминато',
      },
      line: {
        live: 'На живо',
        sample: 'По разписание',
        running: '{n} влака в движение',
        onTime: '{p}% навреме',
        noRealtime: 'няма данни на живо',
        unavailable: 'Данните не са достъпни',
        more: 'Виж на живо',
      },
    },
    media: {
      articles: {
        'article-6': {
          title: 'Целта ми винаги е била да реша свой или чужд проблем с помощта на технологиите',
          snippet: 'След успеха на BulTrain и финала на европейското състезание за млади иноватори в Дъблин студентът от Техническия университет в София Тихомир Гърменлиев разказва как превръща ежедневните проблеми в технологични решения',
          source: 'Economy.bg',
        },
        'article-5': {
          title: 'Тихомир Гърменлиев и BulTrain - за по-информиран железопътен транспорт',
          snippet: '20-годишният Тихомир Гърменлиев е амбициозен програмист. До момента има две разработени платформи зад гърба си - онлайн пътеводителя BullTrain - приложение, посветено на влаковете, което си поставя за цел по-качествено информиране на пътуващия...',
          source: 'Българско национално радио',
        },
        'article-4': {
          title: 'Програмистът Тихомир Гърменлиев, който иска да решава проблеми на градската среда',
          snippet: 'Едва на 20 години, Тихомир вече има две платформи зад гърба си - с едната улеснява пътуването с влак из България, а с другата картографира опасните пешеходни участъци в столицата',
          source: 'Капитал',
        },
        'article-3': {
          title: '"Как се пътува умно с БДЖ": Тихомир Гърменлиев в подкаста "Дума на седмицата"',
          snippet: 'В специалната рубрика на подкаста "Дума на седмицата" с Ива Дойчинова, гостува 20-годишният Тихомир Гърменлиев, създател на BulTrain, мобилно приложение, което улеснява значително пътуването с влак из България',
          source: 'Дневник',
        },
        'article-2': {
          title: 'Мобилно приложение предлага всичко за пътуването с влак у нас на едно място',
          snippet: '„Пътуването с влак може да бъде наистина много приятно и много красиво“, казва Тихомир Гърменлиев, дванадесетокласник в ТУЕС и създател на приложението BulTrain',
          source: 'Economy.bg',
        },
        'article-1': {
          title: 'Ученик създава приложение, следящо маршрути и разписания на българските влакове',
          snippet: 'Тихомир Гърменлиев, създател на приложението BulTrain, в "Бизнес старт" 14.06.2024 г.',
          source: 'Bloomberg TV',
        },
      },
    },
    screenshots: {
      labels: { station: 'Табло на живо' },
    },
    about: {
      achievements: {
        tues: {
          label: 'Завършил ТУЕС',
          detail: 'Технологично училище "Електронни системи"',
        },
        tu: {
          label: 'Студент в Технически университет - София',
          detail: 'Специалност: Информатика и софтуерни науки, Факултет по приложна математика и информатика',
        },
        hacktues: {
          label: 'Победител в HackTUES 10',
          detail: 'Най-големият ученически хакатон в България',
        },
        teenovator: {
          label: 'Доброволец на Тийноватор',
          detail: 'Инициатива, която дава първи стъпки в предприемачеството на ученици',
        },
        '20under20': {
          label: '"20 под 20" випуск 2025',
          detail: 'Съвместна инициатива на "Капитал" и Младежкия съвет към американския посланик',
        },
        bait: {
          label: 'Номинация за наградите на БАИТ',
          detail: 'За BulTrain в категория "Младежки награди"',
        },
        softuniada: {
          label: 'Първо място в Софтуниада 2024',
          detail: 'Категория Софтуерни проекти (старша възраст) с BulTrain',
        },
      },
    },
    support: {
      headingLine1: 'BulTrain е безплатен.',
      headingAccent: 'Твоята подкрепа го поддържа.',
      subheading: 'Това е проект, създаден със страст, не с цел печалба. Ако BulTrain те е спасил от изпуснат влак или спирка, или е направил пътуването ти по-приятно, можеш да подкрепиш развитието му. Благодаря!',
      coffee: 'Почерпи ме кафе',
      revolut: 'Подкрепи чрез Revolut',
      contactLabel: 'Свържи се с мен',
    },
    footer: {
      privacy: 'Политика за поверителност',
      privacyApp: 'Политика за поверителност на приложението',
      terms: 'Условия за ползване',
      contact: 'Контакти',
      madeBy: 'Направено от Тихомир Гърменлиев.',
      disclaimer: 'BulTrain е независим проект и не е свързан с, нито е официално одобрен от БДЖ (Български държавни железници).',
    },
    contact: {
      heading: 'Свържете се с нас',
      subheading: 'Имаш въпрос или предложение? Избери най-удобния за теб начин за връзка с мен.',
      methods: {
        email: {
          label: 'Имейл',
          description: 'За въпроси, предложения и техническа поддръжка.',
        },
        linkedin: { label: 'LinkedIn', description: 'Прочети историите зад проекта.' },
      },
      ctaTitle: 'Ще се радвам да чуя мнението ти.',
      ctaText: 'Всяка обратна връзка е ценна и помага за подобряване на BulTrain.',
    },
    privacy: {
      heading: 'Политика за поверителност',
      lastUpdated: 'Последна актуализация',
      intro: 'Добре дошли в политиката за поверителност на BulTrain! Ние уважаваме Вашата поверителност и се ангажираме да защитаваме Вашите данни. Моля, прочетете тази Политика, за да разберете как събираме, използваме и защитаваме всяка информация, когато използвате нашето приложение и уебсайт.',
      sections: [
        {
          title: '1. Кой отговаря за данните',
          body: 'Администратор е Тихомир Гърменлиев (физическо лице), създател на BulTrain. За всякакви въпроси относно данните: <a href="mailto:bultrain.app@gmail.com">bultrain.app@gmail.com</a>.',
        },
        {
          title: '2. Събиране на данни',
          body: 'BulTrain е разработено с мисъл за сигурността. Ние <strong>НЕ</strong> изискваме създаване на профил и <strong>НЕ</strong> събираме лични данни, които могат да Ви идентифицират директно (като имена, имейл адреси или телефонни номера). Всички данни в приложението се обработват локално на Вашето устройство.',
        },
        {
          title: '3. Данни за местоположение',
          body: 'Функцията "Умна аларма" използва данните за Вашето текущо местоположение, за да Ви извести преди наближаване на Вашата гара. Тези данни се използват изцяло и само на Вашето устройство и <strong>не се изпращат към наши сървъри</strong> или към трети страни.',
        },
        {
          title: '4. Уебсайтът: бисквитки и локално съхранение',
          body: 'Този уебсайт <strong>не използва бисквитки</strong> и не съдържа инструменти за проследяване, анализ или реклама. Когато смените езика или темата (светла или тъмна), сайтът записва този избор в локалната памет на Вашия браузър (localStorage, ключове „bultrain-lang“ и „bultrain-theme“), за да го запомни при следващо посещение. Тази информация остава във Вашето устройство, не се изпраща към нас и не Ви идентифицира. Можете да я изтриете по всяко време от настройките на браузъра. Затова не показваме банер за съгласие.',
        },
        {
          title: '5. Данни, обработвани при посещение',
          body: 'Секцията „На живо“ зарежда публични данни за влаковете от нашия сървър (api.bultrain.eu), който се предоставя чрез Cloudflare. Както при всяка интернет връзка, Вашият IP адрес и техническите данни на заявката се обработват от тези услуги и от хостинг доставчика на сайта, за да получите страницата и за сигурността ѝ. Ние не ги използваме за проследяване, профилиране или реклама.',
        },
        {
          title: '6. Споделяне на информация',
          body: 'Ние не продаваме и не предоставяме данни на рекламодатели или маркетингови агенции. Единствените получатели на технически данни са доставчиците, посочени по-горе, които ги обработват само за да работи услугата.',
        },
        {
          title: '7. Връзки към други сайтове',
          body: 'Сайтът съдържа връзки към App Store, Google Play, медии и социални мрежи. Те имат собствени политики за поверителност, за които не отговаряме.',
        },
        {
          title: '8. Вашите права',
          body: 'Имате право на достъп, коригиране, изтриване, ограничаване на обработването, преносимост и възражение. Можете да упражните правата си на имейла по-горе. Имате право и да подадете жалба до Комисията за защита на личните данни (<a href="https://cpdp.bg" target="_blank" rel="noopener noreferrer">cpdp.bg</a>).',
        },
        {
          title: '9. Промени в тази Политика',
          body: 'Можем периодично да обновяваме тази Политика за поверителност. Датата на последната актуализация е в началото на страницата. Вашето продължително използване на приложението ще се счита за Ваше съгласие с промените.',
        },
        {
          title: '10. Свържете се с нас',
          body: 'Ако имате въпроси или притеснения относно нашата Политика за поверителност, моля, свържете се с нас на:',
        },
      ],
    },
    terms: {
      heading: 'Условия за ползване',
      intro: 'С използването на приложението и уебсайта на BulTrain Вие се съгласявате да спазвате настоящите Условия за ползване. Ако не сте съгласни с тези условия, моля, преустановете употребата на услугата.',
      sections: [
        {
          title: '1. Описание на услугата',
          body: 'BulTrain предоставя информация в реално време за разписанията и движението на влаковете в България, както и инструменти като "Умна аларма" за улеснение на Вашето пътуване.',
        },
        {
          title: '2. Отказ от отговорност (Disclaimer)',
          body: 'BulTrain е <strong>независим проект</strong> и по никакъв начин не е свързан, спонсориран или официално одобрен от БДЖ и ДП "НКЖИ". Всички данни се предоставят "във вида, в който са" (as is). Въпреки усилията ни за точност, не носим отговорност за евентуални закъснения, пропуснати връзки или грешки в таблата и разписанията.',
        },
        {
          title: '3. Разрешено ползване',
          body: 'Вие се съгласявате да използвате приложението само за законни и лични нужди. Забранено е да използвате системи за автоматизирано извличане на информация (scraping), да опитвате да нарушите сигурността на приложението или да претоварвате инфраструктурата му.',
        },
        {
          title: '4. Технически изисквания и локализация',
          body: 'Някои от функциите на приложението, като Умната аларма, налагат използването на GPS на Вашето устройство и може да доведат до по-висока консумация на батерия. Използването им е изцяло Ваша отговорност.',
        },
        {
          title: '5. Права над интелектуалната собственост',
          body: 'Графичните елементи, логата, дизайнът и сорс кодът, създадени за целите на BulTrain, са собственост на разработчика (Тихомир Гърменлиев). Копирането или разпространението им за комерсиални цели без писмено разрешение е строго забранено.',
        },
        {
          title: '6. Доброволна подкрепа',
          body: 'Бутоните „Почерпи ме кафе“ и „Revolut“ водят към външни услуги за доброволни дарения. Подкрепата не е покупка на услуга и не дава допълнителни права. BulTrain остава безплатен.',
        },
      ],
    },
  },
  en: {
    nav: {
      media: 'Coverage',
      about: 'The Story',
      support: 'Support',
      cta: 'Download free',
      menu: 'Menu',
      skip: 'Skip to content',
      live: 'Live',
      tour: 'The app',
      alarm: 'Alarm',
      theme: 'Switch theme',
      language: 'Language',
    },
    common: { backHome: 'Back to home', readMore: 'Read more' },
    hero: {
      headlineLine1: 'Travel smarter.',
      headlineLine2: 'Never miss',
      headlineAccent: 'your stop again.',
      subheading: 'Live BDZ timetables and departure boards in real time. Location-aware smart alarms that wake you before your stop — built around the way you actually travel.',
      facts: [
        { value: '702', label: 'stations' },
        { value: '550', label: 'trains' },
        { value: '4.8★', label: 'on Google Play' },
      ],
      photoCredit: 'Photo: Tihomir Garmenliev',
      photoAlt: 'A red locomotive at a station',
    },
    tour: {
      title: 'One journey, from search to lock screen.',
      lead: 'Here is what a trip with BulTrain looks like, step by step, designed with your experience in mind.',
      steps: [
        {
          title: 'Search and see the delay right away',
          text: 'Pick where from and where to, and see right away whether the train is running late.',
          alt: 'Search results showing delays',
        },
        {
          title: 'A board for every station',
          text: 'Departures and arrivals at every one of the 702 stations in Bulgaria.',
          alt: 'Station board',
        },
        {
          title: 'Follow one specific train',
          text: 'See which stop the train is at and how late it is. All on one screen.',
          alt: 'Train route with stops and delays',
        },
        {
          title: 'Your train, on your lock screen',
          text: 'The delay, a progress bar and the time to arrival, without unlocking your phone or opening the app. You get a notification when the delay changes and just before you arrive.',
          tag: 'Live Activity',
          alt: 'BulTrain Live Activity on the lock screen',
        },
      ],
      ios: 'iOS',
      iosStatus: 'Available now',
      androidSoon: 'Coming soon to Android',
      cta: 'Download for iOS',
    },
    alarm: {
      tag: 'Smart alarm and trip tracking',
      title: 'Save your trip. Let BulTrain keep an eye on it.',
      lead: 'Once you save a trip, the app follows the train and alerts you before you reach your station. No counting stops, no staring out of the window.',
      points: [
        {
          title: 'The alarm tells you before your station',
          text: 'The smart alarm follows your position by GPS and sends a notification before you get to your station. It works without an internet connection, and your location never leaves your phone.',
        },
        {
          title: 'Follow the journey live',
          text: 'Which stop the train is at, which one is next and how late it is. Every stop, with planned and actual times, on one screen.',
        },
        {
          title: 'Your saved trip is always with you',
          text: 'Tap “Save Journey” and its timetable stays on your phone. You can open it even with no connection.',
        },
      ],
      note: 'The alarm uses your phone’s GPS, so it can use more battery.',
      altTrip: 'Route details with the “Save Journey” button',
      altRoute: 'Train route with stops and delays',
      altAlarm: 'Smart arrival alarm',
    },
    promises: {
      statement: 'The data is official.',
      sub: 'Delays come from the official public feed of the Ministry of Transport and Communications. If it is unavailable, you see a clearly labelled scheduled time.',
      items: [
        {
          title: 'The alarm works offline',
          text: 'The arrival alarm runs entirely on GPS and needs no mobile coverage. It works even with no connection.',
        },
        {
          title: 'No account, no tracking',
          text: 'Your location never leaves your phone. We do not ask for an account and we do not collect personal data.',
        },
      ],
    },
    notFound: {
      title: 'Page not found.',
      text: 'The address may be wrong, or the page may have moved.',
    },
    meta: {
      title: 'BulTrain: every train in Bulgaria, live',
      description: 'BulTrain shows delays and positions of trains in Bulgaria in real time, from the official data. Station boards, timetables and an arrival alarm. For iOS and Android.',
      design: 'Design system',
    },

    press: {
      title: 'BulTrain in the press, and how people rate it.',
      storesLabel: 'Ratings',
      dublinCaption: 'At the European competition for young innovators in Dublin.',
      dublinAlt: 'Tihomir Garmenliev at the BulTrain stand at the competition in Dublin',
      ratingCount: '{n} ratings',
      outOf: 'out of 5',
      translated: 'Translated from Bulgarian',
      reviews: [
        {
          text: 'Bravo! At last a working app without ads. It is great that you can see the timetable for stops, not only for stations. I was surprised that it shows the waiting time for a connection when you have to change trains. It even shows the reason for the train’s delay! Bravo once again! THANK YOU for thinking of us, the passengers.',
          name: 'Plamen G.',
          store: 'Google Play',
          date: '2024-04-16',
          lang: 'bg',
        },
        {
          text: 'The app is great. Just an example of how apps SHOULD be made.',
          name: 'Daniel K.',
          store: 'Google Play',
          date: '2026-06-30',
          lang: 'bg',
        },
        {
          text: 'Exceptional design and usability! Traveling by train in Bulgaria has never been easier - this app makes everything smooth and convenient.',
          name: 'dellinex',
          store: 'App Store',
          date: '2026-04-12',
          lang: 'en',
        },
      ],
    },
    maker: {
      name: 'Tihomir Garmenliev',
      role: 'Creator of BulTrain. Student at the Technical University of Sofia.',
      intro: 'BulTrain started as a school project at TUES. Today it is an iOS and Android app that shows train delays and positions from the rail network’s official data. I also built my own e-ink display for stations.',
      quote: 'My goal has always been to solve my own or someone else’s problem with technology.',
      quoteBy: 'Tihomir Garmenliev, to Economy.bg',
      awardsTitle: 'Awards',
      educationTitle: 'Education',
      johnAtanasov: {
        label: 'John Atanasov Certificate – Project with High Public Impact',
        detail: 'For the BulTrain project. Presented by the President of the Republic of Bulgaria, Iliana Iotova.',
      },
      dublin: {
        label: 'Final of a European competition for young innovators, Dublin',
        detail: 'With BulTrain',
      },
      presidentCaption: 'The John Atanasov Certificate – Project with High Public Impact, awarded specifically for the BulTrain project, presented by the President of the Republic of Bulgaria, Iliana Iotova. Photo: Presidency of the Republic of Bulgaria.',
      presidentAlt: 'Tihomir Garmenliev with the President of the Republic of Bulgaria, Iliana Iotova, at the presentation of his certificate, in front of the national coat of arms',
      portraitAlt: 'Tihomir Garmenliev on a platform in front of a train',
    },
    network: {
      title: 'Every train in Bulgaria, right now.',
      lead: '{running} trains running, {withRealtime} with live data.',
      leadNone: '{running} trains running, on schedule.',
      justNow: 'just now',
      minAgo: '{n} min ago',
      updated: 'Updated {age}',
      stale: 'Data last updated {n} min ago.',
      offline: 'Connection lost. Showing the last data received ({age}).',
      starting: 'Loading the data.',
      rateLimited: 'Too many requests. Trying again shortly.',
      unavailable: 'The data is unavailable right now.',
      noRealtime: 'No live data',
      noRealtimeNote: 'The source is not providing current data right now.',
      onTime: 'on time',
      onTimeNote: 'Under 5 min late, only trains with live data ({n} of {total}).',
      avg: 'average delay',
      avgNote: 'Only trains with live data.',
      unit: 'min',
      max: 'longest delay',
      noDelayed: 'No train is late',
      noDelayedNote: 'Every train with live data is within the normal range.',
      board: {
        title: 'Station board',
        departures: 'DEPARTURES',
        time: 'TIME',
        to: 'TO',
        updated: 'Updated',
        unavailable: 'The board is unavailable',
        unavailableNote: 'No data for more than 15 minutes.',
        empty: 'No trains on this list.',
        note: 'The board shows departing trains from the selected station. Delays appear when there is live data.',
      },
      device: {
        caption: 'I built an e-ink board like this for a station.',
        alt: 'E-ink board showing arrivals in Sofia, with delays and “On time”',
      },
      radar: {
        title: 'Every train is a dot',
        description: 'This map shows where every train is, in real time.',
        onMap: '{shown} of {total} trains are on the map, {missing} have no position.',
        allOnMap: 'All {total} trains are on the map.',
        legendOk: 'under 5 min late',
        legendLate: '5 min late or more',
        legendUnknown: 'no delay data',
        map: 'Map of trains in Bulgaria',
        list: 'List of trains',
        delay: 'delay',
        unknownDelay: 'unknown',
        none: 'No trains with a position right now.',
        route: 'Route',
        progress: 'completed',
      },
      line: {
        live: 'Live',
        sample: 'Timetable',
        running: '{n} trains running',
        onTime: '{p}% on time',
        noRealtime: 'no live data',
        unavailable: 'Data unavailable',
        more: 'See it live',
      },
    },
    media: {
      articles: {
        'article-6': {
          title: 'My goal has always been to solve my own or someone else’s problem with technology',
          snippet: 'After the success of BulTrain and the final of the European competition for young innovators in Dublin, Tihomir Garmenliev, a student at the Technical University of Sofia, talks about how he turns everyday problems into technological solutions',
          source: 'Economy.bg',
        },
        'article-5': {
          title: 'Tihomir Garmenliev and BulTrain — for a more informed railway transport',
          snippet: 'The 20-year-old Tihomir Garmenliev is an ambitious programmer. So far, he has two developed platforms behind him — the online guide BullTrain, an app dedicated to trains, which aims to provide better information for travellers...',
          source: 'Bulgarian National Radio',
        },
        'article-4': {
          title: 'Developer Tihomir Garmenliev, on a mission to fix the problems of the urban environment',
          snippet: 'At just 20, Tihomir already has two platforms behind him — one makes rail travel across Bulgaria easier, the other maps out the most dangerous pedestrian crossings in the capital.',
          source: 'Capital',
        },
        'article-3': {
          title: '“Travelling smart with BDZ”: Tihomir Garmenliev on the “Word of the Week” podcast',
          snippet: 'In a special segment of the “Word of the Week” podcast with Iva Doychinova, 20-year-old Tihomir Garmenliev — creator of BulTrain — joins to discuss the app that dramatically simplifies rail travel across Bulgaria.',
          source: 'Dnevnik',
        },
        'article-2': {
          title: 'A mobile app brings everything about rail travel in Bulgaria into one place',
          snippet: '“Travelling by train can be truly enjoyable and truly beautiful,” says Tihomir Garmenliev, a senior at TUES and the creator of the BulTrain app.',
          source: 'Economy.bg',
        },
        'article-1': {
          title: 'Student builds an app that tracks routes and timetables of Bulgarian trains',
          snippet: 'Tihomir Garmenliev, creator of the BulTrain app, on “Business Start”, 14 June 2024.',
          source: 'Bloomberg TV',
        },
      },
    },
    screenshots: {
      labels: { station: 'Live board' },
    },
    about: {
      achievements: {
        tues: { label: 'TUES graduate', detail: 'Technology School “Electronic Systems”' },
        tu: {
          label: 'Student at the Technical University of Sofia',
          detail: 'Major: Informatics and Software Sciences, Faculty of Applied Mathematics and Informatics',
        },
        hacktues: {
          label: 'Winner of HackTUES 10',
          detail: 'The largest student hackathon in Bulgaria',
        },
        teenovator: {
          label: 'Teenovator volunteer',
          detail: 'An initiative giving students their first steps into entrepreneurship',
        },
        '20under20': {
          label: '“20 under 20”, class of 2025',
          detail: 'A joint initiative by Capital and the Youth Council to the US Ambassador',
        },
        bait: {
          label: 'Nominee for the BAIT Awards',
          detail: 'For BulTrain in the “Youth Awards” category',
        },
        softuniada: {
          label: 'First place at Softuniada 2024',
          detail: 'Software Projects category (senior division) with BulTrain',
        },
      },
    },
    support: {
      headingLine1: 'BulTrain is free.',
      headingAccent: 'Your support keeps it running.',
      subheading: 'This is a project built out of passion, not for profit. If BulTrain has saved you from a missed train or stop, or simply made your journey more enjoyable, you can support its development. Thank you!',
      coffee: 'Buy me a coffee',
      revolut: 'Support via Revolut',
      contactLabel: 'Get in touch',
    },
    footer: {
      privacy: 'Privacy Policy',
      privacyApp: 'App Privacy Policy',
      terms: 'Terms of Use',
      contact: 'Contact',
      madeBy: 'Built by Tihomir Garmenliev.',
      disclaimer: 'BulTrain is an independent project and is not affiliated with, nor officially endorsed by, BDZ (Bulgarian State Railways).',
    },
    contact: {
      heading: 'Get in touch',
      subheading: 'Have a question or a suggestion? Choose whichever way suits you best to reach me.',
      methods: {
        email: {
          label: 'Email',
          description: 'For questions, suggestions and technical support.',
        },
        linkedin: {
          label: 'LinkedIn',
          description: 'Read the stories behind the project.',
        },
      },
      ctaTitle: 'I’d love to hear what you think.',
      ctaText: 'Every piece of feedback is valuable and helps make BulTrain better.',
    },
    privacy: {
      heading: 'Privacy Policy',
      lastUpdated: 'Last updated',
      intro: 'Welcome to the BulTrain privacy policy! We respect your privacy and are committed to protecting your data. Please read this Policy to understand how we collect, use and protect any information when you use our app and website.',
      sections: [
        {
          title: '1. Who is responsible for the data',
          body: 'The controller is Tihomir Garmenliev (an individual), creator of BulTrain. For any question about data: <a href="mailto:bultrain.app@gmail.com">bultrain.app@gmail.com</a>.',
        },
        {
          title: '2. Data Collection',
          body: 'BulTrain is built with security in mind. We do <strong>NOT</strong> require you to create an account and we do <strong>NOT</strong> collect personal data that can identify you directly (such as names, email addresses or phone numbers). All data in the app is processed locally on your device.',
        },
        {
          title: '3. Location Data',
          body: 'The “Smart Alarm” feature uses your current location data to alert you as you approach your station. This data is used entirely and only on your device and is <strong>never sent to our servers</strong> or to any third parties.',
        },
        {
          title: '4. The website: cookies and local storage',
          body: 'This website <strong>does not use cookies</strong> and contains no tracking, analytics or advertising tools. When you change the language or the theme (light or dark), the site saves that choice in your browser’s local storage (localStorage, keys “bultrain-lang” and “bultrain-theme”) so it can remember it on your next visit. That information stays on your device, is not sent to us and does not identify you. You can delete it at any time from your browser settings. For this reason we do not show a consent banner.',
        },
        {
          title: '5. Data processed when you visit',
          body: 'The “Live” section loads public train data from our server (api.bultrain.eu), which is delivered through Cloudflare. As with any internet connection, your IP address and the technical details of the request are processed by those services and by the site’s hosting provider so that you receive the page and to keep it secure. We do not use them for tracking, profiling or advertising.',
        },
        {
          title: '6. Sharing of Information',
          body: 'We do not sell or provide data to advertisers or marketing agencies. The only recipients of technical data are the providers named above, who process it solely to make the service work.',
        },
        {
          title: '7. Links to other sites',
          body: 'The site contains links to the App Store, Google Play, news outlets and social networks. They have their own privacy policies, for which we are not responsible.',
        },
        {
          title: '8. Your rights',
          body: 'You have the right of access, rectification, erasure, restriction of processing, portability and objection. You can exercise your rights at the email above. You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (<a href="https://cpdp.bg" target="_blank" rel="noopener noreferrer">cpdp.bg</a>).',
        },
        {
          title: '9. Changes to This Policy',
          body: 'We may update this Privacy Policy from time to time. The date of the last update is at the top of the page. Your continued use of the app will be considered your acceptance of the changes.',
        },
        {
          title: '10. Contact Us',
          body: 'If you have any questions or concerns about our Privacy Policy, please contact us at:',
        },
      ],
    },
    terms: {
      heading: 'Terms of Use',
      intro: 'By using the BulTrain app and website, you agree to comply with these Terms of Use. If you do not agree to these terms, please discontinue your use of the service.',
      sections: [
        {
          title: '1. Description of the Service',
          body: 'BulTrain provides real-time information about train timetables and movements in Bulgaria, along with tools such as the “Smart Alarm” to make your journey easier.',
        },
        {
          title: '2. Disclaimer',
          body: 'BulTrain is an <strong>independent project</strong> and is in no way affiliated with, sponsored by or officially endorsed by BDZ or NRIC. All data is provided “as is”. Despite our efforts to ensure accuracy, we are not liable for any delays, missed connections or errors in the boards and timetables.',
        },
        {
          title: '3. Permitted Use',
          body: 'You agree to use the app only for lawful and personal purposes. It is prohibited to use automated data-extraction systems (scraping), to attempt to breach the app’s security, or to overload its infrastructure.',
        },
        {
          title: '4. Technical Requirements and Localisation',
          body: 'Some app features, such as the Smart Alarm, require the use of your device’s GPS and may lead to higher battery consumption. Using them is entirely your responsibility.',
        },
        {
          title: '5. Intellectual Property Rights',
          body: 'The graphic elements, logos, design and source code created for BulTrain are the property of the developer (Tihomir Garmenliev). Copying or distributing them for commercial purposes without written permission is strictly prohibited.',
        },
        {
          title: '6. Voluntary support',
          body: 'The “Buy me a coffee” and “Revolut” buttons lead to external services for voluntary donations. Support is not the purchase of a service and gives no additional rights. BulTrain remains free.',
        },
      ],
    },
  },
}
