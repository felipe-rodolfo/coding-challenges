import { Request, Response } from "express";
import { QuoteService } from "../services/QuoteService";
import { isValidUserType, UserType } from "../../domain/hotel/Hotel";

const quoteService = new QuoteService();

export const getQuote = async (req: Request, res: Response) => {
    try {
        const { dates, userType } = req.body;
        if (!dates || !userType || !isValidUserType(userType)) {
            return res.status(400).json({error: 'dates and userTypes required and UserType must be "regular" or "premium" '});
        }

        const result = await quoteService.getQuote(dates, userType as UserType);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
}