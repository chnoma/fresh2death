import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface PostProps {
    author: string;
    title: string;
    body: string,
  }

export default function Post(props: PostProps) {
  return (
    <div>
        <h3>{props.title}</h3>
        <h1>By {props.author}</h1>
        {props.body}
    </div>
  );
}
