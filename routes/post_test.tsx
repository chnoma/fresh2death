import { Head } from "$fresh/runtime.ts";
import Post from "../components/Post.tsx";
import PostDrafter from "../components/PostDrafter.tsx";

export default function Home(req: Request) {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <body class="flex h-screen bg-gray-600">
        <PostDrafter/>
      </body>
    </>
  );
}