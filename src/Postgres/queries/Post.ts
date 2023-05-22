import { Pool, QueryErrors } from './mod.ts';
import { Post } from "../schema/mod.ts";

export async function getPostByID(id: number, fields: Partial<typeof Post.Fields> = Post.Fields): Promise<Post.Schema | Error> {
  try {
    const conn = await Pool.connect();
    const result = await conn.queryArray(`SELECT ${fields.join(', ')} FROM ${Post.TableName} WHERE id=$1`, [id]).finally(() => conn.release());
    if(result.rows[0] === undefined) return new Error(`${QueryErrors.NotFound} ${getPostByID.name}(${[...arguments].join(', ')})`);
    const post = new Map;
    for(let i = 0; i < result.rows[0].length; i++) {
      post.set(fields[i], result.rows[0][i]);
    }
    return Object.fromEntries(post.entries()) as Post.Schema;
  } catch(error) {
    return error;
  }
}