# Serverless function to generate QR codes

This is a simple serverless endpoint to be used to generate QR codes.
The idea is that you deploy your serverless function to a cloud provider and
then you can use the URL of the function to generate QR codes.

> Note: protect this function with a firewall or other security measures, as serverless functions can become very easy to exploit and become extremely expensive very quickly.

## Requiremenents

- Node.js 14+
- Serverless Framework

You will also need an AWS account with right permissions to deploy AWS Lambda function with Cloud Formation and API Gateway.

## Local development

To run the endpoint locally, you will need to install the dependencies and run the following commands:

```bash
# install dependencies
npm install

# run the endpoint
npm run offline
```

## Deployment

### Deploy from local

To deploy the code locally, you will need to run the following commands:

```bash
npm run deploy
```

### Deploy it with Github Actions

There's a Github Action that will deploy the code to AWS Lambda and API Gateway, so you can use it to deploy the code.
You will just need to uncomment the following lines:

```yaml
# ...rest of the code
  steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    # Enable this to deploy to AWS
    - name: serverless deploy
      uses: serverless/github-action@master
      with:
        args: deploy --stage production
```

The last four lines will deploy the code to AWS Lambda and API Gateway.

### How to run it

Once the endpoint is deployed, you should be able to call the following endpoint to generate a QR code:

```bash
POST <Lambda Path>/generate
```

With the following payload:

```json
{
  "url": "https://www.google.com",
  "version": 4
}
```

> Note: the version is optional and defaults to 1, and accepts a range between 1 and 40. For more info please refer to the [node-qrcode official documentation](https://github.com/soldair/node-qrcode#qr-code-capacity).

The output will be a SVG image with the QR code.

### Remove the function

To remove the function, you will need to run the following commands:

```bash
npm run remove-app
```

### AWS Permissions

In order to create the AWS stack with CloudFormation, you will need to either add the profile to the serverless configuration, for example:

```yaml
provider:
  name: aws
  profile: ${env:AWS_PROFILE}
```

Or you can add the AWS credentials adding the ARN with the permissions to deploy to the serverless configuration, for example:

```yaml
provider:
  name: aws
  runtime: nodejs14.x
  iam:
    role: arn:aws:iam::123456789:role/replace-this-with-your-role
```

For more info regarding AWS IAM, please read this [documentation](https://www.serverless.com/framework/docs/providers/aws/guide/iam).

## Test the application

This package uses Jest as a test runner, to run the tests you will need to run the following command:

```bash
npm test
```
