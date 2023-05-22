import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface PostProps {
    author: string;
    title: string;
    body: string,
  }

export default function Post(props: PostProps) {
  return (
  <div class="m-2 bg-gray-100 rounded p-5">
    <header>
      <div class="text-3xl"><b>{props.title}</b></div>
      <div class="text-xl">By <a class="font-semibold text-blue-600 dark:text-blue-500 hover:underline" href="">{props.author}</a></div>
      <hr class="mt-4 mb-4"/>
    </header>
    <div>
      {props.body}
    </div>
  </div>
  );
}
