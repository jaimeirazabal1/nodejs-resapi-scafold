import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async ( req, res, next) => {

    try {
        const token = req.headers["x-access-token"];
        console.log(token)

        if(!token) return res.status(403).json({message:"No token provided"})

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        // console.log(decoded)

        const user = await User.findById(req.userId)

        if(!user) return res.status(404).json({message:'No user found'})

        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message:'Unauthorize'});
    }
}

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id:{$in:user.roles}})

        const moderator = roles.filter( role => role.name == 'moderator')
        if(moderator.length){
            next();
        }else{
            return res.status(401).json({message:'No tiene los roles suficientes'});
        }
    } catch (error) {
        console.log(error.message)

        return res.status(401).json({message:'No tiene los roles suficientes'});
        
    }
    
}
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id:{$in:user.roles}})

        const moderator = roles.filter( role => role.name == 'admin')
        if(moderator.length){
            next();
        }else{
            return res.status(401).json({message:'No tiene los roles suficientes'});
        }
    } catch (error) {
        console.log(error.message)

        return res.status(401).json({message:'No tiene los roles suficientes'});
        
    }
}