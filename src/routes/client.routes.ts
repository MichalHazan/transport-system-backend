import express from "express";
import { protect } from "../middleware/authMiddleware";
import RideRequest from "../models/RideRequest";
import SupplierQuote from "../models/SupplierQuote";

const router = express.Router();

/**
 * 📌 קבלת כל הבקשות של הלקוח
 */
router.get("/ride", protect(["Client"]), async (req, res) => {
  try {
    const list = await RideRequest.find({ clientId: req.user!.id }).sort({
      createdAt: -1,
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching rides" });
  }
});

/**
 * 📌 יצירת בקשה חדשה
 */
router.post("/ride", protect(["Client"]), async (req, res) => {
  try {
    const newRide = await RideRequest.create({
      ...req.body,
      clientId: req.user!.id,
    });

    res.status(201).json(newRide);
  } catch (err) {
    res.status(500).json({ message: "Error creating ride request" });
  }
});

/**
 * 📌 מחיקת בקשה – רק אם אין הצעות!
 */
router.delete("/ride/:id", protect(["Client"]), async (req, res) => {
  try {
    const ride = await RideRequest.findById(req.params.id);

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.clientId.toString() !== req.user!.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // בדיקה האם קיימות הצעות
    const relatedQuotes = await SupplierQuote.find({
      rideRequestId: req.params.id,
    });

    if (relatedQuotes.length > 0) {
      return res.status(400).json({
        message: "לא ניתן למחוק בקשה שכבר ניתנו לה הצעות. יש לפנות למנהל.",
      });
    }

    await RideRequest.findByIdAndDelete(req.params.id);

    res.json({ message: "Ride deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting ride" });
  }
});

/**
 * 📌 החזרת כל ההצעות עבור בקשות של הלקוח
 */
router.get("/quotes", protect(["Client"]), async (req, res) => {
  try {
    // ממלאים את פרטי הנסיעה ואת הספק
    const quotes = await SupplierQuote.find()
      .populate("rideRequestId")
      .populate("supplierId");

    const filtered = quotes.filter((q: any) => {
      const rr = q.rideRequestId as any;

      if (!rr) return false;
      if (typeof rr === "string") return false;

      // clientId יכול להיות ObjectId או אובייקט משתמש – נטפל בשניהם
      const clientField = rr.clientId as any;

      if (!clientField) return false;

      // אם זה אובייקט משתמש (Document) – נשתמש ב־_id
      if (typeof clientField === "object" && clientField._id) {
        return clientField._id.toString() === req.user!.id;
      }

      // אם זה ObjectId
      return clientField.toString() === req.user!.id;
    });

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching client quotes" });
  }
});

export default router;
