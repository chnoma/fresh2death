import { HandlerContext } from "$fresh/server.ts";
import { generateToken, isTokenValid } from "../../src/AuthToken.ts";
import { parseCookieHeader, toCookieHeader } from "../../src/Cookies.ts";
import { Postgres } from "../../deps.ts";

if(!Deno.env.has("POSTGRES_ENDPOINT"))
  throw new Error("POSTGRES_ENDPOINT environment variable not set");

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

const requiredFields = new Set(["username", "password"]);

export async function handler(req: Request, _ctx: HandlerContext) {
  const db = await pool.connect();
  const url = new URL(req.url);
  const cookies = parseCookieHeader(req.headers.get("Cookie"));
  if(cookies.has("token")) 
    if(isTokenValid(cookies.get("token")!))
      return new Response();
  // look up the token in persistent storage
  // if it's still valid, return a 200 with the token
    
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

  if (true) { // login is correct
    const token = generateToken(url.searchParams.get("username")!);
    await db.queryObject(`INSERT INTO tokens (token, username) VALUES ('${token.token}', '${token.username}')`).finally(() => db.release());
    cookies.set("token", token.token);
    return new Response(
      JSON.stringify(token),
      {
        headers: {
          "Set-Cookie": toCookieHeader(cookies),
        },
        status: 200,
      },
    );
  }
  return new Response(`{"error": "Invalid login"}`);
}
