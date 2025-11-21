import { Request, Response } from "express";
import SupplierQuote from "../models/SupplierQuote";
import RideRequest from "../models/RideRequest";
import User from "../models/User";

export const getAllPendingDeals = async (_req: Request, res: Response) => {
  const quotes = await SupplierQuote.find({ approved: false }).populate("rideRequestId");
  res.json(quotes);
};

// חדש: כל המשתמשים – למנהל בלבד
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

// חדש: overview – כל הבקשות + כל ההצעות עם populate מלא
export const getAdminOverview = async (_req: Request, res: Response) => {
    try {
      const rideRequests = await RideRequest.find()
        .populate("clientId"); // פרטי הלקוח בבקשה
  
      const quotes = await SupplierQuote.find()
        .populate({
          path: "rideRequestId",
          populate: { path: "clientId" }, // זה הפתרון!
        })
        .populate("supplierId"); // פרטי ספק מלאים
  
      res.json({ rideRequests, quotes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Admin overview failed" });
    }
  };
  

export const approveDeal = async (req: Request, res: Response) => {
  const { quoteId } = req.body;

  const quote = await SupplierQuote.findByIdAndUpdate(
    quoteId,
    { approved: true },
    { new: true }
  );

  if (quote) {
    await RideRequest.findByIdAndUpdate(quote.rideRequestId, {
      status: "Approved",
    });
  }

  res.json(quote);
};



export const deleteRideByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const ride = await RideRequest.findById(id);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // מחיקת כל ההצעות של הבקשה
    await SupplierQuote.deleteMany({ rideRequestId: id });

    // מחיקת הבקשה עצמה
    await RideRequest.findByIdAndDelete(id);

    res.json({ message: "Ride deleted successfully by admin" });
  } catch (err) {
    console.error("Admin delete ride error:", err);
    res.status(500).json({ message: "Server error deleting ride" });
  }
};

