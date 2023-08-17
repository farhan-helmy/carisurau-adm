import knexPg from "../db";

interface PingResponse {
  message: string;
}

export default class PingController {
  public async getMessage(): Promise<PingResponse> {
    try {
      const response = await knexPg.raw("SELECT 1");

      return { message: "All good" };
    } catch (err: any) {
      return { message: `${err}` };
    }
  }
}
