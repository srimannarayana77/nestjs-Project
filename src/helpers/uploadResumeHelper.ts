import { configData } from 'src/config/appConfig.';
import { S3 } from 'aws-sdk';


export async function  getPreSignedURL(bucketName: string, key: string, contentType: string) {
    const region = configData.awsBucketRegion;
    console.log("region=", region)
    const accessKeyId = configData.awsAccessKeyId;
    console.log("accesskey=", accessKeyId)
    const secretKey = configData.awsSecretAccessKey;
    console.log("secretkey=", secretKey)
    const s3 = new S3({        //creating s3 client for interacting the s3 for uploading files 
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretKey,
    });
    console.log("s3=", s3)
    let params = {       //parameters required for generating a presigned URL
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
      Expires: 3600
    };
    console.log("params=", params)
    return await s3.getSignedUrlPromise('putObject', params);//here putobject is used for upload operation
  }
    

  export async function  getPreSignedURLToViewObject(): Promise<string> {
    const region = configData.awsBucketRegion;
    const accessKeyId = configData.awsAccessKeyId;
    const secretKey = configData.awsSecretAccessKey;
  
    const s3 = new S3({
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretKey
    });
  
    const params = {
      Bucket: "peepul-agri-dev",
      Key: "resumes/resumefile.pdf",
      Expires: 1800
    };
  
    const preSignedURL = await s3.getSignedUrlPromise('getObject', params);
    return preSignedURL;

  }