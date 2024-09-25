"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envBoolean = exports.envNumber = exports.envString = exports.env = exports.cwd = exports.isDev = void 0;
exports.isDev = process.env.NODE_ENV === 'development';
exports.cwd = process.cwd();
function formatValue(key, defaultValue, callback) {
    const value = process.env[key];
    if (typeof value === 'undefined')
        return defaultValue;
    if (!callback)
        return value;
    try {
        return callback(value);
    }
    catch (error) {
        console.error(`Error parsing environment variable "${key}":`, error);
        return defaultValue;
    }
}
function env(key, defaultValue = '') {
    return formatValue(key, defaultValue);
}
exports.env = env;
function envString(key, defaultValue = '') {
    return formatValue(key, defaultValue);
}
exports.envString = envString;
function envNumber(key, defaultValue = 0) {
    return formatValue(key, defaultValue, (value) => {
        const parsedValue = Number(value);
        if (isNaN(parsedValue)) {
            throw new Error(`${key} environment variable is not a valid number`);
        }
        return parsedValue;
    });
}
exports.envNumber = envNumber;
function envBoolean(key, defaultValue = false) {
    return formatValue(key, defaultValue, (value) => {
        const parsedValue = JSON.parse(value.toLowerCase());
        if (typeof parsedValue !== 'boolean') {
            throw new Error(`${key} environment variable is not a valid boolean`);
        }
        return parsedValue;
    });
}
exports.envBoolean = envBoolean;
//# sourceMappingURL=env.js.map