import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Logs" })
export class Log {

    @PrimaryGeneratedColumn({name: "Id"})
    Id: number;

    @Column({type: "varchar", name: "IP", default: null})
    IP: string;

    @Column({type: "varchar", name: "Browser", default: null})
    Browser: string;

    @Column({type: "text", name: "Response"})
    Response: string;

    @Column({type: "float", name: "Latitude", default: null})
    Latitude: number;

    @Column({type: "float", name: "Longitude", default: null})
    Longitude: number;

}