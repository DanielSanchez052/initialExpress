import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * @typedef {object} Token
 * @property {Auth} user.required
 * @property {string} token.required  
 * @property {string} refreshToken.required
 * @property {string} refreshExpiredAt 
 */

const tokenSchema = new Schema({
    user:{ref:'User', type: Schema.Types.ObjectId},
    token: {
        type: String,
        unique: true,
        required: true

    },
    refreshToken: {
        type: String,
        unique: true,
        required: true

    },
    refreshExpiredAt: {type: Date, default: ()=>{
        const now = new Date(Date.now())
        now.setMinutes(now.getMinutes()+30)
        return now
    } }
},{
    versionKey: false
}) 

export default mongoose.model("Token", tokenSchema)