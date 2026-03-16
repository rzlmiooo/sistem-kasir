import { Elysia } from "elysia";

const ValidateCredential = new Elysia({ name: "validate-credential" })
  .onBeforeHandle(({ request, set }) => {

    const credential = request.headers.get("x-credential");

    if (!credential) {
      set.status = 401;
      return {
        status: "99",
        message: "X-Credential header required"
      };
    }

    if (credential.length < 10) {
      set.status = 401;
      return {
        status: "99",
        message: "Invalid credential"
      };
    }

  });

export default ValidateCredential;