import knexPg from ".";
import { Surau } from "../types/surau";

export const getAllSurau = async (): Promise<Surau[]> => {
  try {
    const surauData: Surau[] = await knexPg<Surau[]>("Surau")
      .select(
        "Surau.name as name",
        "Surau.unique_name as unique_name",
        "Surau.is_approved",
        "Surau.created_at",
        "Surau.is_approved_at",
        "Surau.brief_direction",
        "State.name as state",
        "District.name as district",
        "Mall.name as mall"
      )
      .leftJoin("State", "Surau.state_id", "State.id")
      .leftJoin("District", "Surau.district_id", "District.id")
      .leftJoin("Mall", "Surau.mall_id", "Mall.id");
    return surauData
  } catch (err: any) {
    console.log(err);
    return err
  }
};

export const updateSurau = async (id: string): Promise<Surau[]> => {
    const surauData: Surau[] = await knexPg<Surau[]>("Surau")
    .where('unique_name', id)
    .update('is_approved', true)

    console.log(surauData)
    return surauData
}
