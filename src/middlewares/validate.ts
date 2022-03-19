import {Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import getValidator from '../validation';

type MetadataObj = {[key: string]: unknown}

export default (validationName: string) => {
  const rules:any = getValidator(validationName);
  return [
    ...rules,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      const resErrorMsg:MetadataObj = {};
      errors.array().forEach((error) => {
        resErrorMsg[error.param] = error.msg;
      });
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: resErrorMsg });
      }
      return next();
    }
  ];
};