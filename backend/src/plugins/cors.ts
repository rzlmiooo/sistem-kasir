import { Elysia } from "elysia";
import cors from "@elysiajs/cors";

const allowedOrigins = [
  process.env.ORIGIN
];

const CorsPlugin = new Elysia().use(
  cors({
    origin: (request) => {
      const origin = request.headers.get("origin");

      if (!origin) return true;

      return allowedOrigins.includes(origin);
    },
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Timestamp",
      "X-Signature",
      "X-Credential"
    ]
  })
);

export default CorsPlugin;