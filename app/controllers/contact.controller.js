import * as contactServices from "../services/contact.services.js";
export const createContact = async (req, res) => {
  try {
    const contactList = {
      userId: req.user._id,
    };
    const data = await contactServices.createContact(
      req.params.id,
      contactList
    );
    if (data === "contact already exists") {
      res.status(400).json({ message: "Contact already exists" });
    } else if (data === "error") {
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(201).json({ message: "Contact saved", data: data });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
