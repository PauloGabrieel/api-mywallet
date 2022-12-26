import { Router } from "express";
import { createUser, loginUser } from "../controllers/authControllers.js";
import signUpValidatin from "../middlewares/signUpValidation.js";
import userAlreadyExists from "../middlewares/userAlreadyExists.js";
import signinValidation from "../middlewares/signinValidation.js";
const router = Router();

router.post("/signup", signUpValidatin, userAlreadyExists, createUser);
router.post("/signin", signinValidation, loginUser);

export default router;