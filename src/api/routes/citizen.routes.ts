import { CreateCitizenDTO } from "./../dto/citizen.dto";
import express from "express";
import CitizenController from "../controllers/citizen.controller";
import { withExceptionHandler } from "../../lib/helpers/exception";
import { uploadService } from "../../services/upload";
import dtoValidatorMiddleware from "../middleware/dto-validator.middleware";
// import { Container } from "typedi";

const citizenRoutes = express.Router();

// get citizen controller from typedi container
// const citizenController = Container.get(CitizenController);

// GET /api/v1/citizens
citizenRoutes.get("/", withExceptionHandler(CitizenController.getAllCitizens));

// POST /api/v1/citizens
citizenRoutes.post(
  "/",
  uploadService.single("photo"),
  withExceptionHandler(dtoValidatorMiddleware(CreateCitizenDTO)),
  withExceptionHandler(CitizenController.createCitizen)
);

// GET /api/v1/citizens/:id
citizenRoutes.get(
  "/:id",
  withExceptionHandler(CitizenController.getCitizenById)
);

// DELETE /api/v1/citizens/:id
citizenRoutes.delete(
  "/:id",
  withExceptionHandler(CitizenController.deleteCitizenById)
);

// PUT /api/v1/citizens/:id
citizenRoutes.put(
  "/:id",
  withExceptionHandler(CitizenController.updateCitizenById)
);

// GET /api/v1/citizens/:id/appeals
citizenRoutes.get(
  "/:id/appeals",
  withExceptionHandler(CitizenController.getCitizenAppeals)
);

// POST /api/v1/citizens/:id/appeals
citizenRoutes.post(
  "/:id/appeals",
  withExceptionHandler(CitizenController.createCitizenAppeal)
);

// DELETE /api/v1/citizens/:id/appeals/:appealId
citizenRoutes.delete(
  "/:id/appeals/:appealId",
  withExceptionHandler(CitizenController.deleteCitizenAppeal)
);

// PUT /api/v1/citizens/:id/appeals/:appealId
citizenRoutes.put(
  "/:id/appeals/:appealId",
  withExceptionHandler(CitizenController.updateCitizenAppeal)
);

export default citizenRoutes;
