import { Role } from '../../store/index.js'
import role from '../../store/models/role.js'


export const createRole = async (name) => {
    try {
        const findRole = await Role.exists({name:name})

        if(!name) {
            throw {status: 400, message: "name is required"}
        }

        if (findRole){
            throw {status: 400, message: "Role already exists"}
        }
        
        const newRole = new Role({
            name
        })

        const savedRole = await newRole.save()

        return {
            id: savedRole.id,
            name: savedRole.name
        }

    } catch (error) {
        throw {status: error.status, message: error.message}
    }
}

export const updateRole = async (id,name) => {
    try {
        const findRole = await Role.exists({id})

        if (!findRole){
            throw {status: 400, message: "Role is not exists"}
        }
        
        const updatedRole = await Role.findByIdAndUpdate(id, {name:name})

        return updatedRole

    } catch (error) {
        throw {status: error.status, message: error.message}
    }
}

export const listRoles = async () => {
    try {
        const findRoles = await Role.find({})

        const roles = findRoles.map((e)=>{
            return {
                id: e._id,
                name: e.name
            }           
        })

        return roles
    } catch (error) {
        throw {status: error.status, message: error.message}
    }
}