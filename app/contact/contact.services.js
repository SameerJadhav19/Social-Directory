import user from "../user/user.model.js";
import profile from "../profile/profile.model.js";
import contactLists from "../contact/contacts.model.js";

export const createContact = async (profileId, contactList) => {
  try {
    const isContactList = await contactLists.findOne({
      userId: contactList.userId,
    });
    const userProfile = await profile.findById(profileId);
    const userDetails = await user.findById(contactList.userId);
    if (isContactList) {
      const newContact = {
        profileId: userProfile._id,
        name: userProfile.name,
        phone: userDetails.phone,
        email: userDetails.email,
      };
      contactList.contacts = [...isContactList.contacts, newContact];
      let flag = false;
      for (let i = 0; i < isContactList.contacts.length; i++) {
        if (profileId === isContactList.contacts[i].profileId.toString()) {
          flag = true;
        }
      }
      if (flag) {
        throw { status: 409, message: "Contact already exists." };
      } else {
        const data = await contactLists.findByIdAndUpdate(
          isContactList._id,
          contactList,
          { new: true }
        );
        return data;
      }
    } else {
      const newContact = {
        profileId: userProfile._id,
        name: userProfile.name,
        phone: userDetails.phone,
        email: userDetails.email,
      };

      contactList.contacts = [newContact];

      const data = await contactLists.create(contactList);
      return data;
    }
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error from service",
    };
  }
};
