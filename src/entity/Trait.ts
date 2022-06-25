import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./Question";

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

}