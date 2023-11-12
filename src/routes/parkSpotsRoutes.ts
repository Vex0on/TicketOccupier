import express, { Router, Request, Response } from "express";
import { ParkSpot } from "../Entities/ParkSpots";
import connectDB from "../../config/ormconfig";

const app = express();
app.use(express.json());

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const repository = connectDB.getRepository(ParkSpot);

        const existingRecord = await repository.findOne({
            where: { registration: req.body.registration }
        });

        const existingOccupiedSpot = await repository.findOne({
            where: { ParkingNumber: req.body.ParkingNumber, isOccupied: true }
        });

        if (existingRecord) {
            res.json({
                error: "Record with this registration number already exists."
            });
        } else if (existingOccupiedSpot) {
            res.json({
                error: "Parking spot is already occupied."
            });
        } else {
            const newParkingSpot = new ParkSpot();
            newParkingSpot.ParkingNumber = req.body.ParkingNumber;
            newParkingSpot.registration = req.body.registration;
            newParkingSpot.isOccupied = req.body.isOccupied || false;

            await repository.save(newParkingSpot);

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
    res.json(data);
})

router.get("/:id", async (req: Request, res: Response) => {
    const data = await connectDB.getRepository(ParkSpot).findOneBy({
        id: parseInt(req.params.id)
    });
    res.json(data);
})

router.put("/:id", async (req: Request, res: Response) => {
    const parkSpot =  await connectDB.getRepository(ParkSpot).findOne({where: {id: parseInt(req.params.id)}})

    if (parkSpot != null) {
        connectDB.getRepository(ParkSpot).merge(parkSpot, req.body);

        await connectDB.getRepository(ParkSpot).save(parkSpot);

        res.json({
            message: "Values updated successfully!"
        })

    }
    else {
        res.json({
            error: "Values could not be updated"
        })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    await connectDB.getRepository(ParkSpot).delete(req.params.id);
})

export default router;