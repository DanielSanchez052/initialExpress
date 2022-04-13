import { generateToken, validateRoles} from './auth.helpers.js'
import { User, Token } from '../../store/index.js'

export const signUp = async (user) =>{
    try{
        const findUser = await User.exists({username:user.username,email:user.email})

        if(findUser){
            throw {status: 400, message: "User already exists"}
        }

        if(!user.username, !user.email, !user.password){
            throw {status: 400, message: "All fields are required"}
        }

        const findRole = await validateRoles(user.roles)
            const newUser = new User({
                username:user.username,
                email:user.email,
                password: await User.encryptPassword(user.password),
                roles: findRole
            })
            
            let savedUser = await newUser.save()

            savedUser = await savedUser.populate('roles')

            return {
                username: savedUser.username,
                email: savedUser.email,
                roles: [...savedUser.roles.map((r) => r.name)],
            }

    }catch(error){
        throw {status:error.status, message: error.message}
    }
}

export const signIn = async (email, password)=>{
    try{
        const userFound = await User.findOne({ email: email }).populate("roles")

        if(!userFound){
            throw {status: 401, message: "email or password is invalid"}
        }else{
            const matchPassword = await User.comparePassword(
                password,
                userFound.password
            );
            if(!matchPassword){
                throw{status: 401, message: "email or password is invalid"}
            }else{
                const {token, refreshToken} = await generateToken({id: userFound._id})

                return {token: token, refreshToken: refreshToken}
            }
        }
    }catch(error){
        throw {status:error.status, message: error.message}
    }
}

export const refresh = async (refreshToken)=>{   
    try{
        if(!refreshToken) throw {status: 403, message: "No token provided"}

        const token = await Token.findOne({refreshToken: refreshToken})
        
        if(!token) throw {status: 403, message: "Invalid token"} 
        
        const newToken = await generateToken({id: token.user})
        
        return {token: newToken.token, refreshToken: newToken.refreshToken}
    }catch(error){

        throw {status: error.status, message: error.message} 
    }

    
}