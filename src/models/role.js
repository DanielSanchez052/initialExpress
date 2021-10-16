import mongoose from 'mongoose'
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default mongoose.model("Role", roleSchema)