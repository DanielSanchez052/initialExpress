import { config } from "dotenv";
config();

export default {
    MONGODB_URI:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j34sb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    SECRET:process.env.SECRET_KEY,
    PORT: process.env.PORT || 8000,
    TOKEN_EXPIRES_IN:240,
    REFRESH_TOKEN_EXPIRES_IN:60

}