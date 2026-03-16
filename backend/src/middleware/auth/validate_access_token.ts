import { Elysia } from "elysia";

const ValidateAccessToken = new Elysia({ name: "validate-access-token" })
  .onBeforeHandle(({ request, set }) => {

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      set.status = 401;
      return {
        status: "99",
        message: "Authorization header required"
      };
    }

    if (!authHeader.startsWith("Bearer ")) {
      set.status = 401;
      return {
        status: "99",
        message: "Invalid authorization format"
      };
    }

  });

export default ValidateAccessToken;