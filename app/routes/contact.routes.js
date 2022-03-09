import express from 'express';
import {userAuth} from "../utilities/middleware.js";
import * as contactController from "../controllers/contact.controller.js"

const contactRouter = express.Router();

contactRouter.post("/:id", userAuth, contactController.createContact)

export default contactRouter;