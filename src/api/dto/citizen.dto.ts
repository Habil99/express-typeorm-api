import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { AppealDTO } from "./appeal.dto";

export interface CitizenDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  appeals: AppealDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export class CreateCitizenDTO {
  @IsNotEmpty({
    message: "Name is required",
  })
  name: string;

  @IsEmail(
    {},
    {
      message: "Email is invalid",
    }
  )
  email: string;

  @IsNotEmpty({
    message: "Phone is required",
  })
  phone: string;

  @IsNotEmpty({
    message: "Address is required",
  })
  address: string;

  @IsOptional()
  photo?: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    address: string,
    photo?: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.photo = photo;
  }
}
