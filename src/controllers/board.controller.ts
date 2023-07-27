import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Board from '../models/board.model';
import { Types } from 'mongoose';
import { generateRandomKey } from '../services/crypto.service';

// Add new board
export const addBoard = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.userId = new Types.ObjectId(req.user.user._id);
    tempData.key = await generateRandomKey(12);
    const detailObj: any = new Board(tempData);
    const savedRecord: any = await detailObj.save();
    await savedRecord.populate('propertyId');
    await savedRecord.populate('tenantId');
    return successResponse(
      res,
      200,
      { board: savedRecord },
      'New board created successfully.'
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

// Get all bords by property agent id
export const getBoardByAgentId = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find({ userId: req.params.id })
      .populate('tenantId propertyId')
      .lean();
    if (!boards) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    return successResponse(res, 200, { boards }, 'Boards found successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Edit board
export const editBoard = async (req: Request, res: Response) => {
  try {
    const boardData = req.body;
    const boards = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $set: boardData,
      },
      { new: true }
    )
      .populate('tenantId propertyId')
      .lean();
    if (!boards) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    return successResponse(
      res,
      200,
      { boards },
      'Boards updated successfully.'
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
