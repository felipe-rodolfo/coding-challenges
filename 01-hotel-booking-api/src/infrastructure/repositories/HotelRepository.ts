import { Hotel } from "../../domain/hotel/Hotel";
import { db } from "../../prisma/db";

interface IHotelRepository {
    getAll(): Promise<Hotel[]>;
}

class HotelRepository implements IHotelRepository {
    async getAll(): Promise<Hotel[]> {
        const hotels = await db.orm.public.Hotel.include('rates').all();

        return hotels.map(hotel => (
            {
                id: hotel.id,
                name: hotel.name,
                stars: hotel.stars,
                pricing: {
                    regular: {
                        weekday: hotel.rates.find(r => r.userType === 'regular' && r.dayType === 'weekday')!.price,
                        weekend: hotel.rates.find(r => r.userType === 'regular' && r.dayType === 'weekend')!.price,
                    },
                    premium: {
                        weekday: hotel.rates.find(r => r.userType === 'premium' && r.dayType === 'weekday')!.price,
                        weekend: hotel.rates.find(r => r.userType === 'premium' && r.dayType === 'weekend')!.price,
                    }
                }
            }
        ));
    }
}

export const hotelRepository = new HotelRepository();