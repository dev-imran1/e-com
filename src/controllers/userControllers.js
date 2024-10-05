import { User } from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import { mail } from "../utlis/sendmail.js";
import { verificationTemp } from "../mailTemplate/verificationTemp.js";

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, phoneNumber } = req.body;

        // Check if email already exists
        const isFound = await User.findOne({ email });
        if (isFound) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await User.create({
            displayName,
            email,
            password: hashedPassword,
            phoneNumber
        });

        // Generate verification link (assuming generateAccessToken is a method on the user schema)
        const link = await user.generateAccessToken()  // Ensure this function is implemented in your User model
        console.log('Generated Verification Link:', link);

        // Send confirmation email with the link
        await mail(user.email, 'Email Verification', 'Please verify your email', verificationTemp(link));

        // Send response
        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Assuming you have an email verification controller (this needs to be implemented)
const emailVerify = async (req, res) => {
    try {
        const { link } = req.params
        const user = new User()
        const result = await user.AccessTokenVerfiy(link)

        if (result) {
            const { email } = result
            const userFound = await User.findOne({ email })
            console.log(userFound.emailVerified)

            if (userFound) {
                userFound.emailVerified = Date.now()
                 userFound.save()
                return res.send("verifed")
            } else {
                return res.send("invalid")
            }
        } else {
            return res.send("invalid url")
        }
        res.status(200).send('Email verified successfully');
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).send("Internal Server Error");
    }
};

export { createUser, emailVerify };
