import { User } from "../models/userSchema.js"
import bcrypt from 'bcrypt';


const createUser = async (req, res) => {

    const {displayName,email,password} = req.body;
    const isFound = await User.findOne({ email })
    if (isFound) {
        res.send("email ache")
    }
    const bpass = await bcrypt.hash(password, 10)

    const user = await User.create({displayName,email,password:bpass})

    console.log(user)
}

//29 minutes video 2 nodemailer install and setup, stmp.gmail.com

export { createUser }