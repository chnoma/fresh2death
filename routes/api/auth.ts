import { HandlerContext } from "$fresh/server.ts";
import { parseCookieHeader } from "../../src/Cookies.ts";
import { Postgres } from "../../deps.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

const requiredFields = new Set(["username", "password"]);

export async function handler(req: Request, _ctx: HandlerContext) {
  const db = await pool.connect();
  const url = new URL(req.url);
  const cookies = parseCookieHeader(req.headers.get("Cookie"));
  // if (cookies.has("token")) {
  //   return Response.redirect(url.protocol + "//" + url.host + "");
  // }

  const missingFields = [];
  for (const field of requiredFields) {
    if (!url.searchParams.has(field)) {
      missingFields.push(field);
    }
  }
  if (missingFields.length > 0) {
    return new Response(
      `{"error": "Missing fields: ${missingFields.join(", ")}"}`,
      {
        status: 400,
      },
    );
  }
  const result = await db.queryObject(
    `SELECT * FROM users WHERE username='${
      url.searchParams.get("username")
    }' AND password='${url.searchParams.get("password")}'`,
  ).finally(() => db.release());
  if (result.rows.length === 0) {
    return Response.redirect(url.protocol + "//" + url.host + "/login?error=1");
  }
  if (result.rows.length > 1) {
    return Response.redirect(url.protocol + "//" + url.host + "/login?error=2");
  }
  if (result.rows.length === 1) {
    const user = (result.rows as {
      id: number;
      username: string;
      password: string;
      displayname: string;
    }[])[0];
    cookies.set("token", user.id.toString());
    
    return Response.redirect(url.protocol + "//" + url.host + "");
  }
  return new Response();
}
