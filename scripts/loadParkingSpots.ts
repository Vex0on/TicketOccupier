import { DataSource } from 'typeorm';
import { ParkSpot } from '../src/Entities/ParkSpots';

import dotenv from 'dotenv';
dotenv.config();

async function loadParkingSpots(): Promise<void> {
  const connectDB = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URI,
    logging: false,
    synchronize: true,
    entities: ['./src/Entities/**/*.ts'],
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  try {
    await connectDB.initialize();

    const parkingSpotsData = Array.from({ length: 20 }, (_, index) => ({
      ParkingNumber: index + 1,
      registration: '',
      isOccupied: false,
    }));

    const parkSpotRepository = connectDB.getRepository(ParkSpot);

    await parkSpotRepository.save(parkingSpotsData);

    console.log('Parking spots loaded successfully.');
  } catch (error) {
    console.error('Error loading parking spots', error);
  } finally {
    await connectDB.destroy();
  }
}

loadParkingSpots();
