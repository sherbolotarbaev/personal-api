export declare const isDev: boolean;
export declare const cwd: string;
export type BaseType = boolean | number | string | undefined | null;
export declare function env(key: string, defaultValue?: string): string;
export declare function envString(key: string, defaultValue?: string): string;
export declare function envNumber(key: string, defaultValue?: number): number;
export declare function envBoolean(key: string, defaultValue?: boolean): boolean;
