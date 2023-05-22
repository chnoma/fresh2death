
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { createFromError, createFromMessage } from "../../../src/Errors.ts";
import { getPostByID } from "../../../src/Postgres/queries/mod.ts";
import { PostFields } from "../../../src/Postgres/schema/mod.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);
    if(!ctx.params.postid) return new Response(createFromMessage('postid cannot be undefined'), {status: 400});
    if(isNaN(+ctx.params.postid)) return new Response(createFromMessage('postid must be a number'), {status: 400});
    const fields = url.searchParams.has('fields') ? url.searchParams.get('fields')! : undefined;
    if(fields) for(const field of fields.split(',')) if(!(PostFields as Set<string>).has(field)) return new Response(createFromMessage(`field ${field} is not valid`), {status: 400})
    const post = await getPostByID(+ctx.params.postid, fields as Partial<typeof PostFields>).catch(e => e);
    if(post instanceof Error) return new Response(createFromError(post), {status: 404});
    return new Response(JSON.stringify(post));
  }
}