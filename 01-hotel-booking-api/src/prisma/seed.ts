import { db } from './db';
import hotelsMock from '../infrastructure/mocks/HotelsData';

async function seed() {
  for (const hotel of hotelsMock) {
    await db.orm.public.Hotel.create({
      name: hotel.name,
      stars: hotel.stars,
      rates: (rates) => rates.create([
        { userType: 'regular', dayType: 'weekday', price: hotel.pricing.regular.weekday },
        { userType: 'regular', dayType: 'weekend', price: hotel.pricing.regular.weekend },
        { userType: 'premium', dayType: 'weekday', price: hotel.pricing.premium.weekday },
        { userType: 'premium', dayType: 'weekend', price: hotel.pricing.premium.weekend },
      ]),
    });
  }
  console.log('Seed completo!');
}

seed();
