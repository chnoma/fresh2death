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

export async function writePost(title: string, body: string, userid: number): Promise<Post.Schema | Error> {
  try {
    const conn = await Pool.connect();
    const result = await conn.queryArray(`INSERT INTO ${Post.TableName} (title, body, user_id) VALUES ($1, $2, $3) RETURNING *`, [title, body, userid]).finally(() => conn.release());
    if(result.rows[0] === undefined) return new Error(`${QueryErrors.NotFound} ${writePost.name}(${[...arguments].join(', ')})`);
    const post = new Map;
    for(let i = 0; i < result.rows[0].length; i++) {
      post.set(Post.Fields[i], result.rows[0][i]);
    }
    return Object.fromEntries(post.entries()) as Post.Schema;
  } catch(error) {
    return error;
  }
}

export async function getRecentPosts(count = 10): Promise<(Post.Schema & { display_name: string })[] | Error> {
  try {
    const fields = Post.Fields;
    const conn = await Pool.connect();
    const result = await conn.queryArray(`SELECT ${fields.map(v => `post.${v}`).join(', ')}, users.display_name FROM ${Post.TableName}, users WHERE post.user_id = users.id ORDER BY id DESC LIMIT $1`, [count]).finally(() => conn.release());
    if(result.rows.length === 0) return new Error(`${QueryErrors.NotFound} ${getPostByID.name}(${[...arguments].join(', ')})`);
    const posts = [];
    for(const row of result.rows)
      posts.push({
        id: row[0] as number,
        title: row[1] as string,
        body: row[2] as string,
        user_id: row[3] as number,
        display_name: row[4] as string
      });
    return posts;
  } catch(error) {
    return error;
  }
}