import { User, Role } from '../store/index.js'

export const createRoles = async ()=>{
    try{
        const countRoles = await Role.estimatedDocumentCount()

        if( countRoles > 0){
            return 0
        }else {
            const values = await Promise.all([
                new Role({ name: "user" }).save(),
                new Role({ name: "moderator" }).save(),
                new Role({ name: "admin" }).save(),
            ]);
            console.log(values)
        
        }
    }catch(error){
        console.error(error)
    }
}

export const createAdmin = async () => {
    const user = await User.findOne({ email: "admin@localhost" });
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });
    if (!user) {
        await User.create({
            username: "admin",
            email: "admin@localhost",
            password:  await User.encryptPassword('admin'),
            roles: roles.map((role) => role._id),
        });
        console.log('Admin User Created!')
    }
};