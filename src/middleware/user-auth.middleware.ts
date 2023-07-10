import { failureResponse } from '../helpers/api-response.helper';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model';

/**
 * @returns Decode the JWT token of login user
 */
export const UserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.app_key_auth && req.app_key_auth === 'true' && !req.get('authorization')) {
      next();
    }
    if (req.api_key_auth && req.api_key_auth === 'true' && !req.get('authorization')) {
      next();
    }
    const jwtToken = req.get('authorization');
    if (jwtToken && jwtToken !== '') {
      jwt.verify(jwtToken, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.log(' Check the cookies ', req.cookies.jwt);
            jwt.verify(req.cookies.jwt, process.env.REFRESH_SECRET, (errRef, decodedRef) => {
                console.log('ref', decodedRef);
                if (errRef) {
                  throw { status: 401, message: 'Unauthorized User' };
                } else {
                  Users.findOne({ email: decodedRef.user.email }).lean()
                    .exec((error, user) => {
                      if (error) {
                        throw { status: 401, message: 'Unauthorized User' };
                      } else {
                        console.log(user);
                        req.user = { user };
                        console.log(req.user);
                        next();
                      }
                    });
                }
              }
            );
        } else {
          // @ts-ignore
          req.user = decoded;
          next();
        }
      });
    }
  } catch (error) {
    return failureResponse(
      res,
      error,
      error.message || 'Something went wrong',
      error.status || 500
    );
  }
};
