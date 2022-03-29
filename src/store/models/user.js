import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

/**
 * @typedef {object} Auth
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {array<Role>} roles
 */


const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true

    },
    password:{
        type: String,
        required: true
    }, 
    roles:[{
        ref:"Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: { createdAt: 'createdAt', updatedAt:'updatedAt' },
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model("User", userSchema)