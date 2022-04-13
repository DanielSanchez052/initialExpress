import app from './app.js'
import './store/connection.js'
//import {createRoles, createAdmin} from './helpers/initialState.js'

//createRoles()
//createAdmin()

app.listen(app.get("port"), () => {
    console.log("server listening on port ", app.get("port"));
})
