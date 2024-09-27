import { User } from "../models/userSchema.js"

const createUser = async (req,res)=>{
    
    const {email} = req.body
    const isFound = await User.findOne({email})
    if (isFound) {
        res.send("email ache")
    }
    res.send("okay create email")
}

export {createUser}