import express from "express";
import { login } from "../controllers/auth.controller";
import { register } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;
