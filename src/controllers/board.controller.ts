import { Request, Response } from "express";
import {
  successResponse,
  failureResponse,
} from "../helpers/api-response.helper";
import Board from "../models/board.model";
import { Types } from "mongoose";
import { generateRandomKey } from "../services/crypto.service";

// Add new buyer
export const addBoard = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.userId = new Types.ObjectId(req.user.user._id);
    tempData.key = await generateRandomKey(12);
    const detailObj: any = new Board(tempData);
    const savedRecord: any = await detailObj.save();
    await savedRecord.populate("propertyId");
    await savedRecord.populate("tenantId");
    return successResponse(
      res,
      200,
      { board: savedRecord },
      "New board created successfully."
    );
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || "Something went wrong"
    );
  }
};
