import { Request, Response } from "express";
import User from "../models/User";

// עדכון משתמש ע"י המשתמש עצמו
export const updateSelf = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { fullName, phone, email, company } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        phone,
        email,
        company,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// עדכון ע"י מנהל
export const updateUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Admin update failed" });
  }
};

// מחיקת משתמש — מנהל בלבד
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
