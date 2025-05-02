import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1', // Change based on your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

export const rekognition = new AWS.Rekognition();
