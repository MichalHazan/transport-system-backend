import express from "express";
import { protect } from "../middleware/authMiddleware";
import { updateSelf, updateUserByAdmin, deleteUser } from "../controllers/user.controller";
import RideRequest from "../models/RideRequest";
import SupplierQuote from "../models/SupplierQuote";
const router = express.Router();

// משתמש מעדכן את עצמו
router.put("/update", protect(["Client", "Supplier", "Admin"]), updateSelf);

// מנהל מעדכן כל משתמש
router.put("/admin/update/:id", protect(["Admin"]), updateUserByAdmin);

// מנהל מוחק משתמש
router.delete("/admin/delete/:id", protect(["Admin"]), deleteUser);

router.delete("/admin/ride/:id", async (req, res) => {
    await RideRequest.findByIdAndDelete(req.params.id);
    await SupplierQuote.deleteMany({ rideRequestId: req.params.id });
    res.json({ message: "הבקשה נמחקה בהצלחה" });
  });
router.delete("/admin/quote/:id", async (req, res) => {
  await SupplierQuote.findByIdAndDelete(req.params.id);
  res.json({ message: "הצעה נמחקה" });
});


export default router;
