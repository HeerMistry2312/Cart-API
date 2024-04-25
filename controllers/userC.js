const User = require('../models/user')
const jwt = require('jsonwebtoken');
//SignUp
exports.create = async (req, res) => {
    try {

        if (await User.findOne({ userName: req.body.userName })) {
            res.send({ message: 'User already exist' })
            return
        }
        const us = await new User(req.body)

        await us.save();

        res.status(200).send({ message: 'User Registered' })

    } catch (err) {
        res.status(401).send({ message: err })
    }
}

//login
exports.login = async (req, res) => {
    try {
        let us = await User.findOne({ userName: req.body.userName })
        if (!us) {
            res.send({ message: 'User doesnt Exists' })
            return
        }
        if (us.password === req.body.password) {
            const token = jwt.sign({ id: us._id.toString() }, 'Hanuman', { algorithm: 'HS256' });
            res.send({ data: token, message: 'LognIn Successfully!!!' });
            return
        }
        else {
            res.send({ message: "Wrong Credentials!!!" })
            return
        }
    } catch (err) {
        res.status(401).send({ message: err })
    }
}

//remove user
exports.removeUser = async (req, res) => {
    try {
        const Id = req.params.id;

        const result = await User.deleteOne({ _id: Id });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'User not found' })
        }

        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        console.error("Error deleting User:", err);
        res.status(500).send({ message: err.message || 'Error deleting user' });
    }
}

//edit user
exports.editUser = async (req, res) => {
    try {
        const Id = req.params.id;

        const user = await User.findByIdAndUpdate(Id, req.body, { new: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ data: user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}