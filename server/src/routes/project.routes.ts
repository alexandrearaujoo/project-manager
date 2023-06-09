import ProjectController from "../controllers/project.controller";
import { Auth } from "../middlewares/auth";
import { projectSchema } from "../schemas/projectSchema";
import { validate } from "../middlewares/schemaValidator";
import { Router } from "express";

const router = Router();
const projectController = new ProjectController();

export const projectRouter = () => {
  router.post(
    "/projects",
    Auth,
    validate(projectSchema),
    projectController.create.bind(projectController)
  );
  router.get(
    "/projects",
    Auth,
    projectController.index.bind(projectController)
  );

  router.get(
    "/projects/:id",
    Auth,
    projectController.show.bind(projectController)
  );

  router.patch(
    "/projects/:id",
    Auth,
    projectController.update.bind(projectController)
  );

  router.delete(
    "/projects/:id",
    Auth,
    projectController.delete.bind(projectController)
  );

  return router;
};
