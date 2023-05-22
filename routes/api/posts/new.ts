import { HandlerContext, Handlers } from "$fresh/server.ts";
import { parseCookieHeader } from "../../../src/Cookies.ts";
import { createFromError, createFromMessage } from "../../../src/Errors.ts";
import { writePost } from "../../../src/Postgres/queries/mod.ts";

type ExpectedBody = {
  title: string;
  body: string;
};

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    try {
      const cookies = parseCookieHeader(req.headers.get("cookie"));
      if (!cookies.has("token")) {
        return new Response(createFromMessage("no authenication token"), {
          status: 401,
        });
      }
      const token = cookies.get("token");
      const body: ExpectedBody = await req.json();
      if (!body.title || !body.body) {
        return new Response(createFromMessage("invalid post data"), {
          status: 400,
        });
      }
      const result = await writePost(body.title, body.body, +token!);
      if (result instanceof Error) {
        return new Response(createFromError(result), { status: 400 });
      }
      return new Response(JSON.stringify(result));
    } catch (error) {
      return new Response(createFromError(error), { status: 500 });
    }
  },
};
