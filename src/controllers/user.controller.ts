import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import User from '../models/user.model';
import Authcode from '../models/authcode.model';
import { encrypt, decrypt } from '../services/crypto.service';

/**
 * Generate JWT token using firebase token and user details
 */
const generateJWTToken = (user) =>  {
    return jwt.sign(user.toJSON(), process.env.SECRET, { expiresIn: process.env.JWT_EXPIRY });
};

//  Sign up the new user details and generate the JWT token for that user
export const signUpUser = async (req: Request, res: Response) => {
   try {
        console.log('req', req.body);
        let userData: any = {};
        userData = req.body;
        const userExist = await User.findOne({ phoneNumber: userData.phoneNumber });
        if (!userExist) {
              if (userData.inviteCode) {
                const iCode = await checkInviteCode(userData);
                if (iCode === 400 || iCode === 403) {
                  return failureResponse(res, 400, [], 'Invalid invitation code');
                }
                const userObj = new User(req.body);
                const userSave = await userObj.save();
                const authObj = await saveAuthCode(userSave);
                if (authObj === 200) {
                   return successResponse(res, 200, { user: userSave }, 'User Signup Successfully.');
                } else {
                console.log('userDAta', userData);
                return failureResponse(res, 500, [authObj], 'Something went wrong'); }
              } else { return failureResponse(res, 500, [], 'Auth code is required.'); }
                // return successResponse(res, 200, { user: userSave, authRegistery: authObj }, 'User Signup Successfully.');
        } else {
              return failureResponse(res, 403, [], 'Phone number already exists');
          }
    } catch (error) {
       return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
   }
};

// check invite code if it is match with authcode or not
const checkInviteCode = async (data: any) => {
  try {
    const authcodeExist = await Authcode.findOne({ code: data.inviteCode });
    if (!authcodeExist) {
      return 400;
    } else {
      if (authcodeExist && authcodeExist.userId !== null) {
        return 403;
      }
      else { return authcodeExist.code; }
    }
  } catch (error) {
    return error;
  }
};

// Save user-id in authcode after sign-up
const saveAuthCode = async (data: any) => {
    try {
      const obj = await Authcode.findOneAndUpdate({ code: data.inviteCode },
        { $set: { userId: data._id} }, {new : true});
      if (!obj) { return 500; }
        else { return 200; }
    } catch (error) {
      return error;
    }
      // const authRegistery = {
      //   userId : userObj._id,
      //   entity: userObj.name,
      //   authCode: userObj.authCode,
      //   authCodeType: userObj.authCode.substring(0, 2) === 'FL' ? 'Field Agent' :
      //   userObj.authCode.substring(0, 2) === 'BA' ? 'Property Agent' : 'Other'
      // };
      // const authObj = new Authcode(authRegistery);
      // const saveObj = await authObj.save();
      // return saveObj;
};

//  Get all users
export const getAllUsersList = async (_: Request, res: Response) => {
    try {
        const users = await User.find().lean();
        if (!users) {
          throw { status: 404, message: 'Users not found.' };
        }
        return successResponse(res, 200, { users }, 'Users found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};

// Login user
export const signInUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userExist = await User.findOne({ phoneNumber: userData.phoneNumber });
    if (!userExist) {
      return failureResponse(res, 404, [], 'User not found!');
    } else {
      const dbPassword = await decrypt(userData.password, userExist.password);
      if (dbPassword) {
        const jwtToken = generateJWTToken(userExist);
        return successResponse(res, 200, { user: userExist, jwtToken }, 'User login successfully.');
      } else {
        return failureResponse(res, 401, [], 'Invalid password');
      }
    }
  } catch (error) {
    return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
  }
};

// Forgot and Reset password of user
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    User.findOneAndUpdate({  phoneNumber: updatedData.phoneNumber },
      { $set: { password: updatedData.password, lastResetPasswordDate: new Date()} },
      (err, user) => {
        if (err) {
          return failureResponse(res, 500, err, err.message || 'Internal Server Error');
        } else if (user) {
          return successResponse(res, 200, { user }, 'Password updated successfully.');
        } else {
          return failureResponse(res, 404, err, err.message || 'Phone number not found');
        }
    });
  } catch (error) {
    return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
  }
};

// Update user details
export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const dbContact = req.user.user.phoneNumber;
    if (dbContact === updatedData.phoneNumber) {
      User.findOneAndUpdate({  phoneNumber: updatedData.phoneNumber },
        { $set: updatedData }, {new: true}, (error, user) => {
          if (error) {
            return failureResponse(res, 500, [error], error.message || 'Internal Server Error');
          } else if (user) {
            return successResponse(res, 200, { user }, 'User details updated successfully.');
          } else {
            return failureResponse(res, 404, [error], error.message || 'Phone number not found');
          }
      });
    } else {
      return failureResponse(res, 401, [], 'You are not authorized to update user details');
    }
  } catch (error) {
    return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
  }
};


// Add new authcode
export const addCustomAuthCode = async (req: Request, res: Response) => {
  try {
    const authData = req.body;
    authData.codeType = authData.code.substring(0, 2) === 'FL' ? 'Field Agent' :
        authData.code.substring(0, 2) === 'BA' ? 'Property Agent' : 'Other';
    const authObj = new Authcode(authData);
    const saveObj = await authObj.save();
    return successResponse(res, 200, { authCode: saveObj }, 'New authcode added successfully.');
  } catch (error) {
      return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
  }
};
