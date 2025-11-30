import express from "express";
import { protect } from "../middleware/authMiddleware";
import * as clientController from "../controllers/client.controller";
import SupplierQuote from "../models/SupplierQuote";
import RideRequest from "../models/RideRequest";

const router = express.Router();

router.get("/ride", protect(["Client"]), clientController.getClientRides);

router.post("/ride", protect(["Client"]), clientController.createNewRide);

router.delete("/ride/:id", protect(["Client"]), clientController.deleteRide);

// GET client quotes
router.get("/quotes", protect(["Client"]), async (req, res) => {
  try {
    const quotes = await SupplierQuote.find()
      .populate("rideRequestId")
      .populate("supplierId");

    const filtered = quotes.filter((q: any) => {
      const rr: any = q.rideRequestId;
      if (!rr) return false;

      if (typeof rr.clientId === "object" && rr.clientId._id) {
        return rr.clientId._id.toString() === req.user!.id;
      }

      return rr.clientId.toString() === req.user!.id;
    });

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ message: "Error fetching client quotes" });
  }
});

export default router;
