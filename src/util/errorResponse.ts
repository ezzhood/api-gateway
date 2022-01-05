import { ErrorCodes } from '../constant'
export class ErrorResponse extends Error {
  public statusCode: number = 500
  constructor(message: string, statusCode: number) {
    super()
    this.statusCode = statusCode
    this.message = message
  }

  public static getErrorByStatusCode(statusCode: number): string {
    const exists = Object.keys(ErrorCodes).includes(statusCode.toString())
    if (exists) {
      return ErrorCodes[statusCode.toString()]
    } else {
      return 'Default Error'
    }
  }
}
