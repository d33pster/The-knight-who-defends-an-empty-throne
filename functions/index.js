import { createLambdaFunction, createProbot } from '@probot/adapter-aws-lambda-serverless';
const app = require('../index');

export const handler = createLambdaFunction(app, {
  probot: createProbot(),
});