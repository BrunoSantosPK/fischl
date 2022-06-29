import { isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import CustomResponse from "../utils/response";

export default function customError(err: any, req: Request, res: Response, next: NextFunction) {
    if(!isCelebrateError(err))
        return next(err);

    let detail = "";
    err.details.forEach(item => {
        detail += `${item.message} `
    });

    const custom = new CustomResponse();
    custom.setStatus(400);
    custom.setMessage(detail.trim());
    return res.status(400).send(custom.getJSON());
}