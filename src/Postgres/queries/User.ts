import { Pool, QueryErrors } from "./mod.ts";
import { User } from "../schema/mod.ts";

export async function getUserByID(
  id: number,
  fields: Partial<typeof User.Fields> = User.Fields,
): Promise<User.Schema | Error> {
  try {
    const conn = await Pool.connect();
    const result = await conn.queryArray(
      `SELECT ${fields.join(", ")} FROM ${User.TableName} WHERE id=$1`,
      [id],
    ).finally(() => conn.release());
    if (result.rows[0] === undefined) {
      return new Error(
        `${QueryErrors.NotFound} ${getUserByID.name}(${
          [...arguments].join(", ")
        })`,
      );
    }
    const post = new Map();
    for (let i = 0; i < result.rows[0].length; i++) {
      post.set(fields[i], result.rows[0][i]);
    }
    return Object.fromEntries(post.entries()) as User.Schema;
  } catch (error) {
    return error;
  }
}
