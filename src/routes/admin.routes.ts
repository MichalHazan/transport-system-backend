import express from "express";
import {
  getAllPendingDeals,
  approveDeal,
  getAllUsers,
  getAdminOverview,
  deleteRideByAdmin,
} from "../controllers/admin.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// עסקאות ממתינות (אפשר להשאיר למקרה שתרצי)
router.get("/deals", protect(["Admin"]), getAllPendingDeals);

// מנהל – רשימת משתמשים
router.get("/users", protect(["Admin"]), getAllUsers);

// מנהל – overview מלא של בקשות + הצעות
router.get("/overview", protect(["Admin"]), getAdminOverview);

// אישור עסקה
router.post("/approve", protect(["Admin"]), approveDeal);
//מחיקת בקשה
router.delete("/ride/:id", protect(["Admin"]), deleteRideByAdmin);


export default router;
