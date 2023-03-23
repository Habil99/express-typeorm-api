import { AppealStatus } from "../../enums";

export interface AppealDTO {
    id: number
    title: string
    description: string
    status: AppealStatus
    citizen: number
}
