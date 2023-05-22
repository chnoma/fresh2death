import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Avatar from "./Avatar.tsx";

interface PostProps {
  author: string;
  title: string;
  body: string;
  user_id: number;
}

export default function Post(props: PostProps) {
  return (
  <div class="m-2 bg-gray-100 rounded p-5">
    <header class="flex flex-row">
      <div class="w-16 mr-4">
        <Avatar user_id={props.user_id}/>
      </div>
      <div class="flex-none">
        <div class="text-3xl"><b>{props.title}</b></div>
        <div class="text-xl">By <a class="font-semibold text-blue-600 dark:text-blue-500 hover:underline" href="">{props.author}</a></div>
      </div>
    </header>
    <hr class="mt-4 mb-4"/>
    <div>
      {props.body}
    </div>

  </div>
  );
}
