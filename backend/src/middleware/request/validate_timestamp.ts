import { Elysia } from "elysia";

const MAX_TIME_DIFF = 5 * 60 * 1000;

const ValidateTimestamp = new Elysia({ name: "validate-timestamp" })
  .onBeforeHandle(({ request, set }) => {

    const timestamp = request.headers.get("x-timestamp");

    if (!timestamp) {
      set.status = 400;
      return {
        status: "99",
        message: "X-Timestamp header required"
      };
    }

    const requestTime = Number(timestamp);
    const now = Date.now();

    if (isNaN(requestTime)) {
      set.status = 400;
      return {
        status: "99",
        message: "Invalid timestamp format"
      };
    }

    const diff = Math.abs(now - requestTime);

    if (diff > MAX_TIME_DIFF) {
      set.status = 401;
      return {
        status: "99",
        message: "Timestamp expired"
      };
    }
  });

export default ValidateTimestamp;