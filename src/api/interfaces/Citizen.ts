import { AppealEntity } from "../entity/appeal.entity";

export interface Citizen {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
    appeals: AppealEntity[]
    createdAt: Date;
    updatedAt: Date;
}