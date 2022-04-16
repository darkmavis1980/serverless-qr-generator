# Serverless function to generate QR codes

This is a simple serverless endpoint to be used to generate QR codes

## Requiremenents

- Node.js 14+
- Serverless Framework

You will also need an AWS account with right permissions to deploy AWS Lambda function with Cloud Formation and API Gateway.

## Local development

To run the endpoint locally, you will need to install the dependencies and run the following commands:

```bash
npm run offline
```

## Deploy from local

To deploy the code locally, you will need to run the following commands:

```bash
npm run deploy:prod
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

## Useful

- [https://stackoverflow.com/questions/58059840/how-to-correctly-return-binary-file-image-from-lambda-through-api-gateway](https://stackoverflow.com/questions/58059840/how-to-correctly-return-binary-file-image-from-lambda-through-api-gateway)
- [https://dev.to/foqc/uploading-images-to-aws-s3-with-serverless-1ae0](https://dev.to/foqc/uploading-images-to-aws-s3-with-serverless-1ae0)