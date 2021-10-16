import User from '../models/user.js'
import Role from '../models/role.js'
import Token from '../models/token.js'
import config from '../config.js'
import randToken from 'rand-token'
import jwt from 'jsonwebtoken'

export const createUser = async (user) =>{
    try{
        const findUser = await User.exists({username:user.username,email:user.email})
        let data = {}

        if(!findUser){
            const findRole = await validateRoles(user.roles)
            const newUser = new User({
                username:user.username,
                email:user.email,
                password: user.password,
                roles: findRole
            })
            
            const savedUser = await newUser.save()
            
            data.user={
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                roles: savedUser.roles,
            }
            data.code=1
        }else{
            data.message = "El usuario ya existe"
            data.code = 0
        }
        return data
    }catch(error){
        console.error(error)
    }
}

export const generateToken = async (payload)=>{
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
}

export const getToken = (req) =>{
    let token = req.headers['authorization']
    let data = {}
    if(!token){
        data={message:"no token provided", state:1}
    } else {
        data={token: token.split(" ")[1], state:0}
    }
    return data
}


const validateRoles= async (roles) =>{
    let findRoles=[]
    if(roles){
        const role = await Role.find({name:{$in:roles}})
        findRoles.push(foundRoles.map((role) => role._id))
    }else{
        const role = await Role.findOne({name:"user"})
        findRoles.push(role._id)
    }
    return findRoles
}

