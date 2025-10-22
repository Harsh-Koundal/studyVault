import Profile from "../model/Profile.js";
import User from "../model/User.js";

// GET profile
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        if (!profile) return res.status(404).json({ msg: "Profile not found" });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to fetch profile", error: err.message || err });
    }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        let profile = await Profile.findOne({ userId });
        if (!profile) return res.status(404).json({ msg: "Profile not found" });

        const { fullName, stream, contactNumber, address, about, github } = req.body;

        if (fullName) profile.fullName = fullName;
        if (stream) profile.stream = stream;
        if (contactNumber) profile.contactNumber = contactNumber;
        if (address) profile.address = address;
        if (about) profile.about = about;
        if (github) profile.github = github

        await profile.save();
        res.json({ msg: "Profile updated successfully", profile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to update profile", error: err.message || err });
    }
};

// DELETE profile
export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        if (!profile) return res.status(404).json({ msg: "Profile not found" });

        await Profile.deleteOne({ userId });
        await User.deleteOne({ _id: userId });

        res.json({ msg: "Profile and user deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to delete profile", error: err.message || err });
    }
};
