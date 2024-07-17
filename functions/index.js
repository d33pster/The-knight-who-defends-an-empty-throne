import { createLambdaFunction, createProbot } from '@probot/adapter-aws-lambda-serverless';
const app = require('../index.js');

export const handler = createLambdaFunction(app, {
  probot: createProbot(),
});