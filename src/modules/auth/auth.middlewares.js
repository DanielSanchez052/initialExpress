import jwt from 'jsonwebtoken'

import config from '../../../config.js'

import { User, Token } from '../../store/index.js'
import { getToken } from './auth.helpers.js'
import response from '../../network/response.js'

const verifyToken = async (req,res,next) =>{
    try{
        const token = getToken(req)

        const tokenDecoded = jwt.verify(token,config.SECRET)

        const user = await User.findById(tokenDecoded.id, { password: 0 });
        const findToken = await Token.findOne({user:tokenDecoded.id, token:token})

        if(!user || !findToken ) return response.error(req, res, 401, "Invalid Token")
        
        next()
    }catch (error){
        if(error.name=="TokenExpiredError") return response.error(req, res, 401, `Token expired at ${error.expiredAt}`)
        if(error.name == 'JsonWebTokenError') return response.error(req, res, 401, error.message)
    
        return response.error(req, res, error.status, error.message)        
    }
    
}

export default verifyToken