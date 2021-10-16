import User from '../models/user.js'
import Token from '../models/token.js'
import config from '../config.js'
import {createUser, generateToken, getToken} from '../helpers/authHelper.js'
import randToken from 'rand-token'

export const signUp = async (req,res)=>{
    try{
        const {username, email, password, roles} = req.body
        const newUser = {
            username:username,
            email:email,
            password: await User.encryptPassword(password),
            roles: roles
        }
        const savedUser = await createUser(newUser)
        if(savedUser.code==1){
    
            res.status(201).json({user : savedUser.user})
            
        }else if (savedUser.code==0){
            res.status(202).json({message:savedUser.message})
        }
    }catch(error){
        console.error(error)
    }
}

export const signIn = async (req,res)=>{
    try{
        const userFound = await User.findOne({ email: req.body.email }).populate("roles")
        if(!userFound){
            return res.status(202).json({message:'El usuario no existe'})
        }else{
            const matchPassword = await User.comparePassword(
                req.body.password,
                userFound.password
            );
            if(!matchPassword){
                return res.status(401).json({
                    token: null,
                    message: "contraseña invalida"
                })
            }else{
                const {token, refreshToken} = await generateToken({id: userFound._id})
                
                res.json({token: token, refreshToken: refreshToken})
            }
        }
    }catch(error){
        console.error(error)
    }
}

export const refresh = async (req, res)=>{
    const {refreshToken} = req.body
    
    try{
        const token = await Token.findOne({refreshToken: refreshToken})
        
        if(!token) return res.status(403).json({message:"Invalid Token"})
        
        const newToken = await generateToken({id: token.user})
        
        res.status(202).json({token: newToken.token, refreshToken:newToken.refreshToken})
    }catch(error){
        console.log(error)
    }

    
}