import user from "../models/user.model.js";
import profile from "../models/profile.model.js";
export const userProfile = async (userId, body) => {
  try {
    const isUser = await user.findOne({ _id: userId });
    if (!isUser) {
      return "no user";
    } else {
      const hasProfile = await profile.findOne({ userId: userId });
      if (hasProfile) {
        return "profile exists";
      } else {
        const newProfile = {
          userId: userId,
          name: body.name,
          dateOfBirth: body.dateOfBirth,
          location: body.location,
          interests: body.interests,
        };
        const data = await profile.create(newProfile);
        return data;
      }
    }
  } catch (err) {
    return "cannot save profile";
  }
};

export const getPeople = async (body) => {
  try {
    const search = await profile.find({
      $or: [{ interests: { $regex: body.interests, $options: "i" } }],
    });
    if (search.length === 0) {
      return "missing";
    } else {
      return search;
    }
  } catch (err) {
    return "error";
  }
};
