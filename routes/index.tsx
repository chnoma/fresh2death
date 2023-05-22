import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import Post from "../components/Post.tsx";

type Post = {
  id: number;
  title: string;
  body: string;
  display_name: number;
}

export default function Home({ data }: PageProps<Post[]>) {
  
  return (
    <>
      <Head>
        <title>Post It</title>
      </Head>
      <body class="flex bg-gray-600">
        <div class="flex flex-col overflow-auto">
          {data.map(post => {
            return <Post author={post.display_name.toString()} title={post.title} body={post.body+'...'} />
          })}
        </div>
      </body>
    </>
  );
}

export async function handler(req: Request, ctx: HandlerContext) {
  const url = new URL(req.url);
  const posts = await fetch(url.protocol + "//" + url.host + "/api/post").then(res => res.json());
  return ctx.render(posts);
}