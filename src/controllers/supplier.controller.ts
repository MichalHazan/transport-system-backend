import { Request, Response } from "express";
import SupplierQuote from "../models/SupplierQuote";
import RideRequest from "../models/RideRequest";

export const getAvailableRequests = async (_req: Request, res: Response) => {
  const rides = await RideRequest.find(); // ניתן לסנן לפי status אם תרצי
  res.json(rides);
};

export const submitQuote = async (req: Request, res: Response) => {
  const supplierId = (req as any).user.id;
  const { rideRequestId, price } = req.body;

  const quote = await SupplierQuote.create({
    supplierId,
    rideRequestId,
    price,
  });

  res.json(quote);
};

// כאן מוסיפים populate כדי שבפרונט נראה פרטי נסיעה
export const getSupplierQuotes = async (req: Request, res: Response) => {
  const supplierId = (req as any).user.id;

  const quotes = await SupplierQuote.find({ supplierId })
    .populate("rideRequestId"); // נוספו פרטי הנסיעה

  res.json(quotes);
};
