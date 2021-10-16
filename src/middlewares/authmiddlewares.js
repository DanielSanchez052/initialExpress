import jwt from 'jsonwebtoken'
import config from '../config.js'
import User from "../models/user.js";
import Role from "../models/role.js";
import Token from '../models/token.js'

const verifyToken = async (req,res,next) =>{
    let token = req.headers['authorization'].split(" ")[1]
    if(!token) return res.status(403).json({message:"no token provided"})

    try{
        let tokenDecoded = jwt.verify(token,config.SECRET)

        const user = await User.findById(tokenDecoded.id, { password: 0 });
        const findToken = await Token.findOne({user:tokenDecoded.id, token:token})

        if(!user || !findToken ) return res.status(403).json({message:"Invalid Token"})
        
        next()
    }catch (error){
        if(error.name=="TokenExpiredError"){
            res.status(401).json({message:"Token expired", "expiredAt": error.expiredAt})
        }else{
            res.status(401).json({message:error})
        }
    }
    
}

export default verifyToken