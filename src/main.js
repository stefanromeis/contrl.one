import Backend      from 'i18next-xhr-backend';
import 'fetch';

export function configure(aurelia) {

    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-animator-css')
        .plugin('aurelia-dialog');  


    // enable i18n
    aurelia.use.plugin('aurelia-i18n', (instance) => {
        instance.i18next.use(Backend);
        return instance.setup({
            backend : {
                loadPath : 'locale/{{lng}}/{{ns}}.json',
            },
            lng : 'en',
            attributes : ['i18n'],
            getAsync : true,
            sendMissing : false,
            fallbackLng : 'en',
            debug : false,
        });
    });


    // enable aurelia-dialog (modals)
    // aurelia.use.plugin('aurelia-dialog');

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    //aurelia.use.plugin('aurelia-html-import-template-loader')
    aurelia.start()
        .then(() => aurelia.setRoot())
       .then(() => {

            // enable wrapper animations (navbar toggle)
            if ($('body').hasClass('loggedIn')) {
                $('#wrapper').addClass('animated');
            }

           // enable tooltips functionality
            $('#wrapper').tooltip({
                selector : '[data-toggle="tooltip"]',
            });

        });

}
