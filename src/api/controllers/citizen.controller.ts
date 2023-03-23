import { CitizenDTO, CreateCitizenDTO } from "../dto/citizen.dto";
import { Request, Response } from "express";
import CitizenService from "../services/CitizenService";
import { STATUS_CODE } from "../../config/constants";
import logger from "../../config/logger";
import ApiResponse from "../http/ApiResponse";
import { AppealDTO } from "../dto/appeal.dto";

class CitizenController {
    static getAllCitizens() {
        return CitizenService.getAllCitizens();
    }

    static createCitizen(req: Request, res: Response) {
        // call service to create citizen
        return CitizenService.createCitizen(req.body as CreateCitizenDTO, req.file?.filename)
            .then((citizen) => {
                /**
                 *  TODO: add logger service with mongodb
                 */
                logger.log("info", "Citizen created successfully");

                return new ApiResponse(res).success(STATUS_CODE.CREATED, citizen);
            })
    }

    static getCitizenById(req: Request, res: Response) {
        return CitizenService.getCitizenById(+req.params.id)
            .then((citizen) => {
                logger.log("info", "Citizen found successfully");

                return new ApiResponse(res).success(STATUS_CODE.OK, citizen);
            })
    }

    static deleteCitizenById(req: Request) {
        return CitizenService.deleteCitizenById(+req.params.id);
    }

    static updateCitizenById(req: Request) {
        return CitizenService.updateCitizenById(+req.params.id, req.body as Partial<CitizenDTO>);
    }

    static getCitizenAppeals() {
        return CitizenService.getCitizenAppeals();
    }

    static createCitizenAppeal(req: Request) {
        return CitizenService.createCitizenAppeal(+req.params.id, req.body as AppealDTO);
    }

    static deleteCitizenAppeal(req: Request) {
        return CitizenService.deleteCitizenAppeal(+req.params.appealId);
    }

    static updateCitizenAppeal(req: Request) {
        return CitizenService.updateCitizenAppeal(+req.params.appealId, req.body as AppealDTO);
    }
}

export default CitizenController;