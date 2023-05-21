import { Postgres, format } from "../../../deps.ts";
import { HandlerContext } from "$fresh/server.ts";
import { parseCookieHeader } from "../../../src/Cookies.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

export async function handler(req: Request, ctx: HandlerContext) {
  if(req.method !== 'POST') return new Response(`{"error": "method not allowed"}`, {status: 405});
  const cookies = parseCookieHeader(req.headers.get("cookie"));
  if(!cookies.has('token')) return new Response(`{"error": "no authenication token"}`, {status: 401});
  const token = cookies.get('token');
  const url = new URL(req.url);
  if(url.searchParams.has('title') === false) return new Response(`{"error": "no title"}`, {status: 400});
  const db = await pool.connect();
  const query = format(`INSERT INTO post (title, body, author) VALUES ('%s', '%s', ${token})`, url.searchParams.get('title'), await req.text());
  console.log(query)
  const result = await db.queryObject(query).finally(() => db.release());
  if(result.warnings.length > 0) return new Response(`{"error": "${result.warnings[0]}"}`, {status: 400})
  return new Response(`{"success": "post created"}`);
}