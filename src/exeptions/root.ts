
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
  Productnot = 404,
  Adress_Not_Found = 1004,
  Adrss_Does_Not_Belog_To_User = 1005,
  PRODUCTNOTFOUND = 1006

}
