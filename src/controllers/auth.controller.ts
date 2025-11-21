import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      phone,
      company,
      vehicles,
      documents,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!phone || !/^(05[0-9]{8})$/.test(phone)) {
        return res.status(400).json({ message: "מספר טלפון לא תקין" });
      }
      
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      phone,
      company: role === "Supplier" ? company : undefined,
      vehicles: role === "Supplier" ? vehicles : undefined,
      documents: role === "Supplier" ? documents : undefined,
    });

    const token = generateToken(newUser._id.toString(), newUser.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  res.json({
    token: generateToken(user._id.toString(), user.role),
    user,
  });
};
