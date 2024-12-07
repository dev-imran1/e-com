import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { mail } from "../utlis/sendmail.js";
import { verificationTemp } from "../mailTemplate/verificationTemp.js";
import { cloudinaryUpload } from "../services/cloudinary.js";
import apiResponse from "../utlis/ApiResponse.js";

const generatToken = async (id) => {
  try {
    const user = await User.findById({ _id: id });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, phoneNumber, role } = req.body;
    const isFound = await User.findOne({ email });
    if (isFound) {
      res.json(new apiResponse(400, "Email already exists", { isFound }));
    }
    let user;
    if (role) {
      user = await User.create({
        displayName,
        email,
        password,
        phoneNumber,
        role,
      });
    } else {
      user = await User.create({
        displayName,
        email,
        password,
        phoneNumber,
        role,
      });
    }
    const link = await user.generateAccessToken();
    await mail(
      user.email,
      "Email Verification",
      "Please verify your email",
      verificationTemp(link)
    );
    return res.json(new apiResponse(200, "user create", { user }));
  } catch (error) {
    console.error("Error creating user:", error);
    return res.json(new apiResponse({ error: error.message }));
  }
};

const emailVerify = async (req, res) => {
  try {
    const { link } = req.params;
    const user = new User();
    const result = await user.AccessTokenVerfiy(link);

    if (result) {
      const { email } = result;
      const userFound = await User.findOne({ email });
      if (userFound) {
        if (userFound.emailVerified) {
          return res.send("allready email verified");
        }
        userFound.emailVerified = Date.now();
        userFound.save();

        return res.send("verifed");
      } else {
        return res.send("invalid");
      }
    } else {
      return res.send("invalid url");
    }
    res.status(200).send("Email verified successfully");
  } catch (error) {
    return res.json(new apiResponse({ error: error.message }));
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
    const userFounds = await User.findOne({ email }).select(
      "displayName password email role"
    );
    console.log(userFounds);
    if (!userFounds) {
      return res.status(404).send("Account Not find");
    }
    const isPasswordCorrect = await userFounds.checkPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid password.");
    }
    // if (!userFounds.emailVerified) {
    //     // return res.send('email not verified')
    //     return res.json(new apiResponse(401, "email not verified",userFounds))
    // }

    const { accessToken, refreshToken } = await generatToken(userFounds._id);

    return res.json(
      new apiResponse(200, "lgin", { userFounds, accessToken, refreshToken })
    );

    // const user = await User.findById({_id:userFounds._id}).select("-password")
    // res.json(new apiResponse(200,'login successfull',{user,accessToken,refreshToken}))
  } catch (error) {
    return res.json(new apiResponse({ error: error.message }));
  }
};

const userUpdate = async (req, res) => {
  try {
    const { path } = req.file;
    const user = await User.findById(req.user._id);
    if (user) {
      console.log("user thkee")
      const result = await cloudinaryUpload(
        path,
        user.displayName,
        "profilePic"
      );
      // console.log(result,"result")
      user.profilePicture = result.uploadResult.url;
      user.public_Id = result.uploadResult.public_id;
      await user.save();
      return res.json({message:"ok",user:user})
      // console.log(user)
      // return res.json(apiResponse(200,"Profile Picture Updated", user))
    } else {
      res.send("wrong file");
    }
  } catch (error) {
    return res.json(new apiResponse({ error: error.message }));
  }
};

// 45 munites

const logOut = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.refreshToken = null;
    await user.save();
    res.json(new apiResponse(200, "logout successfully done"));
  } catch (error) {
    return res.json(new apiResponse({ error: error.message }));
  }
};

const getUser = async (req, res) => {
  const { id } = req.query;
  const user = await User.findById({ _id: id }).select(
    "-password",
    "-refreshToken"
  );
  return res.json(new apiResponse(200, "user details", user));
};

export { createUser, emailVerify, login, userUpdate, logOut, getUser };
