export enum ErrorEnum {
  USER_NOT_FOUND = 'User not found.',
  USER_EXISTS = 'User already exists.',
  USER_DEACTIVATED = 'User has been deactivated.',

  ACCESS_DENIED = 'Access denied.',

  UPLOAD_FILE_FAILED = 'Failed to upload file to Supabase.',
  FILE_SIZE_EXCEEDS = 'File size exceeds the limit of 20 MB.',
  FILE_NOT_FOUND = 'No file found.',
  INVALID_FILE_TYPE = 'File type must be one of: image/jpeg, image/png, image/jpg.',

  LOGOUT_FAILED = 'Failed to log out. Please try again later.',
  SIGN_UP_FAILED = 'Failed to sign up. Please try again later.',
  EMAIL_VERIFICATION_FAILED = 'Failed to verify email.',
  GET_LOCATION_FAILED = 'Failed to get location.',

  INVALID_EMAIL = 'Please enter a valid email address.',

  TOKEN_INVALID = 'Invalid token.',
  TOKEN_EXPIRED = 'Token has expired.',

  VERIFICATION_CODE_SEND_FAILED = 'Failed to send verification code.',
  VERIFICATION_CODE_INVALID = 'Invalid verification code.',
  VERIFICATION_NOT_FOUND = 'This code has been used or expired. Please go back to get a new code.',
  VERIFICATION_CODE_EXPIRED = 'Verification code has expired.',
}
