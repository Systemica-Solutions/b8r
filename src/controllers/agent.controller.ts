import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Agent from '../models/agent.model';
import Authcode from '../models/authcode.model';
import { encrypt, decrypt, generateJWTToken } from '../services/crypto.service';

//  Sign up the new agent details and generate the JWT token for that agent
export const agentSignUp = async (req: Request, res: Response) => {
  try {
    console.log('req', req.body);
    let agentData: any = {};
    agentData = req.body;
    const agentExist = await Agent.findOne({ phoneNumber: agentData.phoneNumber });
    if (!agentExist) {
      if (agentData.inviteCode) {
        const iCode = await checkInviteCode(agentData);
        if (iCode === 400 || iCode === 403) {
          return failureResponse(res, 400, [], 'Invalid invitation code');
        }
        if (iCode.startsWith('FL')) { agentData.isFieldAgent = true; }
        const agentObj = new Agent(agentData);
        const agentSave = await agentObj.save();
        const authObj = await saveAuthCode(agentSave);
        if (authObj === 200) {
          return successResponse(
            res,
            200,
            { agent: agentSave },
            'Agent Signup Successfully.'
          );
        } else {
          console.log('agentDAta', agentData);
          return failureResponse(res, 500, [authObj], 'Something went wrong');
        }
      } else {
        return failureResponse(res, 500, [], 'Auth code is required.');
      }
      // return successResponse(res, 200, { agent: agentSave, authRegistery: authObj }, 'agent Signup Successfully.');
    } else {
      return failureResponse(res, 403, [], 'Phone number already exists');
    }
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// check invite code if it is match with authcode or not
const checkInviteCode = async (data: any) => {
  try {
    const authcodeExist = await Authcode.findOne({ code: data.inviteCode });
    if (!authcodeExist) {
      return 400;
    } else {
      if (authcodeExist && authcodeExist.agentId !== null) {
        return 403;
      } else {
        return authcodeExist.code;
      }
    }
  } catch (error) {
    return failureResponse(
      [],
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Save agentId in authcode after sign-up
const saveAuthCode = async (data: any) => {
  try {
    const obj = await Authcode.findOneAndUpdate(
      { code: data.inviteCode },
      { $set: { agentId: data._id } },
      { new: true }
    );
    if (!obj) {
      return 500;
    } else {
      return 200;
    }
  } catch (error) {
    return failureResponse(
      [],
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
    // return error;
  }
  // const authRegistery = {
  //   agentId : agentObj._id,
  //   entity: agentObj.name,
  //   authCode: agentObj.authCode,
  //   authCodeType: agentObj.authCode.substring(0, 2) === 'FL' ? 'Field Agent' :
  //   agentObj.authCode.substring(0, 2) === 'BA' ? 'Property Agent' : 'Other'
  // };
  // const authObj = new Authcode(authRegistery);
  // const saveObj = await authObj.save();
  // return saveObj;
};

//  Get all agents
export const getAllAgentList = async (_: Request, res: Response) => {
  try {
    const agents = await Agent.find().lean();
    if (!agents) {
      throw { status: 404, message: 'agents not found.' };
    }
    return successResponse(res, 200, { agents }, 'Agents found successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Login agent
export const signInAgent = async (req: Request, res: Response) => {
  try {
    const agentData = req.body;
    const agentExist = await Agent.findOne({ phoneNumber: agentData.phoneNumber });
    if (!agentExist) {
      return failureResponse(res, 404, [], 'Agent not found!');
    } else {
      const dbPassword = await decrypt(agentData.password, agentExist.password);
      if (dbPassword) {
        const jwtToken = generateJWTToken(agentExist);
        return successResponse(
          res,
          200,
          { agent: agentExist, jwtToken },
          'Agent login successfully.'
        );
      } else {
        return failureResponse(res, 401, [], 'Invalid password');
      }
    }
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Forgot and Reset password of agent
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    Agent.findOneAndUpdate(
      { phoneNumber: updatedData.phoneNumber },
      {
        $set: {
          password: updatedData.password,
          lastResetPasswordDate: new Date(),
        },
      },
      (err, agent) => {
        if (err) {
          return failureResponse(
            res,
            500,
            err,
            err.message || 'Internal Server Error'
          );
        } else if (agent) {
          return successResponse(
            res,
            200,
            { agent },
            'Password updated successfully.'
          );
        } else {
          return failureResponse(res, 404, err, 'Phone number not found');
        }
      }
    );
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Update agent details
export const updateAgentDetails = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const dbContact = req.user.user.phoneNumber;
    if (dbContact === updatedData.phoneNumber) {
      Agent.findOneAndUpdate(
        { phoneNumber: updatedData.phoneNumber },
        { $set: updatedData },
        { new: true },
        (error, agent) => {
          if (error) {
            return failureResponse(
              res,
              500,
              [error],
              error.message || 'Internal Server Error'
            );
          } else if (agent) {
            return successResponse(
              res,
              200,
              { agent },
              'Agent details updated successfully.'
            );
          } else {
            return failureResponse(
              res,
              404,
              [error],
              error.message || 'Phone number not found'
            );
          }
        }
      );
    } else {
      return failureResponse(
        res,
        401,
        [],
        'You are not authorized to update agent details'
      );
    }
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Add new authcode
export const addCustomAuthCode = async (req: Request, res: Response) => {
  try {
    const authData = req.body;
    authData.codeType =
      authData.code.substring(0, 2) === 'FL'
        ? 'Field Agent'
        : authData.code.substring(0, 2) === 'PA'
        ? 'Property Agent'
        : 'Other';
    const authObj = new Authcode(authData);
    const saveObj = await authObj.save();
    return successResponse(
      res,
      200,
      { authCode: saveObj },
      'New authcode added successfully.'
    );
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};
