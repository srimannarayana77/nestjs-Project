import * as dotenv from 'dotenv'

dotenv.config()

const MONGODB = {
    dbUrl: process.env.MONGOOSE_URL
}
 
export const configData = {
    db:MONGODB,
    port:process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    awsBucket: process.env.AWS_S3_BUCKET,
    awsCompressedBucket: process.env.AWS_S3_COMPRESSED_BUCKET,
    awsAccessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    awsBucketRegion: process.env.AWS_S3_BUCKET_REGION,
    sendInBlue: process.env.SIB_API_KEY,
    sibEmail:process.env.SIB_EMAIL
}
