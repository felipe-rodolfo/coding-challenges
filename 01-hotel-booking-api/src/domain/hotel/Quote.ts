import { Hotel, QuoteResult, UserType } from "./Hotel";

function isDayWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
}

function calculateHotelPrice(
    hotel: Hotel,
    dates: Date[],
    UserType: UserType
): number {
    return dates.reduce((acc, date) => {
        const isWeekend = isDayWeekend(date);
        const dayType = isWeekend ? 'weekend' : 'weekday';
        const price = hotel.pricing[UserType][dayType];
        return acc + price;
    }, 0)
}

export function generateQuote(
    hotels: Hotel[],
    dates: Date[],
    userType: UserType
): QuoteResult[] {
    return hotels.map(hotel => ({
        hotel: hotel.name,
        stars: hotel.stars,
        totalPrice: calculateHotelPrice(hotel, dates, userType)
    }));
}