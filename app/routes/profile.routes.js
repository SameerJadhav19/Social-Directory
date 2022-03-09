import express from 'express';
import * as profileController from "../controllers/profile.contoller.js";
import {userAuth} from "../utilities/middleware.js";

const profileRouter = express.Router();

profileRouter.post('/', userAuth, profileController.createProfile);

profileRouter.get('/', userAuth, profileController.getPeople);

export default profileRouter;