import { Token, Role } from '../../store/index.js'
import config from '../../../config.js'
import randToken from 'rand-token'
import jwt from 'jsonwebtoken'

export const generateToken = async (payload)=>{
    try {
        const token= jwt.sign(
            payload,
            config.SECRET, 
            {expiresIn: config.TOKEN_EXPIRES_IN}) 
    
        const refreshToken = randToken.uid(128)
        const findToken = await Token.findOne({user:payload.id})
    
        if (!findToken){
            const saveToken = new Token({
                user: payload.id,
                token: token,
                refreshToken: refreshToken
            })
            await saveToken.save()
        }else{
            const now = new Date(Date.now())
            now.setMinutes(now.getMinutes()+30)
            await Token.updateOne({user:payload.id},{token: token,refreshToken: refreshToken, refreshExpiredAt: now })
        }  
    
        return { token: token,refreshToken: refreshToken }
    } catch (error) {

        throw {status: error.status, message: error.message}
    }
}

export const getToken = (req) =>{
    try {
        let token = req.headers['authorization']

        if(!token) throw {status: 401, message:"no token provided"}

        return token.split(" ")[1]

    } catch (error) {

        throw {status: error.status, message: error.message}
    }
}

export const validateRoles= async (roles) =>{
    let findRoles=[]
    if(roles){
        const foundRoles = await Role.find({name:{$in:roles}})
        findRoles.push(foundRoles.map((role) => role._id))
    }else{
        const role = await Role.findOne({name:"user"})
        findRoles.push(role._id)
    }
    return findRoles
}

