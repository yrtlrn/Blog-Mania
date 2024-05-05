export const corsConfigs = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELET", "PATCH"],
  credentials: true,
};
