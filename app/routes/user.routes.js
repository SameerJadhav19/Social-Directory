import express from 'express';
import * as userController from "../controllers/user.controller.js";
const router = express.Router();

//routes for registering user
router.post("/register", userController.register);

//routes for login
router.post("/login", userController.login);
export default router;