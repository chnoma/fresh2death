
export default function PostDrafter() {
    return (
        <div class="w-full max-w-md m-auto bg-gray-100 rounded p-5">
            <form action="/api/post" method="post">
                    <label class="block mb-w text-orange-500" for="title">Title</label>
                    <input class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" 
                            type="text"
                            name="title" />
                    <div>
                        <label class="block mb-w text-orange-500" for="body">Body</label>
                        <textarea id="body" rows={4} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." name="body"></textarea>
                    </div>
                    <hr class="mt-4 mb-4"/>
                    <div>
                        <input class="w-full bg-gray-900 hover:bg-pink-600 text-white efont-bold py-2 px-4 mb-6 rounded" type="submit" value="Post"/>
                    </div>
            </form>
        </div>
    )
}