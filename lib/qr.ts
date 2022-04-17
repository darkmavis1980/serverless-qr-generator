'use strict';

import * as QRCode from 'qrcode';
import {QRFormBody} from './interfaces/form';

const origins = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
}

export const generateQR = async (event) => {
  try {
    const {
      url,
    } : QRFormBody = JSON.parse(event.body);

    const generated = await QRCode.toString(url, { type: 'svg' });
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        ...origins,
      },
      body: generated
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      headers: {
        ...origins,
      },
      body: JSON.stringify({ message: 'Something went wrong.' })
    };
    return response;
  }
};