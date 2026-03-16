import { Elysia } from "elysia";
import { randomUUID } from "crypto";

const ContextMiddleware = new Elysia({ name: "context-middleware" })
  .derive(({ request }) => {

    const credential = request.headers.get("x-credential");
    const timestamp = request.headers.get("x-timestamp");

    return {
      context: {
        requestId: randomUUID(),
        credential,
        timestamp,
        clientIp: request.headers.get("x-forwarded-for") || "unknown",
        user: null
      }
    };

  });

export default ContextMiddleware;