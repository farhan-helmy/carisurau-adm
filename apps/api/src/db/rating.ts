import knexPg from ".";

export const removeRating = async (id: string): Promise<any> => {
    const ratingData = await knexPg<any>("Rating")
        .where("id", id)
        .del();

}