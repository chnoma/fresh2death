import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { existsSync } from "../deps.ts";

interface AvatarProps {
    user_id: number;
}


export default function Avatar(props: AvatarProps) {
    let x;
    if (existsSync("static/avatars/"+props.user_id+".png")) {
        x = "avatars/"+props.user_id+".png";
    } else {
        x = "avatars/default.png";
    }
    
    return (
        <img
        src={x}
        class="rounded-full border(gray-100 2) hover:bg-gray-200"
        />
    );
}
