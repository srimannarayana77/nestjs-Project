import * as dotenv from 'dotenv'

dotenv.config()

const MONGODB = {
    dbUrl: process.env.MONGOOSE_URL
}
 
export const configData = {
    db:MONGODB,
    port:process.env.PORT,
    secretKey:process.env.SECRET_KEY
}