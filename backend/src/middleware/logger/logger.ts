import { Elysia } from "elysia";

const Logger = new Elysia({ name: "logger" })

  .onRequest(({ request }) => {
    const url = new URL(request.url);

    console.log(`➡️  ${request.method} ${url.pathname}`);
  })

  .onAfterHandle(({ request, set }) => {
    const url = new URL(request.url);

    console.log(`✅ ${request.method} ${url.pathname} ${set.status ?? 200}`);
  })

  .onError(({ request, error }) => {
    const url = new URL(request.url);

    const message = error instanceof Error ? error.message : String(error);

    console.error(`❌ ${request.method} ${url.pathname}`, message);
  });

export default Logger;