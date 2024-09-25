"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthClass = void 0;
const crypto_1 = require("crypto");
const simple_oauth2_1 = require("simple-oauth2");
const enums_1 = require("../enums");
class OAuthClass {
    provider;
    client;
    url;
    static [enums_1.OAuthProvidersEnum.GOOGLE] = {
        authorizeHost: 'https://accounts.google.com',
        authorizePath: '/o/oauth2/v2/auth',
        tokenHost: 'https://www.googleapis.com',
        tokenPath: '/oauth2/v4/token',
    };
    static [enums_1.OAuthProvidersEnum.GITHUB] = {
        authorizeHost: 'https://github.com',
        authorizePath: '/login/oauth/authorize',
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
    };
    static userDataUrls = {
        [enums_1.OAuthProvidersEnum.GOOGLE]: 'https://www.googleapis.com/oauth2/v3/userinfo',
        [enums_1.OAuthProvidersEnum.GITHUB]: 'https://api.github.com/user',
        [enums_1.OAuthProvidersEnum.LOCAL]: '',
    };
    code;
    authorization;
    userDataUrl;
    constructor(provider, client, url) {
        this.provider = provider;
        this.client = client;
        this.url = url;
        if (provider === enums_1.OAuthProvidersEnum.LOCAL) {
            throw new Error('Invalid provider');
        }
        this.code = new simple_oauth2_1.AuthorizationCode({
            client,
            auth: OAuthClass[provider],
        });
        this.authorization = OAuthClass.genAuthorization(provider, url);
        this.userDataUrl = OAuthClass.userDataUrls[provider];
    }
    get dataUrl() {
        return this.userDataUrl;
    }
    get authorizationUrl() {
        const state = (0, crypto_1.randomBytes)(16).toString('hex');
        return [this.code.authorizeURL({ ...this.authorization, state }), state];
    }
    static genAuthorization(provider, url) {
        const redirect_uri = `${url}/oauth2/${provider}/callback`;
        switch (provider) {
            case enums_1.OAuthProvidersEnum.GOOGLE:
                return {
                    redirect_uri,
                    scope: [
                        'https://www.googleapis.com/auth/userinfo.email',
                        'https://www.googleapis.com/auth/userinfo.profile',
                    ],
                };
            case enums_1.OAuthProvidersEnum.GITHUB:
                return {
                    redirect_uri,
                    scope: ['user:email', 'read:user'],
                };
        }
    }
    async getToken(code) {
        const result = await this.code.getToken({
            code,
            redirect_uri: this.authorization.redirect_uri,
            scope: this.authorization.scope,
        });
        return result.token.access_token;
    }
}
exports.OAuthClass = OAuthClass;
//# sourceMappingURL=oauth.class.js.map