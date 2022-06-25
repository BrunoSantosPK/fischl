import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Trait } from "./Trait";

export type Direction = "Negative" | "Positive";

@Entity({ name: "Questions" })
export class Question {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @ManyToOne(() => Trait, trait => trait.Questions)
    @JoinColumn({ name: "TraitId" })
    TraitId: Trait;

    @Column({type: "enum", enum: ["Negative", "Positive"]})
    Direction: Direction;

    @Column("text")
    Text: string;

}