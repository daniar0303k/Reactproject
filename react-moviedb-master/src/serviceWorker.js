// Бұл қосымша код қызмет көрсетуші қызметкерді тіркеу үшін пайдаланылады.
// register() әдепкі бойынша шақырылмайды.

// Бұл қолданбаны өндірісте кейінгі сапарларда жылдамырақ жүктеуге мүмкіндік береді және береді
// бұл желіден тыс мүмкіндіктер. Дегенмен, бұл әзірлеушілер (және пайдаланушылар)
// тек бетке келесі кірген кезде ғана енгізілген жаңартуларды көреді
// бетте ашылған бар қойындылар бұрын кэштелгендіктен жабылды
// ресурстар фондық режимде жаңартылады.


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
// URL конструкторы SW қолдайтын барлық браузерлерде қол жетімді.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Егер PUBLIC_URL басқа бастауда болса, біздің қызметшіміз жұмыс істемейді
      // біздің бет не қызмет көрсететінінен. Бұл CDN пайдаланылған жағдайда орын алуы мүмкін
      // активтерге қызмет көрсету; https://github.com/facebook/create-react-app/issues/2374 қараңыз
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Бұл жергілікті хостта жұмыс істейді. Қызмет көрсетуші қызметкердің әлі бар-жоғын тексерейік.
        checkValidServiceWorker(swUrl, config);
// Жергілікті хостқа қосымша тіркеуді қосыңыз, әзірлеушілерге
        // қызмет қызметкері/PWA құжаттамасы.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
// Жергілікті хост емес. Тек қызмет көрсету қызметкерін тіркеңіз
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Осы кезде жаңартылған алдын ала кэштелген мазмұн алынды,
              // бірақ алдыңғы қызметші бұрынғысынша үлкенге қызмет етеді
              // барлық клиент қойындылары жабылғанша мазмұн.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Бұл кезде бәрі алдын ала сақталды.
              // Бұл a көрсетуге тамаша уақыт
              // "Мазмұн желіден тыс пайдалану үшін кэштелген." хабар.
              console.log('Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
// Қызмет қызметкерінің табылғанын тексеріңіз. Егер ол бетті қайта жүктей алмаса.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // // Қызмет қызметкерінің бар екеніне және шын мәнінде JS файлын алып жатқанымызға көз жеткізіңіз.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Ешбір қызмет қызметкері табылмады. Басқа қолданба шығар. Бетті қайта жүктеңіз.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        //Қызметкер табылды. Қалыпты әрекетті орындаңыз.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
