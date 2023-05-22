import { Postgres } from "../deps.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 20, true);

export type PostFields = keyof Post;

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  user_id: number;
  body: string;
  time_posted: Date;
}

const PostFields: (keyof Post)[] = [
  "id",
  "title",
  "subtitle",
  "user_id",
  "body",
  "time_posted",
];

export enum QueryErrors {
  NotFound = "NOT_FOUND",
}

export async function getPostByID(id: number) {
  const conn = await pool.connect();
  const result = await conn.queryArray(`SELECT $1 FROM posts WHERE id=$2`, [
    PostFields.join(", "),
    id,
  ]).finally(() => conn.release());
  if (result.rows[0] === undefined) {
    return new Error(`${QueryErrors.NotFound} POST ${id}`);
  }
  const post = new Map();
  for (let i = 0; i < result.rows[0].length; i++) {
    post.set(PostFields[i], result.rows[0][i]);
  }
  return Object.fromEntries(post.entries()) as Post;
}
