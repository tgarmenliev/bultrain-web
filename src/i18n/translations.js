// ============================================================================
// BulTrain — centralized translation dictionary
// Two locales: 'bg' (Bulgarian, original) and 'en' (English).
// Access via the useLanguage() hook: const { t } = useLanguage()
// then read t.section.key. Keep the two trees structurally identical.
// ============================================================================

export const translations = {
  // ==========================================================================
  // BULGARIAN
  // ==========================================================================
  bg: {
    nav: {
      features: 'Функции',
      whatsNew: 'Ново',
      media: 'Отзвук',
      gallery: 'Галерия',
      about: 'Зад проекта',
      support: 'Подкрепа',
      cta: 'Свали безплатно',
      menu: 'Меню',
      live: 'На живо',
      tour: 'Приложението',
      theme: 'Смени темата',
      language: 'Език',
    },

    common: {
      backHome: 'Назад към началната страница',
      readMore: 'Прочети повече',
      locale: 'bg-BG',
    },

    hero: {
      badge: 'Всички влакове на едно място',
      headlineLine1: 'Пътувай умно.',
      headlineLine2: 'И не изпускай',
      headlineAccent: 'гарата си.',
      subheading:
        'Разписания и табла на БДЖ в реално време. Умни аларми по локация, които те известяват преди твоята спирка — създадено специално за теб.',
      supportCta: 'Подкрепи проекта',
      appStoreLine1: 'Свали от',
      appStoreLine2: 'App Store',
      googlePlayLine1: 'ПРЕДЛАГА СЕ В',
      googlePlayLine2: 'Google Play',
      stats: [
        { value: 'Безплатно', label: 'за да пътуваш приятно' },
        { value: 'Офлайн', label: 'за да пътуваш спокойно' },
        { value: 'iOS & Android', label: 'за да пътуваш лесно' },
      ],
      facts: [
        { value: '702', label: 'гари' },
        { value: '550', label: 'влака' },
        { value: '4,8', label: 'в Google Play' },
      ],
      photoCredit: 'Снимка: Тихомир Гърменлиев',
      photoAlt: 'Червен локомотив на гара, на светлината преди залез',
      mockup: {
        city: 'С О Ф И Я',
        departures: 'Заминаващи',
        arrivals: 'Пристигащи',
        colTime: 'ВРЕМЕ',
        colFrom: 'От',
        colStatus: 'СТАТУС',
        onTime: 'НАВРЕМЕ',
        delayed: '+21 МИН',
        live: 'На живо',
        notifTitle: 'Пристигане в Пловдив',
        notifSubtitle: 'Умна аларма · след 2 спирки',
        tabs: {
          schedule: 'Разписание',
          board: 'Табло',
          trips: 'Пътувания',
          guide: 'Наръчник',
        },
        trains: [
          { dest: 'Волуяк' },
          { dest: 'Пловдив' },
          { dest: 'Варна' },
          { dest: 'Костенец' },
          { dest: 'Враца' },
          { dest: 'Волуяк' },
        ],
      },
    },

    features: {
      tag: 'Функции',
      headingLine1: 'Всичко, от което се нуждаеш при пътуване',
      headingAccent: 'по релси.',
      subheading:
        'BulTrain обединява всички инструменти, от които се нуждае всеки пътуващ с влак в България — в едно красиво приложение.',
      cards: {
        smartAlarms: {
          title: 'Умни аларми по локация',
          description:
            'Избери маршрут, запази пътуване и BulTrain ще ти изпрати известие преди да пристигнеш. Вече няма нужда да следиш всяка гара, просто можеш да се насладиш на пътуването, а за останалото ще ти помогне приложението.',
        },
        liveBoards: {
          title: 'Електронни Табла на живо',
          description:
            'Заминаващи и пристигащи влакове в реално време от всяка гара в България с информация за закъснения — като истинско табло, но в джоба ти.',
        },
        offlineSchedules: {
          title: 'Пълно разписание офлайн',
          description:
            'Достъп до разписанието без връзка с интернет за твоето запазено пътуване. Запази веднъж и пътувай спокойно.',
        },
        darkMode: {
          title: 'Удобен тъмен режим',
          description:
            'Красиво проектиран за нощни пътувания. Всеки детайл е оптимизиран за комфорт при слаба светлина. Всичко е направено така, че да ти е удобно.',
        },
      },
    },

    tour: {
      title: 'Едно пътуване, от търсенето до заключения екран.',
      lead: 'Така изглежда пътуване с BulTrain, стъпка по стъпка, на истински екрани.',
      steps: [
        { title: 'Търсиш и виждаш закъснението веднага', text: 'Избираш откъде и докъде. Резултатите показват дали влакът закъснява, без допълнителна стъпка.', alt: 'Резултати от търсене със закъснения' },
        { title: 'Табло на всяка гара', text: 'Заминаващи и пристигащи от 702 гари, със закъснението до всеки влак.', alt: 'Табло на гара' },
        { title: 'Следиш конкретния влак', text: 'Виждаш на коя спирка е влакът и колко закъснява. Всичко е на един екран.', alt: 'Маршрут на влак със спирки и закъснения' },
        { title: 'Влакът ти, на заключения екран', text: 'Закъснение, лента с прогреса и време до пристигане, без да отключваш телефона и без да отваряш приложението. Получаваш известие, когато закъснението се промени значително и когато влакът навакса.', tag: 'Live Activity', alt: 'Заключен екран с Live Activity на BulTrain' },
      ],
      ios: 'iOS',
      iosStatus: 'Налично сега',
      androidSoon: 'Скоро налично и за Android',
      cta: 'Свали за iOS',
    },

    promises: {
      statement: 'Ако няма данни на живо, казваме го. Закъснение никога не измисляме.',
      sub: 'Закъсненията идват от официалния публичен поток на Министерството на транспорта и съобщенията. Ако той не е наличен, виждаш ясно обозначен час по разписание.',
      items: [
        { title: 'Алармата работи без интернет', text: 'Алармата за пристигане е изцяло на GPS, без сървър и без мобилно покритие. Работи и когато няма връзка.' },
        { title: 'Без профил, без следене', text: 'Местоположението ти не напуска телефона. Не искаме профил и не събираме лични данни.' },
      ],
    },

    network: {
      title: 'Влаковете в България, в този момент.',
      lead: '{running} влака в движение, за {withRealtime} има данни на живо.',
      leadNone: '{running} влака в движение, по разписание.',
      justNow: 'току-що',
      minAgo: 'преди {n} мин',
      updated: 'Обновено {age}',
      stale: 'Данните са стари {n} мин.',
      offline: 'Връзката е прекъсната. Показани са последните получени данни, стари {age}.',
      starting: 'Данните се зареждат.',
      rateLimited: 'Твърде много заявки. Опитваме отново след малко.',
      unavailable: 'Данните не са достъпни в момента.',
      noRealtime: 'Няма данни на живо',
      noRealtimeNote: 'Източникът в момента не дава актуални данни. Не показваме оценки.',
      onTime: 'навреме',
      onTimeNote: 'Под 5 мин закъснение, само влаковете с данни на живо ({n} от {total}).',
      avg: 'средно закъснение',
      avgNote: 'Само влаковете с данни на живо. Ранните се броят за 0.',
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
        note: 'Закъснение се показва само когато има данни на живо. Останалите са по разписание.',
      },
      device: {
        caption: 'Направих такова табло и за гара: e-ink екран с тези данни.',
        alt: 'E-ink табло със заминаващи влакове от София',
      },
      radar: {
        title: 'Всеки влак е точка',
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

    whatsNew: {
      tag: 'Какво ново',
      headingLine1: 'Влакът ти живее',
      headingAccent: 'на заключения екран.',
      subheading:
        'Live Activity показва закъснението, прогреса и часа на пристигане в реално време. Без отключване, без отваряне на приложението.',
      features: [
        {
          title: 'Live Activity на заключения екран',
          description:
            'Закъснението, лентата с прогреса и времето за пристигане се обновяват сами, докато ти гледаш през прозореца.',
        },
        {
          title: 'Известия само когато има значение',
          description:
            'Получавай известия в реално време, когато влакът ти закъснява и когато навакса.',
        },
        {
          title: 'Закъснението — още в търсенето',
          description:
            'Виждаш веднага дали влакът закъснява, директно в резултатите от разписанието. Без допълнителни стъпки.',
        },
      ],
      availability: {
        ios: 'iOS',
        iosStatus: 'Налично сега',
        androidSoon: 'Скоро налично и за Android',
      },
      cta: 'Свали за iOS',
      honesty: {
        label: 'Честни данни',
        title: 'Само реални данни.',
        text: 'Закъснението идва от официалния публичен поток на Министерството на транспорта. Ако той не е наличен, виждаш ясно обозначен час по разписание — а не измислено число.',
      },
      alarm: {
        label: 'Отделна система',
        title: 'Алармата остава офлайн.',
        text: 'Алармата за пристигане работи само по GPS. Местоположението ти не напуска телефона.',
        chips: ['GPS', 'Работи без интернет'],
      },
      mock: {
        date: 'събота, 19 септември',
        time: '18:31',
        train: 'БВ 2611',
        from: 'София',
        to: 'Пловдив',
        late: '+8 мин',
        lateLabel: 'закъснение',
        arrives: 'Пристига в',
        arrivesAt: '19:14',
        arrivesIn: 'след 43 мин',
      },
    },

    media: {
      tag: 'Медиите за BulTrain',
      headingLine1: 'Какво казват',
      headingAccent: 'другите?',
      subheading:
        'Когато иновацията стъпи на релси, хората забелязват. Вижте отзвука за BulTrain в медийното пространство и защо технологичната общност заговори за бъдещето на пътуването.',
      articles: {
        'article-6': {
          title:
            'Целта ми винаги е била да реша свой или чужд проблем с помощта на технологиите',
          snippet:
            'След успеха на BulTrain и финала на европейското състезание за млади иноватори в Дъблин студентът от Техническия университет в София Тихомир Гърменлиев разказва как превръща ежедневните проблеми в технологични решения',
          source: 'Economy.bg',
        },
        'article-5': {
          title:
            'Тихомир Гърменлиев и BulTrain - за по-информиран железопътен транспорт',
          snippet:
            '20-годишният Тихомир Гърменлиев е амбициозен програмист. До момента има две разработени платформи зад гърба си - онлайн пътеводителя BullTrain - приложение, посветено на влаковете, което си поставя за цел по-качествено информиране на пътуващия...',
          source: 'Българско национално радио',
        },
        'article-4': {
          title:
            'Програмистът Тихомир Гърменлиев, който иска да решава проблеми на градската среда',
          snippet:
            'Едва на 20 години, Тихомир вече има две платформи зад гърба си - с едната улеснява пътуването с влак из България, а с другата картографира опасните пешеходни участъци в столицата',
          source: 'Капитал',
        },
        'article-3': {
          title:
            '"Как се пътува умно с БДЖ": Тихомир Гърменлиев в подкаста "Дума на седмицата"',
          snippet:
            'В специалната рубрика на подкаста "Дума на седмицата" с Ива Дойчинова, гостува 20-годишният Тихомир Гърменлиев, създател на BulTrain, мобилно приложение, което улеснява значително пътуването с влак из България',
          source: 'Дневник',
        },
        'article-2': {
          title:
            'Мобилно приложение предлага всичко за пътуването с влак у нас на едно място',
          snippet:
            '„Пътуването с влак може да бъде наистина много приятно и много красиво“, казва Тихомир Гърменлиев, дванадесетокласник в ТУЕС и създател на приложението BulTrain',
          source: 'Economy.bg',
        },
        'article-1': {
          title:
            'Ученик създава приложение, следящо маршрути и разписания на българските влакове',
          snippet:
            'Тихомир Гърменлиев, създател на приложението BulTrain, в "Бизнес старт" 14.06.2024 г.',
          source: 'Bloomberg TV',
        },
      },
    },

    screenshots: {
      tag: 'Галерия',
      headingLine1: 'Създадено с мисъл',
      headingAccent: 'за всеки пътуващ.',
      subheading:
        'Всеки екран е проектиран с мисъл за удобство и яснота — от късните нощни пътувания до ранните сутрешни преходи.',
      labels: {
        schedule: 'Разписание',
        station: 'Табло на живо',
        alarm: 'Умна аларма',
        journey: 'Детайли за пътуване',
        search: 'Търсене на гара',
      },
    },

    about: {
      tag: 'Зад проекта',
      headingLine1: 'Направено от',
      headingAccent: 'студент. За всички.',
      name: 'Тихомир Гърменлиев',
      bio: 'BulTrain не е просто поредното приложение, а лична мисия за модернизиране на железопътния транспорт в България. Проектът започна като смела идея и прерасна в цялостна екосистема – от мобилно приложение до собственоръчно разработен хардуерен e-ink дисплей за гарите. Всичко това, създадено с една цел: по-добро изживяване за всеки пътуващ.',
      achievements: {
        tues: {
          label: 'Завършил ТУЕС',
          detail: 'Технологично училище "Електронни системи"',
        },
        tu: {
          label: 'Студент в Технически университет - София',
          detail: 'Факултет по приложна математика и информатика',
        },
        hacktues: {
          label: 'Победител в HackTUES 10',
          detail: 'Най-големият ученически хакатон на Балканите',
        },
        teenovator: {
          label: 'Доброволец на Тийноватор',
          detail:
            'Инициатива, която дава първи стъпки в предприемачеството на ученици',
        },
        '20under20': {
          label: '"20 под 20" випуск 2025',
          detail:
            'Съвместна инициатива на "Капитал" и Младежкия съвет към американския посланик',
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
      tag: 'Подкрепи проекта',
      headingLine1: 'BulTrain е безплатен.',
      headingAccent: 'Твоята подкрепа го поддържа.',
      subheading:
        'Това е проект, създаден със страст, не с цел печалба. Ако BulTrain те е спасил от изпуснат влак или спирка, или е направил пътуването ти по-приятно, можеш да подкрепиш развитието му. Благодаря!',
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
      disclaimer:
        'BulTrain е независим проект и не е свързан с, нито е официално одобрен от БДЖ (Български държавни железници).',
    },

    contact: {
      heading: 'Свържете се с нас',
      subheading:
        'Имате въпрос или просто искате да ни поздравите? Изберете най-удобния за Вас начин за връзка с екипа на BulTrain.',
      methods: {
        email: {
          label: 'Имейл',
          description: 'За въпроси, предложения и техническа поддръжка.',
        },
        linkedin: {
          label: 'LinkedIn',
          description: 'Професионална мрежа и бизнес контакти.',
        },
      },
      ctaTitle: 'Очакваме Ви!',
      ctaText:
        'Ние ценим всяка обратна връзка. Вашите мнения ни помагат да направим BulTrain още по-добър за всички пътуващи в България.',
    },

    privacy: {
      heading: 'Политика за поверителност',
      lastUpdated: 'Последна актуализация',
      intro:
        'Добре дошли в BulTrain! Ние уважаваме Вашата поверителност и се ангажираме да защитаваме Вашите данни. Моля, прочетете тази Политика, за да разберете как събираме, използваме и защитаваме всяка информация, когато използвате нашето приложение и уебсайт.',
      sections: [
        {
          title: '1. Събиране на данни',
          body: 'BulTrain е разработено с мисъл за сигурността. Ние <strong>НЕ</strong> изискваме създаване на профил и <strong>НЕ</strong> събираме лични данни, които могат да Ви идентифицират директно (като имена, имейл адреси или телефонни номера). Всички данни се обработват локално на Вашето устройство.',
        },
        {
          title: '2. Данни за местоположение',
          body: 'Функцията "Умна аларма" използва данните за Вашето текущо местоположение, за да Ви извести преди наближаване на Вашата гара. Тези данни се използват изцяло и само на Вашето устройство и <strong>не се изпращат към наши сървъри</strong> или към трети страни.',
        },
        {
          title: '3. Споделяне на информация',
          body: 'Тъй като ние не събираме лични данни, ние няма какво да споделяме, продаваме или предоставяме на маркетингови агенции или свързани лица.',
        },
        {
          title: '4. Промени в тази Политика',
          body: 'Можем периодично да обновяваме тази Политика за поверителност. Препоръчваме да преглеждате тази страница за евентуални промени. Вашето продължително използване на приложението ще се счита за Ваше съгласие с тях.',
        },
        {
          title: '5. Свържете се с нас',
          body: 'Ако имате въпроси или притеснения относно нашата Политика за поверителност, моля, свържете се с нас на:',
        },
      ],
    },

    terms: {
      heading: 'Условия за ползване',
      lastUpdated: 'Последна актуализация',
      intro:
        'С използването на приложението и уебсайта на BulTrain Вие се съгласявате да спазвате настоящите Условия за ползване. Ако не сте съгласни с тези условия, моля, преустановете употребата на услугата.',
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
      ],
    },
  },

  // ==========================================================================
  // ENGLISH — professional, conversion-focused copy for a premium
  // European transit-tech product.
  // ==========================================================================
  en: {
    nav: {
      features: 'Features',
      whatsNew: 'What’s new',
      media: 'Coverage',
      gallery: 'Gallery',
      about: 'The Story',
      support: 'Support',
      cta: 'Download free',
      menu: 'Menu',
      live: 'Live',
      tour: 'The app',
      theme: 'Switch theme',
      language: 'Language',
    },

    common: {
      backHome: 'Back to home',
      readMore: 'Read more',
      locale: 'en-GB',
    },

    hero: {
      badge: 'Every train, in one place',
      headlineLine1: 'Travel smarter.',
      headlineLine2: 'Never miss',
      headlineAccent: 'your stop again.',
      subheading:
        'Live BDZ timetables and departure boards in real time. Location-aware smart alarms that wake you before your stop — built around the way you actually travel.',
      supportCta: 'Support the project',
      appStoreLine1: 'Download on the',
      appStoreLine2: 'App Store',
      googlePlayLine1: 'GET IT ON',
      googlePlayLine2: 'Google Play',
      stats: [
        { value: 'Free', label: 'so every journey is a pleasure' },
        { value: 'Offline', label: 'so you can travel with peace of mind' },
        { value: 'iOS & Android', label: 'so getting around is effortless' },
      ],
      facts: [
        { value: '702', label: 'stations' },
        { value: '550', label: 'trains' },
        { value: '4.8', label: 'on Google Play' },
      ],
      photoCredit: 'Photo: Tihomir Garmenliev',
      photoAlt: 'A red locomotive at a station in the light before sunset',
      mockup: {
        city: 'S O F I A',
        departures: 'Departures',
        arrivals: 'Arrivals',
        colTime: 'TIME',
        colFrom: 'From',
        colStatus: 'STATUS',
        onTime: 'ON TIME',
        delayed: '+21 MIN',
        live: 'Live',
        notifTitle: 'Arriving in Plovdiv',
        notifSubtitle: 'Smart alarm · 2 stops away',
        tabs: {
          schedule: 'Schedule',
          board: 'Board',
          trips: 'Trips',
          guide: 'Guide',
        },
        trains: [
          { dest: 'Voluyak' },
          { dest: 'Plovdiv' },
          { dest: 'Varna' },
          { dest: 'Kostenets' },
          { dest: 'Vratsa' },
          { dest: 'Voluyak' },
        ],
      },
    },

    features: {
      tag: 'Features',
      headingLine1: 'Everything you need for travelling',
      headingAccent: 'by rail.',
      subheading:
        'BulTrain brings together every tool a rail traveller in Bulgaria needs — in one beautifully crafted app.',
      cards: {
        smartAlarms: {
          title: 'Location-based smart alarms',
          description:
            'Pick a route, save your trip, and BulTrain alerts you before you arrive. No more watching every station — just sit back and enjoy the ride while the app handles the rest.',
        },
        liveBoards: {
          title: 'Live departure boards',
          description:
            'Real-time departures and arrivals from every station in Bulgaria, complete with delay information — like a real station board, right in your pocket.',
        },
        offlineSchedules: {
          title: 'Full timetable, offline',
          description:
            'Access the timetable for your saved trip without an internet connection. Save it once and travel with total confidence.',
        },
        darkMode: {
          title: 'Effortless dark mode',
          description:
            'Beautifully designed for night-time journeys. Every detail is tuned for comfort in low light, so the app stays easy on the eyes from dusk till dawn.',
        },
      },
    },

    tour: {
      title: 'One journey, from search to lock screen.',
      lead: 'This is what a trip with BulTrain looks like, step by step, on real screens.',
      steps: [
        { title: 'Search and see the delay right away', text: 'Pick where from and where to. The results show whether the train is late, with no extra step.', alt: 'Search results showing delays' },
        { title: 'A board for every station', text: 'Departures and arrivals from 702 stations, with the delay next to every train.', alt: 'Station board' },
        { title: 'Follow one specific train', text: 'See which stop the train is at and how late it is. All on one screen.', alt: 'Train route with stops and delays' },
        { title: 'Your train, on your lock screen', text: 'The delay, a progress bar and the time to arrival, without unlocking your phone or opening the app. You get a notification when the delay changes significantly and when the train makes up time.', tag: 'Live Activity', alt: 'BulTrain Live Activity on the lock screen' },
      ],
      ios: 'iOS',
      iosStatus: 'Available now',
      androidSoon: 'Coming soon to Android',
      cta: 'Download for iOS',
    },

    promises: {
      statement: 'If there is no live data, we say so. We never make up a delay.',
      sub: 'Delays come from the official public feed of the Ministry of Transport and Communications. If it is unavailable, you see a clearly labelled scheduled time.',
      items: [
        { title: 'The alarm works offline', text: 'The arrival alarm runs entirely on GPS, with no server and no mobile coverage. It works even with no connection.' },
        { title: 'No account, no tracking', text: 'Your location never leaves your phone. We do not ask for an account and we do not collect personal data.' },
      ],
    },

    network: {
      title: 'Every train in Bulgaria, right now.',
      lead: '{running} trains running, {withRealtime} with live data.',
      leadNone: '{running} trains running, on schedule.',
      justNow: 'just now',
      minAgo: '{n} min ago',
      updated: 'Updated {age}',
      stale: 'The data is {n} min old.',
      offline: 'Connection lost. Showing the last data received, {age} old.',
      starting: 'Loading the data.',
      rateLimited: 'Too many requests. Trying again shortly.',
      unavailable: 'The data is unavailable right now.',
      noRealtime: 'No live data',
      noRealtimeNote: 'The source is not providing current data right now. We show no estimates.',
      onTime: 'on time',
      onTimeNote: 'Under 5 min late, only trains with live data ({n} of {total}).',
      avg: 'average delay',
      avgNote: 'Only trains with live data. Early trains count as 0.',
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
        note: 'Delays are shown only when live data exists. Everything else is the timetable.',
      },
      device: {
        caption: 'I built a board like this for stations too: an e-ink screen showing this data.',
        alt: 'E-ink board showing departures from Sofia',
      },
      radar: {
        title: 'Every train is a dot',
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

    whatsNew: {
      tag: 'What’s new',
      headingLine1: 'Your train lives',
      headingAccent: 'on your lock screen.',
      subheading:
        'Live Activity shows your delay, trip progress and arrival time in real time. No unlocking, no opening the app.',
      features: [
        {
          title: 'Live Activity on your lock screen',
          description:
            'The delay, progress bar and arrival time update on their own while you watch the world go by.',
        },
        {
          title: 'Alerts only when it matters',
          description:
            'Get real-time alerts when your train runs late, and when it makes up time.',
        },
        {
          title: 'Delays right in search',
          description:
            'See at a glance whether a train is running late, straight in the timetable results. No extra taps.',
        },
      ],
      availability: {
        ios: 'iOS',
        iosStatus: 'Available now',
        androidSoon: 'Coming soon to Android',
      },
      cta: 'Download for iOS',
      honesty: {
        label: 'Honest data',
        title: 'Real data only.',
        text: 'Delays come straight from the official public feed of the Ministry of Transport. If it’s unavailable, you’ll see a clearly labelled scheduled time, never a made-up number.',
      },
      alarm: {
        label: 'Separate system',
        title: 'The alarm stays offline.',
        text: 'The arrival alarm runs on GPS alone. Your location never leaves your phone.',
        chips: ['GPS', 'Works offline'],
      },
      mock: {
        date: 'Saturday, 19 September',
        time: '18:31',
        train: 'БВ 2611',
        from: 'Sofia',
        to: 'Plovdiv',
        late: '+8 min',
        lateLabel: 'late',
        arrives: 'Arrives at',
        arrivesAt: '19:14',
        arrivesIn: 'in 43 min',
      },
    },

    media: {
      tag: 'BulTrain in the press',
      headingLine1: 'What others are',
      headingAccent: 'saying.',
      subheading:
        'When innovation hits the rails, people notice. See how BulTrain is making headlines and why the tech community is talking about the future of travel.',
      articles: {
        'article-6': {
          title:
            'My goal has always been to solve my own or someone else’s problem with technology',
          snippet:
            'After the success of BulTrain and the final of the European competition for young innovators in Dublin, Tihomir Garmenliev, a student at the Technical University of Sofia, talks about how he turns everyday problems into technological solutions',
          source: 'Economy.bg',
        },
        'article-5': {
          title:
            'Tihomir Garmenliev and BulTrain — for a more informed railway transport',
          snippet:
            'The 20-year-old Tihomir Garmenliev is an ambitious programmer. So far, he has two developed platforms behind him — the online guide BullTrain, an app dedicated to trains, which aims to provide better information for travellers...',
          source: 'Bulgarian National Radio',
        },
        'article-4': {
          title:
            'Developer Tihomir Garmenliev, on a mission to fix the problems of the urban environment',
          snippet:
            'At just 20, Tihomir already has two platforms behind him — one makes rail travel across Bulgaria easier, the other maps out the most dangerous pedestrian crossings in the capital.',
          source: 'Capital',
        },
        'article-3': {
          title:
            '“Travelling smart with BDZ”: Tihomir Garmenliev on the “Word of the Week” podcast',
          snippet:
            'In a special segment of the “Word of the Week” podcast with Iva Doychinova, 20-year-old Tihomir Garmenliev — creator of BulTrain — joins to discuss the app that dramatically simplifies rail travel across Bulgaria.',
          source: 'Dnevnik',
        },
        'article-2': {
          title:
            'A mobile app brings everything about rail travel in Bulgaria into one place',
          snippet:
            '“Travelling by train can be truly enjoyable and truly beautiful,” says Tihomir Garmenliev, a senior at TUES and the creator of the BulTrain app.',
          source: 'Economy.bg',
        },
        'article-1': {
          title:
            'Student builds an app that tracks routes and timetables of Bulgarian trains',
          snippet:
            'Tihomir Garmenliev, creator of the BulTrain app, on “Business Start”, 14 June 2024.',
          source: 'Bloomberg TV',
        },
      },
    },

    screenshots: {
      tag: 'Gallery',
      headingLine1: 'Crafted with care',
      headingAccent: 'for every traveller.',
      subheading:
        'Every screen is designed for comfort and clarity — from late-night journeys to early-morning connections.',
      labels: {
        schedule: 'Schedule',
        station: 'Live board',
        alarm: 'Smart alarm',
        journey: 'Journey details',
        search: 'Station search',
      },
    },

    about: {
      tag: 'The Story',
      headingLine1: 'Built by a',
      headingAccent: 'student. For everyone.',
      name: 'Tihomir Garmenliev',
      bio: 'BulTrain isn’t just another app — it’s a personal mission to modernise rail travel in Bulgaria. The project started as a bold idea and grew into a complete ecosystem, from a mobile app to a self-built e-ink hardware display for stations. All of it created with a single goal: a better experience for every traveller.',
      achievements: {
        tues: {
          label: 'TUES graduate',
          detail: 'Technology School “Electronic Systems”',
        },
        tu: {
          label: 'Student at the Technical University of Sofia',
          detail: 'Faculty of Applied Mathematics and Informatics',
        },
        hacktues: {
          label: 'Winner of HackTUES 10',
          detail: 'The largest student hackathon in the Balkans',
        },
        teenovator: {
          label: 'Teenovator volunteer',
          detail:
            'An initiative giving students their first steps into entrepreneurship',
        },
        '20under20': {
          label: '“20 under 20”, class of 2025',
          detail:
            'A joint initiative by Capital and the Youth Council to the US Ambassador',
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
      tag: 'Support the project',
      headingLine1: 'BulTrain is free.',
      headingAccent: 'Your support keeps it running.',
      subheading:
        'This is a project built out of passion, not for profit. If BulTrain has saved you from a missed train or stop, or simply made your journey more enjoyable, you can support its development. Thank you!',
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
      disclaimer:
        'BulTrain is an independent project and is not affiliated with, nor officially endorsed by, BDZ (Bulgarian State Railways).',
    },

    contact: {
      heading: 'Get in touch',
      subheading:
        'Have a question, or just want to say hello? Choose whichever way works best for you to reach the BulTrain team.',
      methods: {
        email: {
          label: 'Email',
          description: 'For questions, suggestions and technical support.',
        },
        linkedin: {
          label: 'LinkedIn',
          description: 'Professional network and business enquiries.',
        },
      },
      ctaTitle: 'We’d love to hear from you!',
      ctaText:
        'We value every piece of feedback. Your thoughts help us make BulTrain even better for everyone travelling across Bulgaria.',
    },

    privacy: {
      heading: 'Privacy Policy',
      lastUpdated: 'Last updated',
      intro:
        'Welcome to BulTrain! We respect your privacy and are committed to protecting your data. Please read this Policy to understand how we collect, use and protect any information when you use our app and website.',
      sections: [
        {
          title: '1. Data Collection',
          body: 'BulTrain is built with security in mind. We do <strong>NOT</strong> require you to create an account and we do <strong>NOT</strong> collect personal data that can identify you directly (such as names, email addresses or phone numbers). All data is processed locally on your device.',
        },
        {
          title: '2. Location Data',
          body: 'The “Smart Alarm” feature uses your current location data to alert you as you approach your station. This data is used entirely and only on your device and is <strong>never sent to our servers</strong> or to any third parties.',
        },
        {
          title: '3. Sharing of Information',
          body: 'Since we do not collect personal data, there is nothing for us to share, sell or provide to marketing agencies or affiliated parties.',
        },
        {
          title: '4. Changes to This Policy',
          body: 'We may update this Privacy Policy from time to time. We recommend reviewing this page for any changes. Your continued use of the app will be considered your acceptance of them.',
        },
        {
          title: '5. Contact Us',
          body: 'If you have any questions or concerns about our Privacy Policy, please contact us at:',
        },
      ],
    },

    terms: {
      heading: 'Terms of Use',
      lastUpdated: 'Last updated',
      intro:
        'By using the BulTrain app and website, you agree to comply with these Terms of Use. If you do not agree to these terms, please discontinue your use of the service.',
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
      ],
    },
  },
}
