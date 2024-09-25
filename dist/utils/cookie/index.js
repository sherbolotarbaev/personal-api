"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRawCookie = exports.setCookie = exports.extractDomain = void 0;
const constants_1 = require("./constants");
const extractDomain = (hostname) => {
    if (hostname === '127.0.0.1')
        return hostname;
    const parts = hostname.split('.').slice(-2);
    return parts.join('.');
};
exports.extractDomain = extractDomain;
const mergeOptions = (request, customOptions = {}) => {
    const domain = (0, exports.extractDomain)(request.hostname.split(':')[0]);
    return { ...constants_1.DEFAULT_COOKIE_OPTIONS, domain, ...customOptions };
};
const setCookie = (request, response, key, value, customOptions = {}) => {
    const { opts, key: cookieKey } = constants_1.COOKIE_CONFIG[key];
    const options = mergeOptions(request, { ...opts, ...customOptions });
    if (value === undefined) {
        return response.clearCookie(cookieKey, options);
    }
    return response.cookie(cookieKey, value, options);
};
exports.setCookie = setCookie;
const setRawCookie = (response, setCookieValue) => {
    let setCookie = response.getHeader('Set-Cookie');
    if (!setCookie) {
        response.header('Set-Cookie', setCookieValue);
        return response;
    }
    if (typeof setCookie === 'string') {
        setCookie = [setCookie];
    }
    if (typeof setCookie !== 'number') {
        setCookie.push(setCookieValue);
    }
    response.removeHeader('Set-Cookie');
    response.header('Set-Cookie', setCookie);
    return response;
};
exports.setRawCookie = setRawCookie;
//# sourceMappingURL=index.js.map