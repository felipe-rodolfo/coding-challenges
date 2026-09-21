import { Router } from "express";
import { getQuote } from "./controllers/QuoteController";

const router = Router();

router.post("/quotes", getQuote);

export default router;