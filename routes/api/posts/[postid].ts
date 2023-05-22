import { HandlerContext, Handlers } from "$fresh/server.ts";
import { createFromError, createFromMessage } from "../../../src/Errors.ts";
import { getPostByID } from "../../../src/Postgres/queries/mod.ts";
import { Post } from "../../../src/Postgres/schema/mod.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);
    if (!ctx.params.postid) {
      return new Response(createFromMessage("postid cannot be undefined"), {
        status: 400,
      });
    }
    if (isNaN(+ctx.params.postid)) {
      return new Response(createFromMessage("postid must be a number"), {
        status: 400,
      });
    }
    const fields = url.searchParams.has("fields")
      ? url.searchParams.get("fields")!.split(",")
      : undefined;
    if (fields) {
      for (const field of fields) {
        if (!(Post.Fields as string[]).includes(field)) {
          return new Response(
            createFromMessage(`field ${field} is not valid`),
            { status: 400 },
          );
        }
      }
    }
    const post = await getPostByID(+ctx.params.postid, fields as Post.Fields)
      .catch((e) => e);
    if (post instanceof Error) {
      return new Response(createFromError(post), { status: 404 });
    }
    return new Response(JSON.stringify(post));
  },
};
