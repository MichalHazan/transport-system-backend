import express from "express";
import {
  getAvailableRequests,
  submitQuote,
  getSupplierQuotes
} from "../controllers/supplier.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/requests", protect(["Supplier"]), getAvailableRequests);
router.post("/quote", protect(["Supplier"]), submitQuote);
router.get("/quotes", protect(["Supplier"]), getSupplierQuotes);

export default router;
