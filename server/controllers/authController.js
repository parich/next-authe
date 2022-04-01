import User from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {

        const { username, email, password } = req.body

        //validation
        if (!username) return res.status(401).send("Username is required");
        if (!password || password.length < 6) {
            res.status(401).send('Password is required and more 6 character');
        }

        let emailExist = await User.findOne({ email }).exec();
        if (emailExist) {
            return res.status(401).send("Email is taken");
        }

        let userNameExist = await User.findOne({ username }).exec();
        if (userNameExist) {
            return res.status(401).send("username is taken");
        }

        //hash password
        const hashedPassword = await hashPassword(password);

        //register
        const user = await new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        await user.save();
        console.log('Register Success', user)
        return res.json({ message: "Register Success.", user: user })

    } catch (error) {
        console.log(error);
        return res.status(401).send("Error register funtion in authController")
    }
}

export const login = async (req, res) => {
    try {
        //console.log(req.body);
        const { email, password } = req.body;

        //check user 
        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).send('No user found');

        //check password
        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).send('Wrong password');

        //create login
        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        //reture user and token to client , exclude hashed password
        user.password = undefined;
        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            //secure: true, //only words on https
        });

        // send user as json reponse
        res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(401).send("Error login.")
    }
}