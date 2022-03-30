import User from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/auth";

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

export const login = (req, res) => {
    return ({});
}