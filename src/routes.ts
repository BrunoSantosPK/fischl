import express from "express";
const routes = express.Router();

import FormController from "./controllers/form";
import FormValidator from "./validators/form";

routes.get("/form", FormController.get);
routes.post("/form", FormValidator.calc, FormController.calc);

export default routes;