import { Elysia } from "elysia";

const SecureHeader = new Elysia({ name: "secure-header" })
  .onBeforeHandle(({ request, set }) => {

    const credential = request.headers.get("x-credential");
    const signature = request.headers.get("x-signature");

    if (!credential) {
      set.status = 401;
      return {
        status: "99",
        message: "X-Credential header required"
      };
    }

    if (!signature) {
      set.status = 401;
      return {
        status: "99",
        message: "X-Signature header required"
      };
    }

  });

export default SecureHeader;