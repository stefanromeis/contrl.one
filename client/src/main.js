import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {

    var currentLng = localStorage.getItem('appLanguage') || 'en';

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-dialog')
        .plugin('font-awesome')

        .plugin('aurelia-i18n', (instance) => {
            instance.i18next.use(Backend);
            return instance.setup({
                backend: {
                    loadPath: 'locale/{{lng}}/{{ns}}.json',
                },
                lng: currentLng,
                attributes: ['i18n'],
                getAsync: true,
                sendMissing: false,
                fallbackLng: 'en',
                debug: false,
            });
        });

    aurelia.start()
        .then(() => aurelia.setRoot('app', document.body));
}