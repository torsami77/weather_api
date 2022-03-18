import { Response } from 'express';
    
  const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
    unprocessable: 422,
  };
    
  const forgeResponse = (res: Response, statusCode: number, message: string, data:any) => {
    interface ResponseTypes {
      statusCode:Number,
      message?:string,
      error?: string,
      data?:any,
    };

    const response: ResponseTypes = {
        statusCode,
        message: statusCode <= 299 ? message : '',
        error: statusCode >= 299 ? message : '',
        data,
    }
    
    if (!data) delete response.data;
    
    return res.status(statusCode).json(response);
  };
    
  const successResponse = (res:Response, statusCode:number, message:string, userData?:any) => forgeResponse(res, statusCode, message, userData);
    
  const errorResponse = (res:Response, statusCode:number, message:string, data = null) => forgeResponse(res, statusCode, message, data);
    
  const conflictResponse = (res:Response, statusCode:number, message:string, data = null) => forgeResponse(res, statusCode, message, data);
    
  export {
    status,
    successResponse,
    errorResponse,
    conflictResponse,
  };