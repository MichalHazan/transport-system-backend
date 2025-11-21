import express from "express";
import { deleteQuoteBySupplier, cancelQuote } from "../controllers/quote.controller";
import { protect } from "../middleware/authMiddleware";
import SupplierQuote from "../models/SupplierQuote";

const router = express.Router();

router.delete("/supplier/delete/:id", protect(["Supplier"]), deleteQuoteBySupplier);
router.put("/admin/cancel/:id", protect(["Admin"]), cancelQuote);

router.put("/admin/cancel/:id", async (req, res) => {
    const { id } = req.params;
    const quote = await SupplierQuote.findByIdAndUpdate(
      id,
      { canceled: true },
      { new: true }
    );
    res.json(quote);
  });
  


export default router;