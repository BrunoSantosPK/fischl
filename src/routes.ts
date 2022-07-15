import express from "express";
const routes = express.Router();

import PageController from "./controllers/page";
import FormController from "./controllers/form";
import FormValidator from "./validators/form";

routes.get("/", PageController.home);
routes.get("/result/:mbti", PageController.result);

routes.get("/form", FormController.get);
routes.post("/form", FormValidator.calc, FormController.calc);

export default routes;