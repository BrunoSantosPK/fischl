import { Trait } from "./Trait";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

export type TraitLevel = "High" | "Low";
export type LevelSymbol = "E" | "I" | "F" | "T" | "S" | "N" | "A" | "P" | "J";

@Entity({ name: "TraitDescriptions" })
export class TraitDescription {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @ManyToOne(() => Trait, trait => trait.Questions)
    @JoinColumn({ name: "TraitId" })
    TraitId: Trait;

    @Column({ type: "enum", name: "TraitLevel", enum: ["High", "Low"] })
    TraitLevel: TraitLevel;

    @Column({ type: "enum", name: "Symbol", enum: ["E", "I", "F", "T", "S", "N", "A", "P", "J"] })
    Symbol: LevelSymbol;

    @Column({ type: "text", name: "Description" })
    Description: string;

}