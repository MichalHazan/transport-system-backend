import { Request, Response } from "express";
import SupplierQuote from "../models/SupplierQuote";

// ספק מוחק הצעה
export const deleteQuoteBySupplier = async (req: Request, res: Response) => {
  try {
    const supplierId = (req as any).user.id;
    const { id } = req.params;

    const quote = await SupplierQuote.findOne({ _id: id, supplierId });
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    await SupplierQuote.findByIdAndDelete(id);
    res.json({ message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// מנהל מבטל הצעה
export const cancelQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await SupplierQuote.findByIdAndUpdate(
      id,
      { approved: false, canceled: true },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
};
