import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeUpdate, Unique, OneToMany } from "typeorm";
import { ParkSpotHistory } from "./ParkSpotHistory";

@Entity()
export class ParkSpot extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    ParkingNumber!: number;

    @Column({ length: 100, default: null, nullable: true })
    registration?: string;

    @Column({ default: false })
    isOccupied!: boolean;

    @BeforeUpdate()
    updateOccupiedStatus() {
        if (this.registration !== null && this.registration !== undefined && this.registration !== "") {
            this.isOccupied = true;
        }
    }

    @OneToMany(() => ParkSpotHistory, (history) => history.parkSpot)
    history?: ParkSpotHistory[];
}
