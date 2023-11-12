import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { ParkSpot } from "./ParkSpots"; 

@Entity()
export class ParkSpotHistory extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({ length: 100 })
    registration!: string;

    @ManyToOne(() => ParkSpot, (parkSpot) => parkSpot.history)
    parkSpot?: ParkSpot;

    @CreateDateColumn()
    timestamp?: Date;
}
