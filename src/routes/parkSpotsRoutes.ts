import express, { Router, Request, Response } from "express";
import { ParkSpot } from "../Entities/ParkSpots";
import { ParkSpotHistory } from "../Entities/ParkSpotHistory";
import connectDB from "../../config/ormconfig";

const app = express();
app.use(express.json());

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const repository = connectDB.getRepository(ParkSpot);
        const existingParkingSpot = await repository.findOne({
            where: { ParkingNumber: req.body.ParkingNumber }
        });

        if (existingParkingSpot) {
            res.json({
                error: "Parking spot with this number already exists."
            });
        } else {
            const newParkingSpot = new ParkSpot();
            newParkingSpot.ParkingNumber = req.body.ParkingNumber;
            newParkingSpot.registration = req.body.registration;
            newParkingSpot.isOccupied = req.body.isOccupied || false;

            await repository.save(newParkingSpot);

            const historyEntry = new ParkSpotHistory();
            historyEntry.registration = req.body.registration;
            historyEntry.parkSpot = newParkingSpot;

            await connectDB.getRepository(ParkSpotHistory).save(historyEntry);

            res.json({
                message: "Values inserted successfully!"
            });
        }
    } catch (err) {
        res.json({
            error: err
        });
    }
});


router.get("/", async (req: Request, res: Response) => {
    const data = await connectDB.getRepository(ParkSpot).find();
    const sortedData = data.sort((a, b) => a.ParkingNumber - b.ParkingNumber);
    res.json(sortedData);
})


router.get("/:id", async (req: Request, res: Response) => {
    try {
        const parkSpotRepository = connectDB.getRepository(ParkSpot);
        const parkSpot = await parkSpotRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["history"],
        });

        if (parkSpot) {
            res.json(parkSpot);
        } else {
            res.json({
                error: "Parking spot not found.",
            });
        }
    } catch (err) {
        res.json({
            error: err
        });
    }
});


router.put("/:id", async (req: Request, res: Response) => {
    try {
        const parkSpotRepository = connectDB.getRepository(ParkSpot);
        const parkSpot = await parkSpotRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["history"],
        });

        if (parkSpot) {
            if (parkSpot.isOccupied) {
                res.json({
                    error: "Cannot update registration number for an occupied parking spot.",
                });
            } else {
                const newRegistration = req.body.registration;
                if (!newRegistration) {
                    res.json({
                        error: "Invalid registration number.",
                    });
                } else {
                    const existingRecord = await parkSpotRepository.findOne({
                        where: { registration: newRegistration, isOccupied: true },
                    });

                    if (existingRecord) {
                        res.json({
                            error: "Registration number already in use for another occupied parking spot.",
                        });
                    } else {
                        parkSpot.registration = newRegistration;
                        await parkSpotRepository.save(parkSpot);
                        const historyEntry = new ParkSpotHistory();
                        historyEntry.registration = newRegistration;
                        historyEntry.parkSpot = parkSpot;
                        await connectDB.getRepository(ParkSpotHistory).save(historyEntry);

                        res.json({
                            message: "Registration number updated successfully!",
                        });
                    }
                }
            }
        } else {
            res.json({
                error: "Parking spot not found.",
            });
        }
    } catch (err) {
        res.json({
            error: err,
        });
    }
});


router.put("/release/:id", async (req: Request, res: Response) => {
    try {
        const parkSpotRepository = connectDB.getRepository(ParkSpot);
        const parkSpot = await parkSpotRepository.findOne({
            where: { id: parseInt(req.params.id), isOccupied: true },
        });

        if (parkSpot) {
            parkSpot.isOccupied = false;
            parkSpot.registration = ""; 

            await parkSpotRepository.save(parkSpot);

            res.json({
                message: "Parking spot released successfully!",
            });
        } else {
            res.json({
                error: "Parking spot not found or is not occupied.",
            });
        }
    } catch (err) {
        res.json({
            error: err,
        });
    }
});


router.delete("/:id", async (req: Request, res: Response) => {
    await connectDB.getRepository(ParkSpot).delete(req.params.id);
})

export default router;