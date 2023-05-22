import { Head } from "$fresh/runtime.ts";
import Post from "../components/Post.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <body class="flex h-screen bg-gray-600">
        <div class="flex flex-col overflow-auto">
            <Post author="You" 
            title="How to style posts" 
            body="A hot dog (commonly spelled hotdog) is a food consisting of a grilled 
            or steamed sausage served in the slit of a partially sliced bun.[4] 
            The term hot dog can refer to the sausage itself. The sausage used is a 
            wiener (Vienna sausage) or a frankfurter (Frankfurter Würstchen, also just called frank). 
            The names of these sausages commonly refer to their assembled dish.[5] Some consider a hot dog 
            to technically be a sandwich. Hot dog preparation and condiments vary worldwide. Typical condiments 
            include mustard, ketchup, relish, onions in tomato sauce, and cheese sauce. Other toppings include 
            sauerkraut, diced onions, jalapeños, chili, grated cheese, coleslaw, bacon, and olives. Hot dog 
            variants include the corn dog and pigs in a blanket. The hot dog's cultural traditions include the 
            Nathan's Hot Dog Eating Contest and the Oscar Mayer Wienermobile. " />
        </div>
      </body>
    </>
  );
}