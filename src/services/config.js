/**
 * @function    isDevEnvironment
 * @description Checks whether the application runs in a dev environment or not.
 *              This will be determined by the locations hostname.
 * @returns     {Boolean} : True, if the application runs in a dev environment.
 */

export class Config {

    constructor() {

    }

    twitter = {
        "port": "9000",
        "request_token_url": "https://api.twitter.com/oauth/request_token",
        "access_token_url": "https://api.twitter.com/oauth/access_token",
        "authorize_url": "https://api.twitter.com/oauth/authorize",
        "consumer_key": "rer7ENujYNAi2dOesPQTAYpZo",
        "consumer_secret": "uZ7pWf1LrzTLSUrvxEPnU5Z2F7IqnI9QEsnXxocbPiclmicAfV",
        "oauth_version": "1.0",
        "oauth_signature": "HMAC-SHA1",
        "oauth_callback": "http://6377551a.ngrok.io/request_token"
    }
}