"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEnum = void 0;
var ErrorEnum;
(function (ErrorEnum) {
    ErrorEnum["USER_NOT_FOUND"] = "User not found.";
    ErrorEnum["USER_EXISTS"] = "User already exists.";
    ErrorEnum["USER_DEACTIVATED"] = "User has been deactivated.";
    ErrorEnum["ACCESS_DENIED"] = "Access denied.";
    ErrorEnum["UPLOAD_FILE_FAILED"] = "Failed to upload file to Supabase.";
    ErrorEnum["FILE_SIZE_EXCEEDS"] = "File size exceeds the limit of 20 MB.";
    ErrorEnum["FILE_NOT_FOUND"] = "No file found.";
    ErrorEnum["INVALID_FILE_TYPE"] = "File type must be one of: image/jpeg, image/png, image/jpg.";
    ErrorEnum["LOGOUT_FAILED"] = "Failed to log out. Please try again later.";
    ErrorEnum["SIGN_UP_FAILED"] = "Failed to sign up. Please try again later.";
    ErrorEnum["EMAIL_VERIFICATION_FAILED"] = "Failed to verify email.";
    ErrorEnum["GET_LOCATION_FAILED"] = "Failed to get location.";
    ErrorEnum["INVALID_EMAIL"] = "Please enter a valid email address.";
    ErrorEnum["TOKEN_INVALID"] = "Invalid token.";
    ErrorEnum["TOKEN_EXPIRED"] = "Token has expired.";
    ErrorEnum["VERIFICATION_CODE_SEND_FAILED"] = "Failed to send verification code.";
    ErrorEnum["VERIFICATION_CODE_INVALID"] = "Invalid verification code.";
    ErrorEnum["VERIFICATION_NOT_FOUND"] = "This code has been used or expired. Please go back to get a new code.";
    ErrorEnum["VERIFICATION_CODE_EXPIRED"] = "Verification code has expired.";
})(ErrorEnum || (exports.ErrorEnum = ErrorEnum = {}));
//# sourceMappingURL=error.constant.js.map