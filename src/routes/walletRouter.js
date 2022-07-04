import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getWallet, newCashInFlow , expense} from "../controllers/walletControllers.js";

const router = Router();

router.get("/mywallet", tokenValidation, getWallet);
router.post("/income", tokenValidation, newCashInFlow);
router.post("/expense",tokenValidation, expense);

export default router;