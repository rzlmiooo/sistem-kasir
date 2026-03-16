import { Elysia } from "elysia";

const blockedAgents = [
  "sqlmap",
  "nikto",
  "nmap"
];

const DetectAttack = new Elysia({ name: "detect-attack" })
  .onBeforeHandle(({ request, set }) => {

    const agent = request.headers.get("user-agent") || "";

    for (const blocked of blockedAgents) {
      if (agent.toLowerCase().includes(blocked)) {

        console.warn("⚠️ Suspicious request detected:", agent);

        set.status = 403;

        return {
          status: "99",
          message: "Forbidden"
        };
      }
    }

  });

export default DetectAttack;