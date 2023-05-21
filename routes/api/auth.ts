import { HandlerContext } from "$fresh/server.ts";

const users = new Map<string, string>([
  ['admin', 'admin']
])

export function handler(req: Request, ctx: HandlerContext) {
  const url = new URL(req.url);
  if(url.searchParams.has('username') || url.searchParams.has('password'))
    return new Response('Missing username or password', { status: 400 });
  if(users.has(url.searchParams.get('username')!) && users.get(url.searchParams.get('username')!) === url.searchParams.get('password'))
    return new Response('Logged in!');
  return new Response('Invalid username or password', { status: 401 });
}