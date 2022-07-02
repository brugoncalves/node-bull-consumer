import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "./candidate.entity";

@Entity()
export class Vote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partyNumber: number;

    @ManyToOne(() => Candidate)
    @JoinColumn({ name: 'partyNumber'})
    Candidate: Candidate;
}