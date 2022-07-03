import { Router } from "express";

const router = Router();

router.get("/mywallet", getWallet);
router.post("cashin", cashIn);
router.post("/cashout", cashOut);

export default router;