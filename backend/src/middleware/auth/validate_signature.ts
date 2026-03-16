import { Elysia } from "elysia";
import crypto from "crypto";

const SECRET = process.env.API_SECRET || "supersecret";

const ValidateSignature = new Elysia({ name: "validate-signature" })
  .onBeforeHandle(async ({ request, set }) => {

    const signature = request.headers.get("x-signature");
    const timestamp = request.headers.get("x-timestamp");
    const credential = request.headers.get("x-credential");

    if (!signature) {
      set.status = 401;
      return {
        status: "99",
        message: "X-Signature header required"
      };
    }

    const method = request.method;
    const url = new URL(request.url);
    const path = url.pathname;

    const body = await request.text();

    const payload = `${method}:${path}:${timestamp}:${body}:${credential}`;

    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      set.status = 401;
      return {
        status: "99",
        message: "Invalid signature"
      };
    }

  });

export default ValidateSignature;