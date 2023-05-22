import { Postgres, format } from "../../../deps.ts";
import { HandlerContext } from "$fresh/server.ts";
import { parseCookieHeader } from "../../../src/Cookies.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

export async function handler(req: Request, ctx: HandlerContext) {
  const url = new URL(req.url);
  if(req.method === "GET") {
    const db = await pool.connect();
    const postLength = url.searchParams.has("postLength") ? parseInt(url.searchParams.get("postLength")!) : 50;
    const limit = url.searchParams.has("postLength") ? parseInt(url.searchParams.get("postLength")!) : 10;
    const result = await db.queryArray(`select post.title, substring(post.body, 1, $1), users.display_name from post, users where post.user_id =users.id ORDER BY post.id DESC LIMIT $2`, [postLength, limit]).finally(() => db.release());
    return new Response(JSON.stringify(result.rows.map(v => {
      return {
        title: v[0],
        body: v[1],
        display_name: v[2]
      }
    })));
  }
  if(req.method !== 'POST') return new Response(`{"error": "method not allowed"}`, {status: 405});
  const cookies = parseCookieHeader(req.headers.get("cookie"));
  if(!cookies.has('token')) return new Response(`{"error": "no authenication token"}`, {status: 401});
  const token = cookies.get('token');
  if(url.searchParams.has('title') === false) return new Response(`{"error": "no title"}`, {status: 400});
  const db = await pool.connect();
  const result = await db.queryArray(`INSERT INTO post (title, body, user_id) VALUES ($1::varchar, $2::varchar, $3)`, [String(url.searchParams.get('title')), await req.text(), token]).finally(() => db.release());
  if(result.warnings.length > 0) return new Response(`{"error": "${result.warnings[0]}"}`, {status: 400})
  return new Response(`{"success": "post created"}`);
}