import createApiHandler from "../api-handler";

const handler = createApiHandler(
  "2c56751d7f8642caf84cc64ec583c70087ac5ed90b27ca0005d00ff1be505417",
  (body) => {
    let duration = parseInt(body.duration) || 8;
    duration = Math.min(Math.max(duration, 1), 30)

    return {
      prompt: body.prompt,
      duration,
    };
  }
);

export default handler;
