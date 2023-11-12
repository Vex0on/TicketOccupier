import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique } from "typeorm";

@Entity()
@Unique(["registration"])
export class ParkSpot extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    ParkingNumber!: number;

    @Column({ length: 100, default: null, nullable: true })
    registration?: string;

    @Column({ default: false })
    isOccupied!: boolean;

    @BeforeInsert()
    updateOccupiedStatus() {
        if (this.registration !== null && this.registration !== undefined && this.registration !== "") {
            this.isOccupied = true;
        }
    }
}
