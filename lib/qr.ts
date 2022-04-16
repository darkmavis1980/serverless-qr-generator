'use strict';

import * as QRCode from 'qrcode';
import * as AWS from 'aws-sdk';
import {QRFormBody} from './interfaces/form';

const s3 = new AWS.S3();
const s3Bucket = process.env.S3_BUCKET || '';

export const generate = async (event, context) => {
  try {
    const {
      url,
    } : QRFormBody = JSON.parse(event.body);

    const generated = await QRCode.toString(url, { type: 'svg' });
    // const params: AWS.S3.Types.PutObjectRequest = {
    //   Bucket: s3Bucket,
    //   Key: filename,
    //   Body: generated,
    //   ACL: 'public-read'
    // };
    // const s3Response = await s3.putObject(params).promise();
    // const responseUrl = await s3.getSignedUrl('getObject', { Bucket: process.env.S3_BUCKET, Key: filename });
    // const s3Url = responseUrl.split('?')[0];
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
      body: generated
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ message: 'Something went wrong.' })
    };
    return response;
  }
};