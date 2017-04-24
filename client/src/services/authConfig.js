
var configForDevelopment = {
    providers: {
        google: {
            api: {
                get: 'https://www.googleapis.com/gmail/v1',
                post: 'https://www.googleapis.com/upload/gmail/v1'
            },
            clientId: '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com',
            scopes: ['https://mail.google.com/', "https://www.googleapis.com/auth/calendar.readonly"]
        },
        instagram: {
            api: 'https://api.instagram.com/v1',
            clientId: '91d4983ff3eb468b917f838029fc1d8e'
        },
        facebook: {
            appId: '672920632846289'
        },
        news: {
            api: 'https://newsapi.org/v1',
            apiKey: '356bfc9442404652add03b1e0cc1a527'
        },
        soundcloud: {
            clientId: '443f2da68b0ce89934a41dc950c78679',
            redirectUri: 'http://localhost:9000/dist/callback.html',
        },
        spotify: {
            api: 'https://api.spotify.com/v1',
            clientId: '3f25006f76cd43a8a52b1452e949b697',
        },
        auth0: {
            clientId: 'bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8',
            domain: 'contrl.eu.auth0.com'
        },
        contrlOne: {
            api: "http://localhost:3001"
        }
    }
};

var configForProduction = {
    providers: {
        google: {
            clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
        },
        instagram: {
            clientId: '7561959vdub4x1'
        },
        facebook: {
            clientId: '1653908914832509'
        }
    }
};

var config;
if (window.location.hostname === 'localhost') {
    config = configForDevelopment;
}
else {
    config = configForProduction;
}

export default config;