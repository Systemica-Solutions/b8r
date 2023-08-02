import { Request, Response } from "express";
import {
  successResponse,
  failureResponse,
} from "../helpers/api-response.helper";
import Board from "../models/board.model";
import Property from "../models/property.model";
import SharedProperty from "../models/common.model";
import { Types } from "mongoose";
import { generateRandomKey } from "../services/crypto.service";

// Add new board
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

// Get all bords by tenant agent id
export const getBoardByAgentId = async (req: Request, res: Response) => {
  try {
    const boards = await Board.findOne({ tenantId: req.params.id })
      .populate("tenantId propertyId")
      .lean();
    if (!boards) {
      return failureResponse(res, 404, [], "Board not found.");
    }
    return successResponse(res, 200, { boards }, "Board found successfully.");
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || "Something went wrong"
    );
  }
};

// Edit board
export const editLastVisitDateBoard = async (req: Request, res: Response) => {
  try {
    const boardData = req.body;
    const boards = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $set: boardData,
      },
      { new: true }
    )
      .populate("tenantId propertyId")
      .lean();
    if (!boards) {
      return failureResponse(res, 404, [], "Board not found.");
    }
    return successResponse(res, 200, { boards }, "Board updated successfully.");
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || "Something went wrong"
    );
  }
};

const updateBoardTable = (id, data) => {
  Board.findByIdAndUpdate(
    id,
    { $addToSet: { propertyId: data.propertyId } },
    { new: true }
  ).exec(async (error, updatedRecord) => {
    if (error) {
      return failureResponse(
        error,
        500,
        [],
        error.message || "Something went wrong"
      );
    } else {
      return await updatedRecord;
    }
  });
};

const updateSharedPropertyTable = async (data) => {
  const obj = {
    tenantId: data.tenantId,
  };
  const detailObj: any = new SharedProperty(obj);
  return await detailObj.save();
};

export const addPropertyInBoard = async (req: Request, res: Response) => {
  Promise.all([
    updateBoardTable(req.params.id, req.body),
    updateSharedPropertyTable(req.body),
  ])
    .then((response: any) => {
      if (response && response.length) {
        Property.findByIdAndUpdate(
          req.body.propertyId,
          { $addToSet: { sharedProperty: response[1]._id } },
          { new: true }
        ).exec((err, updatedValue) => {
          if (err) {
            return failureResponse(
              res,
              500,
              [],
              err.message || "Something went wrong"
            );
          } else {
            return successResponse(
              res,
              200,
              {},
              "Property added to board successfully."
            );
          }
        });
      }
    })
    .catch((error) => {
      return failureResponse(
        res,
        500,
        error,
        error.message || "Something went wrong"
      );
    });
};

// Finalize board by property agent
export const finalizeBoard = async (req: Request, res: Response) => {
  try {
    const boards = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: true },
      },
      { new: true }
    )
      .populate("tenantId propertyId")
      .lean();
    if (!boards) {
      return failureResponse(res, 404, [], "Board not found.");
    }
    return successResponse(
      res,
      200,
      { boards },
      "Board finalize successfully."
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
