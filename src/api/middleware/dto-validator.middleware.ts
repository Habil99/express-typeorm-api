import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../../config/constants";
import { CreateCitizenDTO } from "../dto/citizen.dto";
import CitizenException from "../exceptions/CitizenException";

export default function dtoValidatorMiddleware(
  dto: any,
  skipMissingProps = false
) {
  return async (_req: Request, _res: Response, next: NextFunction) => {
    const createCitizenDto = new dto(_req.body as CreateCitizenDTO);

    const errors = await validate(createCitizenDto, {
      skipMissingProperties: skipMissingProps,
    });
    if (errors.length > 0) {
      throw new CitizenException({
        status: STATUS_CODE.BAD_REQUEST,
        message: "Bad request",
        details: errors.map((error) => ({
          [error.property]: Object.values(error.constraints as any).join(", "),
        })),
      });
    } else {
      next();
    }
  };
}
