import express from "express";

import citizenRoutes from "./routes/citizen.routes";

const appRouter = express.Router();

appRouter.use("/citizens", citizenRoutes);

export default appRouter;