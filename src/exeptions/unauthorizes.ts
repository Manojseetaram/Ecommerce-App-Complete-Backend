import { HttpException } from "./root";

export class unAuthorizedException extends HttpException {
 constructor (message : string , errorCode : number , errors ?: any){
    super(message,errorCode,401 , errors)
 }
}