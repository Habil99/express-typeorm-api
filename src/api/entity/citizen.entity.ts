import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { AppealEntity } from "./appeal.entity";
import { IsEmail, IsNotEmpty, IsString, Matches, validate } from "class-validator";
import { Regex } from "../../lib/constants/regex";
import { CitizenDTO } from "../dto/citizen.dto";
import CitizenException from "../exceptions/CitizenException";
import { STATUS_CODE } from "../../config/constants";
import { CITIZEN_MESSAGE } from "../../types/exception";
import { Citizen} from "../interfaces/Citizen";

@Entity({
    orderBy: {
        createdAt: "DESC",
    }
})
export class CitizenEntity implements Citizen {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    @IsNotEmpty({
        message: "Name is required"
    })
    @IsString({
        message: "Name must be a string"
    })
    name: string

    @Column({
        unique: true
    })
    @IsEmail({}, {
        message: "Email is invalid"
    })
    email: string

    @Column()
    @Matches(Regex.PHONE, {
        message: "Phone is in invalid format",
        // change matches to phone in response

    })
    phone: string

    @Column()
    @IsNotEmpty({
        message: "Address is required"
    })
    @IsString({
        message: "Address must be a string"
    })
    address: string

    @Column({
        nullable: true,
    })
    photo: string

    @OneToMany(() => AppealEntity, appeal => appeal.citizen)
    appeals: AppealEntity[]

    @CreateDateColumn({
        type: "timestamp",
    })
    createdAt: Date

    @UpdateDateColumn({
        type: "timestamp",
        nullable: true
    })
    updatedAt: Date

    @DeleteDateColumn({
        type: "timestamp",
        nullable: true,
    })
    deletedAt: Date

    @Column({
        default: false
    })
    deleted: boolean

    constructor(dto?: any, filename?: string) {
        if (dto) this.createFromDTO(dto, filename);
    }

    public createFromDTO(dto: CitizenDTO, filename?: string): CitizenEntity {
        Object.assign(this, dto);
        this.photo = filename || "";
        return this;
    }

    public async validate(): Promise<CitizenEntity | undefined> {

        const errors = await validate(this, {
            validationError: {
                target: false,
            },
        });

        if (errors.length === 0) return this;

        throw new CitizenException({
            status: STATUS_CODE.BAD_REQUEST,
            message: CITIZEN_MESSAGE.BAD_REQUEST,
            details: errors.map((error) => error.constraints).map(
                (constraint: any) => ({
                    message: Object.values(constraint)[0],
                })
            )
        })
    }

    public toDTO(): CitizenDTO {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            address: this.address,
            photo: this.photo,
            appeals: this.appeals.map(appeal => appeal.toDTO()),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}