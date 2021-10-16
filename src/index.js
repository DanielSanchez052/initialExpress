import app from './app.js'
import './database.js'
import {CreateRoles, createAdmin} from './helpers/initialState.js'

CreateRoles()
// createAdmin()

app.listen(app.get("port"), () => {
    console.log("server listening on port ", app.get("port"));
});
