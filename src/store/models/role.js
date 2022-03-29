import mongoose from 'mongoose'
const Schema = mongoose.Schema

 /**
   * @typedef {object} Role
   * @property {string} name.required
   */

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true

    }
}, {
    versionKey: false
})

export default mongoose.model("Role", roleSchema)