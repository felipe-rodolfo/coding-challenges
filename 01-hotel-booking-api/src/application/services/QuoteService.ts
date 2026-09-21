import { QuoteResult, UserType } from "../../domain/hotel/Hotel";
import { generateQuote } from "../../domain/hotel/Quote";
import { hotelRepository } from "../../infrastructure/repositories/HotelRepository";

export class QuoteService {
    async getQuote(
        dates: string[],
        userType: UserType
    ): Promise<QuoteResult[]> {
        const hotels = await hotelRepository.getAll();
        const dateDates = dates.map(d => new Date(d));
        return generateQuote(hotels, dateDates, userType);
    }
}