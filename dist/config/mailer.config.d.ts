import { ConfigType } from '@nestjs/config';
export declare const mailerRegToken = "mailer";
export declare const MailerConfig: (() => {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
}>;
export type IMailerConfig = ConfigType<typeof MailerConfig>;
