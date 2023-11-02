import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const apiRouter = new express.Router();
apiRouter.use(authMiddleware);

/* USER API */
apiRouter.get("/api/users/current", userController.get);
apiRouter.patch("/api/users/current", userController.update);
apiRouter.delete("/api/users/logout", userController.logout);

export { apiRouter };
