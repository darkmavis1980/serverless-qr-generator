'use strict';

import { generateQR } from '../lib/qr';
import * as QRCode from 'qrcode';

// Mock QRCode module
jest.mock('qrcode', () => ({
  toString: jest.fn(),
}));

describe('generateQR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a QR code with default parameters', async () => {
    // Mock the QRCode.toString response
    const mockQRContent = '<svg>QR content</svg>';
    (QRCode.toString as jest.Mock).mockResolvedValue(mockQRContent);

    // Create mock event
    const event = {
      body: JSON.stringify({
        url: 'https://example.com',
      }),
    };

    // Call the function
    const result = await generateQR(event);

    // Verify QRCode.toString was called with correct parameters
    expect(QRCode.toString).toHaveBeenCalledWith('https://example.com', {
      type: 'svg',
      version: 4,
    });

    // Verify response structure
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: mockQRContent,
    });
  });

  it('should generate a QR code with custom parameters', async () => {
    // Mock the QRCode.toString response
    const mockQRContent = 'UTF8 QR content';
    (QRCode.toString as jest.Mock).mockResolvedValue(mockQRContent);

    // Create mock event with custom parameters
    const event = {
      body: JSON.stringify({
        url: 'https://example.com',
        version: 8,
        type: 'utf8',
      }),
    };

    // Call the function
    const result = await generateQR(event);

    // Verify QRCode.toString was called with correct parameters
    expect(QRCode.toString).toHaveBeenCalledWith('https://example.com', {
      type: 'utf8',
      version: 8,
    });

    // Verify response structure
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: mockQRContent,
    });
  });

  it('should handle terminal output type correctly', async () => {
    // Mock the QRCode.toString response
    const mockQRContent = 'Terminal QR content';
    (QRCode.toString as jest.Mock).mockResolvedValue(mockQRContent);

    // Create mock event
    const event = {
      body: JSON.stringify({
        url: 'https://example.com',
        type: 'terminal',
      }),
    };

    // Call the function
    const result = await generateQR(event);

    // Verify response structure
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: mockQRContent,
    });
  });

  it('should handle errors and return a 500 response', async () => {
    // Mock QRCode.toString to throw an error
    const errorMessage = 'Failed to generate QR code';
    (QRCode.toString as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Create mock event
    const event = {
      body: JSON.stringify({
        url: 'https://example.com',
      }),
    };

    // Call the function
    const result = await generateQR(event);

    // Verify response structure
    expect(result).toEqual({
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: errorMessage,
    });
  });

  it('should handle invalid JSON in request body', async () => {
    // Create mock event with invalid JSON
    const event = {
      body: '{invalid-json',
    };

    // Call the function
    const result = await generateQR(event);

    // Verify response is an error
    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    });
    // Just check that we get an error message string without checking the exact content
    expect(typeof result.body).toBe('string');
    expect(result.body.length).toBeGreaterThan(0);
  });
});