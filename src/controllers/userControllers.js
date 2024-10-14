import { User } from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import { mail } from "../utlis/sendmail.js";
import { verificationTemp } from "../mailTemplate/verificationTemp.js";
import { cloudinaryUpload } from "../services/cloudinary.js";
import ApiResponse from "../utlis/ApiResponse.js";

const generatToken = async (id) => {
    try {
        const user = await User.findById({ _id: id })
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefToken()
        user.refreshToken = refreshToken
        await user.save()
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error)
    }
}



const createUser = async (req, res) => {
    try {
        const { displayName, email, password, phoneNumber } = req.body;

        // Check if email already exists
        const isFound = await User.findOne({ email });
        if (isFound) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password before saving


        // Create the user with the hashed password
        const user = await User.create({
            displayName,
            email,
            password,
            phoneNumber
        });

        // Generate verification link (assuming generateAccessToken is a method on the user schema)
        const link = await user.generateAccessToken()  // Ensure this function is implemented in your User model
        // console.log('Generated Verification Link:', link);

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
            if (userFound) {
                if (userFound.emailVerified) {
                    return res.send("allready email verified")
                }
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



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that both email and password are provided
        if (!email || !password) {
            return res.status(400).send("Both email and password are required.");
        }

        // Find the user by email
        const userFounds = await User.findOne({ email }).select("password");

        if (!userFounds) {
            return res.status(400).send("Account Not find");
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await userFounds.checkPassword(password)
        console.log('ispassword', isPasswordCorrect)

        if (!isPasswordCorrect) {
            return res.status(400).send("Invalid email or password.");
        }
        // if (!userFounds.emailVerified) {
        //     return res.send('email not verified')
        // }

        // Generate tokens (assumes a function generatToken exists)
        const { accessToken, refreshToken } = await generatToken(userFounds._id);

        // Send the tokens in the response
        // return res.status(200).send({ accessToken, refreshToken });
        return res.json(new ApiResponse(200,"login Sucessfull",{
            accessToken,refreshToken
        }
    ))
        // return res.json(new ApiResponse().apiLoginRes())
    } catch (error) {
        console.log("Login error", error);
        return res.status(500).send("Internal server error.");
    }
};


const userUpdate = async (req, res) => {
    try {
        const { path } = req.file
        const user = await User.findById(req.user.id)
        if (user) {
            const result = await cloudinaryUpload(path, user.displayName, 'profilePic')
            user.profilePic = result.optimizeUrl
            user.public_id = result.uploadResult.public_id
            await user.save()
            res.send("okay")
        } else {
            res.send('wrong file')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const logOut = async(req,res)=>{
try {
        const user = await User.findById(req.user.id)
        user.refreshToken = null
        await user.save()
        return res.send('logout done')
} catch (error) {
    console.log(error)
}
}


export { createUser, emailVerify, login, userUpdate ,logOut};
