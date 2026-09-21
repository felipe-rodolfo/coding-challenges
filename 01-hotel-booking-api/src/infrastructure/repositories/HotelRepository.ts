import { Hotel } from "../../domain/hotel/Hotel";
import hotelsMock from "../mocks/HotelsData";

interface IHotelRepository {
    getAll(): Promise<Hotel[]>;
}

class HotelRepository implements IHotelRepository {
    async getAll(): Promise<Hotel[]> {
        return hotelsMock;
    }
}

export const hotelRepository = new HotelRepository();