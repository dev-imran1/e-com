import { User } from "../models/userSchema.js"
import bcrypt from 'bcrypt';
import { mail } from "../utlis/sendmail.js";



const createUser = async (req, res) => {
    try {
                const { displayName, email, password, phoneNumber } = req.body;
        
                // Check if email already exists
                const isFound = await User.findOne({ email });
                if (isFound) {
                    return res.status(400).send("Email already exists");
                }
        
                // Hash the password
                const bpass = await bcrypt.hash(password, 10);
        
                // Create the user
                const user = await User.create({ displayName, email, password: bpass, phoneNumber });
        
                // Send confirmation email
                await mail();
        
                // Send response
                res.status(201).send(user);
                
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send("Internal Server Error");
            }
    
}

//29 minutes video 2 nodemailer install and setup, stmp.gmail.com

export { createUser }





// import { User } from "../models/userSchema.js";
// import bcrypt from 'bcrypt';
// import { mail } from "../utils/sendmail.js";

// const createUser = async (req, res) => {
//     try {
//         const { displayName, email, password, phoneNumber } = req.body;

//         // Check if email already exists
//         const isFound = await User.findOne({ email });
//         if (isFound) {
//             return res.status(400).send("Email already exists");
//         }

//         // Hash the password
//         const bpass = await bcrypt.hash(password, 10);

//         // Create the user
//         const user = await User.create({ displayName, email, password: bpass, phoneNumber });

//         // Send confirmation email
//         await mail();

//         // Send response
//         res.status(201).send(user);
        
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

// export { createUser };
