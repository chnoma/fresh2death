import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";

type Post = {
  id: number;
  title: string;
  body: string;
  author: number;
}

export default function Home({ data }: PageProps<Post[]>) {
  
  return (
    <>
      <Head>
        <title>Post It</title>
      </Head>
      <body class="flex h-screen bg-gray-600">
        {data.map(post => {
          return <p>{JSON.stringify(post)}</p>
        })}
      </body>
    </>
  );
}

export async function handler(req: Request, ctx: HandlerContext) {
  const url = new URL(req.url);
  const posts = await fetch(url.protocol + "//" + url.host + "/api/post").then(res => res.json());
  return ctx.render(posts);
}