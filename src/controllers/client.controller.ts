import { Request, Response } from "express";
import RideRequest from "../models/RideRequest";
import SupplierQuote from "../models/SupplierQuote";

// יצירת בקשה חדשה
export const createNewRide = async (req: Request, res: Response) => {
  try {
    const { tripType, origin, destinations, seats, departureTime } = req.body;
    const userId = (req as any).user.id;
    

    if (!tripType || !origin || !seats || !departureTime) {
      return res.status(400).json({ message: "יש למלא את כל השדות" });
    }

    if (!destinations || destinations.length === 0 || !destinations[0]) {
      return res.status(400).json({ message: "יש להזין לפחות יעד אחד" });
    }

    const ride = await RideRequest.create({
      clientId: userId,
      tripType,
      origin,
      destinations,
      seats,
      departureTime,
    });

    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: "Error creating ride request" });
  }
};

// קבלת כל הבקשות
export const getClientRides = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const rides = await RideRequest.find({ clientId: userId }).sort({
    createdAt: -1,
  });
  res.json(rides);
};

// מחיקת בקשה
export const deleteRide = async (req: Request, res: Response) => {
  try {
    const ride = await RideRequest.findOne({
      _id: req.params.id,
      clientId: (req as any).user.id,
    });

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const relatedQuotes = await SupplierQuote.find({ rideRequestId: ride._id });

    if (relatedQuotes.length > 0) {
      return res.status(400).json({
        message: "לא ניתן למחוק בקשה שכבר ניתנו לה הצעות. יש לפנות למנהל.",
      });
    }

    await ride.deleteOne();

    res.json({ message: "Ride deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting ride" });
  }
};
