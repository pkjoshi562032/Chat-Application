//
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = async(req, res) =>{
  try{
    const {username, email, password, confirmPassword, gender} = req.body


    let validUser

    validUser = await User.findOne({email})

    if(validUser){
      return res.status(400).json({
        success: false,
        message: "Useer alreeady exist"
      })
    }
    if(password != confirmPassword){
      return res.status(400).json({
        error: "Password does not match"
      })
    }

    const hashedPassword = bcryptjs.hashSync(password, 2)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic : gender === "male" ? boyProfilePic : girlProfilePic
    })

    
      // generate jwt token

      const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET)

      await newUser.save()

      res.cookie("access_token", token, {httpOnly : true}).status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })


    }
    catch(error){
      console.log("Error" + error)
      res.status(500).json({
        error: "Internal Server error"
      })
    }

 }

export const login = (req, res) =>{
  
}

export const logout = (req, res) =>{
  
}