import { Router } from "express";
import { create, login } from "../controllers/authControllers";
const router = Router();

router.post("/signup", create);
router.post("/signin", login);

export default router;
