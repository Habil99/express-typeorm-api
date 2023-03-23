import { AppealStatus } from "../../enums";
import { CitizenEntity } from "../entity/citizen.entity";

export interface Appeal {
    id: number;
    title: string;
    description: string;
    status: AppealStatus;
    citizen: CitizenEntity;
}