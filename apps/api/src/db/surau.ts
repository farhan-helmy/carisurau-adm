import knexPg from ".";
import { Surau, SurauPhoto } from "../types/surau";
import { sendEmail } from "../utils/sendEmail";

export const getAllSurau = async (): Promise<Surau[]> => {
  try {
    let surau: Surau[] = []
    const surauData: Surau[] = await knexPg<Surau[]>("Surau")
      .select(
        "Surau.id as id",
        "Surau.name as name",
        "Surau.unique_name as unique_name",
        "Surau.is_approved",
        "Surau.created_at",
        "Surau.is_approved_at",
        "Surau.brief_direction",
        "State.name as state",
        "District.name as district",
        "Mall.name as mall",
      )
      .leftJoin("State", "Surau.state_id", "State.id")
      .leftJoin("District", "Surau.district_id", "District.id")
      .leftJoin("Mall", "Surau.mall_id", "Mall.id");

    for (const data of surauData) {
      if (data) {
        const surauPhoto = await knexPg<SurauPhoto>("SurauPhoto")
          .select("file_path")
          .where("surau_id", data.id)
        surau.push({
          ...data,
          surau_photos: surauPhoto
        })
      }
    }
    return surau;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

export const getSurau = async (id: string): Promise<Surau> => {
  try {
    const surauData: any = await knexPg<any>("Surau")
      .where("unique_name", id)
      .select(
        "Rating.id as rating_id",
        "Rating.review as review",
      )
      .leftJoin("Rating", "Surau.id", "Rating.surau_id")

    return surauData;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

export const addSurau = async (surau: Surau): Promise<Surau> => {
  try {
    const surauData: any = await knexPg<any>("Surau").insert({
      name: surau?.name,
      unique_name: surau?.unique_name,
      is_approved: false,
      created_at: new Date(),
      is_approved_at: "",
      brief_direction: surau?.brief_direction,
      state_id: surau?.state,
      district_id: surau?.district,
      mall_id: surau?.mall,
      is_qiblat_certified: surau?.is_qiblat_certified,
      user_id: surau?.user_id,
      is_solat_jumaat: surau?.is_solat_jumaat,
    });

    return surauData;
  } catch (err: any) {
    console.log(err)
    return err
  }
};

export const updateSurau = async (id: string): Promise<Surau[]> => {
  try {
    const data = await knexPg<any>("Surau")
      .select(
        "Surau.name as name",
        "Surau.unique_name as unique_name",
        "User.email as email",
      )
      .where("unique_name", id)
      .leftJoin("User", "Surau.user_id", "User.id")
      .first()

    const surauData: Surau[] = await knexPg<Surau[]>("Surau")
      .where("unique_name", id)
      .update("is_approved", true);

    await sendEmail(data)

    return surauData;
  } catch (err: any) {
    console.log(err)
    return err
  }
};

export const removeSurau = async (id: string): Promise<Surau[]> => {
  const surauData: Surau[] = await knexPg<Surau[]>("Surau")
    .where("unique_name", id)
    .del();

  return surauData;
};
