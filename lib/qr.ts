'use strict';

import * as QRCode from 'qrcode';
import {QRFormBody} from './interfaces/form';
const QR_VERSION = 2; // QR version, range 2-40
const DEFAULT_TYPE = 'svg';

const origins = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
}

const mimes = {
  svg: 'image/svg+xml',
  terminal: 'text/plain',
  utf8: 'text/plain',
}

export const generateQR = async (event) => {
  try {
    const {
      url,
      version = QR_VERSION,
      type = DEFAULT_TYPE,
    } : QRFormBody = JSON.parse(event.body);

    const generated = await QRCode.toString(url, { type, version });
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': mimes[type],
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