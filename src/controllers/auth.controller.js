import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config";

export const signup = async (req,res) => {
    try {
        const {username,email,password,roles} = req.body;
        const newUser = new User({
            username,
            email,
            password:await User.encryptPassword(password)
        })

        // console.log(newUser);
        
        if(roles){
            const foundRoles = await Role.find({name:{ $in : roles}});
            newUser.roles = foundRoles.map(role=>role._id);
        }else{
            const role = await Role.findOne({name:"user"})
            console.log(role)
            newUser.roles = [role._id];
        }

        // console.log(newUser)
        // return
        const userCreated = await newUser.save();
        const token = jwt.sign({id:userCreated._id},config.SECRET,{
            expiresIn:86400 //24 hrs
        })

        res.status(200).json({token})

    } catch (error) {
        res.status(500).json(error.message);
    }

}
export const signin = async (req,res) => {
    const userFound = await User.findOne({email:req.body.email})
    .populate('roles');
    console.log(userFound)

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if(!matchPassword){
        return res.status(401).json({token:null,message:'Invalid password'})
    }
    if(!userFound){
        return res.status(400).json({message:'User not found'})
    }

    const token = jwt.sign({id:userFound._id},config.SECRET,{
        expiresIn:86400 //24 hrs
    })

    res.json({token});
}