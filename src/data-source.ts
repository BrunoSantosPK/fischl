import path from "path";
import { config } from "dotenv";
import { Log } from "./entity/Log";
import { DataSource } from "typeorm";
import { Trait } from "./entity/Trait";
import { Question } from "./entity/Question";
import { Personality } from "./entity/Personality";
import { TraitDescription } from "./entity/TraitDescription";

config({ path: path.join(__dirname, "config", ".env") });

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT as string),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    synchronize: true,
    entities: [Trait, Question, Log, TraitDescription, Personality]
});

export default AppDataSource;