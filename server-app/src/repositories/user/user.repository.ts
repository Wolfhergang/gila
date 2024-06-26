import DB from "../../services/db/db";
import { Category } from "common-types";

export const getUsersWithCategory = async (category: Category) => {
    return await DB.User.get({ subscribed: [ category ] });
}