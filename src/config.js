import { config } from "dotenv";
config();

export default {
    MONGODB_URI:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.soqru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    SECRET:"secret_word",
    TOKEN_EXPIRES_IN:240,
    REFRESH_TOKEN_EXPIRES_IN:60

}