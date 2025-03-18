
export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(message: string, errorCode: ErrorCode, statusCode: number, err: any = null) {
      super(message);
      this.message = message;
      this.errorCode = errorCode;
      this.statusCode = statusCode;
      this.errors = err;
  }
}

export enum ErrorCode {
  USERNOTFOUND = 404,
  USEREXISTS = 409,
  INVALIDEMAIL = 400,
  INVALIDPASSWORD = 400,
  Unprocesssale = 422,
  InterNal_Exception = 500,
  Unauthorizes = 401,
  Productnot = 404

}
