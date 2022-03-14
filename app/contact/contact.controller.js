import { logger } from "../../logger/logger.js";
import * as contactServices from "./contact.services.js";
export const createContact = async (req, res) => {
  try {
    const contactList = {
      userId: req.user._id,
    };
    const data = await contactServices.createContact(
      req.params.id,
      contactList
    );
    res.status(201).json({ message: "Contact saved", data: data });
  } catch (error) {
    logger.error(error);
    res.status(error.status || 500).json({
      success: false,
      error,
      message: error.message || "Error occured in controller",
    });
  }
};
