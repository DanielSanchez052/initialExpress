import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tokenSchema = new Schema({
    user:{ref:'User', type: Schema.Types.ObjectId},
    token: String,
    refreshToken: String,
    refreshExpiredAt: {type: Date, default: ()=>{
        const now = new Date(Date.now())
        now.setMinutes(now.getMinutes()+30)
        return now
    } }
},{
    // timestamps: { refreshCreatedAt: 'createdAt' },
    versionKey: false
}) 

export default mongoose.model("Token", tokenSchema)