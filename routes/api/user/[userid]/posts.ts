import { Postgres } from "../../../../deps.ts";
import { HandlerContext } from "$fresh/server.ts";
// import { parseCookieHeader, toCookieHeader } from "../../../src/Cookies.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

export async function handler(req: Request, ctx: HandlerContext) {
  const db = await pool.connect();
  const url = new URL(req.url);
  const postLength = url.searchParams.has("postLength") ? parseInt(url.searchParams.get("postLength")!) : 50;
  const result = await db.queryObject(`SELECT id, title, SUBSTRING(body, 1, ${postLength}) as body, author FROM post WHERE author=${ctx.params.userid}`).finally(() => db.release());
  return new Response(JSON.stringify(result.rows));
}