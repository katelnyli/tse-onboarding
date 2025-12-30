import express from "express";
import * as UsersController from "src/controllers/users";

const router = express.Router();

router.get("/", UsersController.getAllUsers);

export default router;
