import { CreateCitizenDTO } from "../dto/citizen.dto";
import { CitizenEntity } from "../entity/citizen.entity"
import citizenRepository from "../repositories/CitizenRepository";
import CitizenException from "../exceptions/CitizenException";
import { STATUS_CODE } from "../../config/constants";
import { APPEAL_MESSAGE, CITIZEN_MESSAGE } from "../../types/exception";
import appealRepository from "../repositories/AppealRepository";
import { AppealEntity as AppealEntity } from "../entity/appeal.entity";
import { AppealDTO } from "../dto/appeal.dto";
import { Citizen } from "../interfaces/Citizen";

class CitizenService {

    public static async getAllCitizens(): Promise<Citizen[]> {
        return await citizenRepository.find({ relations: { appeals: true } });
    }

    public static async createCitizen(citizenDTO: CreateCitizenDTO, filename?: string): Promise<Citizen> {
        const citizenExists = await citizenRepository.findOne({ where: { email: citizenDTO.email } });

        if (citizenExists) {
            throw new CitizenException({
                status: STATUS_CODE.BAD_REQUEST,
                message: CITIZEN_MESSAGE.ALREADY_EXISTS
            })
        }

        return await citizenRepository.save(new CitizenEntity(citizenDTO, filename));
    }

    public static async getCitizenById(id: number): Promise<CitizenEntity> {
        const citizen = await citizenRepository.findOne({ where: { id } })

        if (!citizen) {
            throw new CitizenException({
                status: STATUS_CODE.NOT_FOUND,
                message: CITIZEN_MESSAGE.NOT_FOUND
            })
        }

        return citizen;
    }

    public static async deleteCitizenById(id: number) {
        return await citizenRepository.softDelete({ id }).then((result) => {
            if (result.affected === 0) throw new CitizenException({
                status: STATUS_CODE.NOT_FOUND,
                message: CITIZEN_MESSAGE.NOT_FOUND
            });

            // update deleted column
            citizenRepository.update({ id }, { deleted: true });

            return {};
        })
    }

    public static async updateCitizenById(id: number, citizen: Partial<any>) {
        // add to entity

        return await citizenRepository.update({ id }, citizen)
            .then((result) => {
                if (result.affected === 0) throw new CitizenException({
                    status: STATUS_CODE.NOT_FOUND,
                    message: CITIZEN_MESSAGE.NOT_FOUND
                });

                return this.getCitizenById(id);
            });
    }

    public static async getCitizenAppeals() {
        const appeals = await appealRepository.find({
            where: { citizen: false }
        });

        return appeals || []
    }

    public static async createCitizenAppeal(id: number, appeal: AppealDTO) {
        // check if citizen exists
        const citizen = await this.getCitizenById(id);

        if (!citizen) throw new CitizenException({
            status: STATUS_CODE.NOT_FOUND,
            message: CITIZEN_MESSAGE.NOT_FOUND
        });

        // create appeal
        const newAppeal = new AppealEntity();

        newAppeal.createFromDTO(appeal);

        // add citizen to appeal
        newAppeal.citizen = citizen;

        // save appeal
        const savedAppeal = await appealRepository.save(newAppeal);

        if (!savedAppeal) throw new CitizenException({
            status: STATUS_CODE.BAD_REQUEST,
            message: APPEAL_MESSAGE.BAD_REQUEST
        });

        return savedAppeal;
    }

    public static async deleteCitizenAppeal(appealId: number) {
        return await appealRepository.delete({ id: appealId }).then((result) => {
            if (result.affected === 0) throw new CitizenException({
                status: STATUS_CODE.NOT_FOUND,
                message: APPEAL_MESSAGE.NOT_FOUND
            });

            return {};
        })
    }

    public static async updateCitizenAppeal(appealId: number, appeal: AppealDTO) {
        // check if appeal exists
        const appealEntity = await appealRepository.findOne({ where: { id: appealId } });

        if (!appealEntity) throw new CitizenException({
            status: STATUS_CODE.NOT_FOUND,
            message: APPEAL_MESSAGE.NOT_FOUND
        });

        // save appeal
        const savedAppeal = await appealRepository.save(new AppealEntity().createFromDTO(appeal));

        if (!savedAppeal) throw new CitizenException({
            status: STATUS_CODE.BAD_REQUEST,
            message: APPEAL_MESSAGE.BAD_REQUEST
        });

        return savedAppeal;
    }
}

export default CitizenService;