import { failureResponse } from '../helpers/api-response.helper';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (typeof token !== 'undefined') {
      const tokenWithoutPrefix = token.split(' ')[1];         // Remove the "Bearer " prefix from the token
      jwt.verify(tokenWithoutPrefix, process.env.SECRET, (err, user) => {
        if (err) {
          return failureResponse(res, 403, [err], 'Forbidden Error.');
        }
        req.user = { user };         // Store the authenticated user object in the request for later use
        next();
      });
    } else {
      return failureResponse(res, 401, [], 'Unauthorized Access.');
    }
  } catch (error) {
      return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
  }
};
