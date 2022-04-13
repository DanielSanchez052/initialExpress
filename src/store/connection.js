import mongoose from 'mongoose'
import config from '../../config.js'

mongoose.connect(config.MONGODB_URI
//     , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// }
)
.then((db) => console.log(`DB is connected`))
.catch((err) => console.log(err));