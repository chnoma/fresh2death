// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/auth.ts";
import * as $1 from "./routes/api/posts/[postid].ts";
import * as $2 from "./routes/api/posts/new.ts";
import * as $3 from "./routes/api/users/[userid]/index.ts";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/login.tsx";
import * as $6 from "./routes/post_test.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/PostDrafter.tsx";

const manifest = {
  routes: {
    "./routes/api/auth.ts": $0,
    "./routes/api/posts/[postid].ts": $1,
    "./routes/api/posts/new.ts": $2,
    "./routes/api/users/[userid]/index.ts": $3,
    "./routes/index.tsx": $4,
    "./routes/login.tsx": $5,
    "./routes/post_test.tsx": $6,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/PostDrafter.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
