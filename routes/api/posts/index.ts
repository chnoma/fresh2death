
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { createFromError, createFromMessage } from "../../../src/Errors.ts";
import { getPostByID, getRecentPosts } from "../../../src/Postgres/queries/mod.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);
    const count = url.searchParams.has('count') ? +url.searchParams.get('count')! : 10;
    const post = await getRecentPosts(+ctx.params.postid, count).catch(e => e);
    if(post instanceof Error) return new Response(createFromError(post), {status: 404});
    return new Response(JSON.stringify(post));
  }
}