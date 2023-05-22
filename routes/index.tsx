import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import Post from "../components/Post.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <body class="flex h-screen bg-gray-600">
        <div class="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
          <header>
            <img class="w-20 mx-auto mb-5" src="https://avatars.githubusercontent.com/u/85920821?v=4"/>
          </header>
          <form action="/api/auth">
            <div>
            <label class="block mb-w text-orange-500" for="username">Username</label>
              <input class="w-full p-2 mb-6 text-orange-800 border-b-2 border-orange-950 outline-none focus:bg-gray-300" 
                      type="text"
                      name="username" />
            </div>
            <div>
              <label class="block mb-w text-orange-500" for="password">Password</label>
              <input class="w-full p-2 mb-6 text-orange-800 border-b-2 border-orange-950 outline-none focus:bg-gray-300" 
                      type="password"
                      name="password" />
            </div>
            <div>
              <input class="w-full bg-gray-900 hover:bg-pink-600 text-white efont-bold py-2 px-4 mb-6 rounded" type="submit"/>
            </div>
          </form>
        </div>
    </body>
    </>
  );
}