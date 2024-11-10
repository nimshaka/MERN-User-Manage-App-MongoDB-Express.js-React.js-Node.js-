const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while fetching users" });
    }

    if (!users) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
};


const addUsers = async (req, res, next) => {
    const { name, gmail, age, address } = req.body;

    let user;

    try {
        user = new User({ name, gmail, age, address });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not added" });
    }

    return res.status(200).json({ user });
};


const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);

    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};


const updateUser = async (req, res, next) => {

    const id = req.params.id;
    const { name, gmail, age, address } = req.body;

    let users;

    try {
        users = await User.findByIdAndUpdate(id,
            { name: name, gmail: gmail, age: age, address: address });

        users = await users.save();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "User not Update" });
    }

    return res.status(200).json({ users });


};


const deleteUser = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(404).json({ message: "User not Delete" });
    }

    return res.status(200).json({ user });


};



exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;