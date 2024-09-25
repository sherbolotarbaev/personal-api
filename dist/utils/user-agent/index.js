"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAgent = exports.userAgentFromString = exports.isBot = void 0;
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
exports.isBot = isBot;
function userAgentFromString(input) {
    const parser = new ua_parser_js_1.default(input);
    const parsedResult = parser.getResult();
    return {
        isBot: input === undefined ? false : isBot(input),
        ua: input || '',
        browser: parsedResult.browser,
        device: parsedResult.device,
        engine: parsedResult.engine,
        os: parsedResult.os,
        cpu: parsedResult.cpu,
    };
}
exports.userAgentFromString = userAgentFromString;
function userAgent({ headers, }) {
    return userAgentFromString(headers['user-agent'] || undefined);
}
exports.userAgent = userAgent;
//# sourceMappingURL=index.js.map