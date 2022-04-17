'use strict';

import * as QRCode from 'qrcode';
import {QRFormBody} from './interfaces/form';
const QR_VERSION = 2; // QR version, range 2-40

const origins = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
}

export const generateQR = async (event) => {
  try {
    const {
      url,
      version = QR_VERSION
    } : QRFormBody = JSON.parse(event.body);

    const generated = await QRCode.toString(url, { type: 'svg', version });
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