import express from "express";
const router = express.Router();

import userRoute from "./user.routes.js";
import profileRoute from "./profile.routes.js";
import contactRoute from "./contact.routes.js"
const routes = () => {
  // define a route
  router.get("/", (req, res) => {
    res.json({ message: "Welcome." });
  });
  router.use("/user", userRoute);
  router.use("/user-profile", profileRoute);
  router.use("/contact", contactRoute);
  return router;
};
export default routes;
