import { AppDataSource } from "../../database/data-source";
import { CitizenEntity } from "../entity/citizen.entity";

const CitizenRepository = AppDataSource.getRepository(CitizenEntity)
export default CitizenRepository;
