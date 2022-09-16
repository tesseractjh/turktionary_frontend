export class CustomError extends Error {
  code: ErrorCode;
  options?: {
    redirect?: string;
    clearAccessToken?: boolean;
    clearRefreshToken?: boolean;
  };

  constructor(
    code: ErrorCode,
    message: string,
    options?: {
      redirect?: string;
      clearAccessToken?: boolean;
      clearRefreshToken?: boolean;
    }
  ) {
    super(message);
    this.code = code;
    this.options = options ?? {};
  }
}
