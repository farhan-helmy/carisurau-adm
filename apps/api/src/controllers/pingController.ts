import { Get, Route } from "tsoa";

interface PingResponse {
  message: string;
}

export default class PingController {
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "ok",
    };
  }
}
