import { Request, Response } from "express";

export default class PageController {

    static async home(request: Request, response: Response) {
        response.render("pages/home", {lambaroso: "tudo que vier veio"});
    }

}