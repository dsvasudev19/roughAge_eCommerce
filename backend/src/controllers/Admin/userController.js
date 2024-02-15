const {User,Profile}= require('../../models');
const bcrypt = require('bcrypt');

const getUsers= async (req, res) => {
    try {
        const users = await User.findAll({},{
            include: [
                {
                    model: Profile,
                    as: "profile"
                }
            ]

        });
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create({...req.body,password:bcrypt.hashSync(req.body.password, 10)});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            await user.update(req.body);
            return res.json(user);
        } else {
            return res.status(404).json({error: "User not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            await user.destroy();
            res.json({message: "User removed"});
        } else {
            res.status(404).json({error: "User not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};