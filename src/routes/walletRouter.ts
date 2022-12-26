import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getWallet, newCashInFlow , expense, logout} from "../controllers/walletControllers.js";

const router = Router();

router.get("/mywallet", tokenValidation, getWallet);
router.delete("/mywallet", tokenValidation, logout)
router.post("/income", tokenValidation, newCashInFlow);
router.post("/expense",tokenValidation, expense);

export default router;