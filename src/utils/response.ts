export type StatusCode = 200 | 400 | 401 | 444;

export default class CustomResponse {

    statusCode: StatusCode;
    message: string;
    data: any;

    constructor() {
        this.statusCode = 200;
        this.message = "";
        this.data = {};
    }

    setStatus(value: StatusCode) {
        this.statusCode = value;
    }

    getStatus() {
        return this.statusCode;
    }

    setMessage(message: string) {
        this.message = message;
    }

    setAttr(key: string, value: any) {
        this.data[key] = value;
    }

    getJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        }
    }

}