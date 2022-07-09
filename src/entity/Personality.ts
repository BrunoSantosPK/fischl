import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export type MBTI = "INTJ" | "INTP" | "ENTJ" | "ENTP" | "INFJ" |
    "INFP" | "ENFJ" | "ENFP" | "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ" |
    "ISTP" | "ISFP" | "ESTP" | "ESFP";

@Entity({ name: "Personalities" })
export class Personality {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @Column({
        type: "enum",
        enum: [
            "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP",
            "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ",
            "ISTP", "ISFP", "ESTP", "ESFP"
        ]
    })
    Symbol: MBTI;

    @Column({ type: "varchar", name: "Name" })
    Name: string;

    @Column({ type: "text", name: "Description" })
    Description: string;

}