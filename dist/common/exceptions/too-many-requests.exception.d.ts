import { HttpException } from '@nestjs/common';
export declare class TooManyRequestsException extends HttpException {
    constructor(errorMessage: string, timeRemaining?: number);
}
