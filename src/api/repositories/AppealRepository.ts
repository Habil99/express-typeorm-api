import { AppDataSource } from "../../database/data-source";
import { AppealEntity } from "../entity/appeal.entity";

const AppealRepository = AppDataSource.getRepository(AppealEntity);

export default AppealRepository;