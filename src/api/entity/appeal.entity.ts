import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppealStatus } from "../../enums";
import { CitizenEntity } from "./citizen.entity";
import { IsNotEmpty, Matches } from "class-validator";
import { AppealDTO } from "../dto/appeal.dto";
import { Appeal } from "../interfaces/Appeal";

@Entity()
export class AppealEntity implements Appeal{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty({
        message: "Title is required"
    })
    title: string

    @Column()
    @IsNotEmpty({
        message: "Description is required"
    })
    description: string

    @Column()
    @Matches(new RegExp(`^(${Object.values(AppealStatus).join("|")})$`), {
        message: "Invalid appeal status"
    })
    status: AppealStatus

    @ManyToOne(() => CitizenEntity, citizen => citizen.appeals, {
        onDelete: "CASCADE",
    })
    citizen: CitizenEntity

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: Date

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    updatedAt: Date

    public createFromDTO(dto: AppealDTO): AppealEntity {
        this.title = dto.title
        this.description = dto.description
        this.status = dto.status
        return this
    }

    public toDTO(): AppealDTO {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            citizen: this.citizen.id,
        }
    }
}