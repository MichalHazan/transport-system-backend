import { Request, Response } from "express";
import RideRequest from "../models/RideRequest";

export const createNewRide = async (req: Request, res: Response) => {
  const { tripType, origin, destinations, vehicleType, seats } = req.body;
  const userId = (req as any).user.id;

  const ride = await RideRequest.create({
    clientId: userId,
    tripType,
    origin,
    destinations,
    vehicleType,
    seats,
  });

  res.json(ride);
};

export const getClientRides = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const rides = await RideRequest.find({ clientId: userId });
  res.json(rides);
};

export const deleteRide = async (req: Request, res: Response) => {
    try {
      const clientId = (req as any).user.id;
      const { id } = req.params;
  
      const ride = await RideRequest.findOne({ _id: id, clientId });
      if (!ride) return res.status(404).json({ message: "Ride not found" });
  
      await RideRequest.findByIdAndDelete(id);
  
      res.json({ message: "Ride deleted" });
    } catch (err) {
      res.status(500).json({ message: "Delete failed" });
    }
  };
  