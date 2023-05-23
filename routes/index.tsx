import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import Post from "../components/Post.tsx";
import PostDrafter from "../islands/PostDrafter.tsx";
import Sidebar from "../islands/Sidebar.tsx";

type PostType = {
  id: number;
  title: string;
  body: string;
  display_name: string;
  user_id: number;
};

export default function Home({ data }: PageProps<PostType[]>) {
  // TODO(chnoma): Add postdrafter only if token exists
  return (
    <>
      <Head>
        <title>Post It</title>
      </Head>
      <Sidebar/>
      <body class="flex ml-64 bg-gray-600">
        <div class="flex w-full flex-col overflow-auto">
          {data.map((post) => {
            return (
              <Post
                author={post.display_name.toString()}
                title={post.title}
                body={post.body + "..."}
                user_id={post.user_id}
              />
            );
          })}
        </div>
        {/* <PostDrafter /> */} 
      </body>
    </>
  );
}

export async function handler(req: Request, ctx: HandlerContext) {
  const url = new URL(req.url);
  const posts = await fetch(url.protocol + "//" + url.host + "/api/posts").then(
    (res) => res.json(),
  );
  return ctx.render(posts);
}
