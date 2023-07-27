import { Router } from "express";
import {
  getAllBuyerList,
  addBuyer,
  getBuyerById,
} from "../../controllers/buyer.controller";
import {
  addBuyerValidation,
  buyertDetailValidation,
} from "../../validation/buyer.validation";
import { userAuth } from "../../middleware/user-auth.middleware";

const router = Router();

// Get all buyers
router.get("/", userAuth, getAllBuyerList);

// Add new buyer
router.post(
  "/",
  userAuth,
  addBuyerValidation,
  buyertDetailValidation,
  addBuyer
);

// Get buyer by id
router.get("/:id", userAuth, getBuyerById);

export default router;
