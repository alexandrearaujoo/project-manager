import { Express } from "express";
import { userRouter } from "./user.routes";
import { projectRouter } from "./project.routes";

export const appRoutes = (app: Express) => {
  app.use("/api", userRouter());
  app.use("/api", projectRouter());
};
