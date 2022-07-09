import { Question } from "./Question";
import { TraitDescription } from "./TraitDescription";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "Traits" })
export class Trait {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @Column({ type: "varchar", name: "OriginName" })
    OriginName: string;

    @Column({ type: "varchar", name: "TranslateName" })
    TranslateName: string;

    @OneToMany(() => Question, question => question.TraitId)
    Questions: Question[];

    @OneToMany(() => TraitDescription, description => description.TraitId)
    TraitDescriptions: TraitDescription[];

}