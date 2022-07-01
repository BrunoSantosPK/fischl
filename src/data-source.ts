import path from "path";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Trait } from "./entity/Trait";
import { Question } from "./entity/Question";
import { Log } from "./entity/Log";
config({ path: path.join(__dirname, "config", ".env") });

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT as string),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    synchronize: true,
    entities: [Trait, Question, Log]
});

export default AppDataSource;