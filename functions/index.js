const { createLambdaFunction, createProbot } = require('@probot/adapter-aws-lambda-serverless');
const app = require('../app');

module.exports.handler = createLambdaFunction(app, {
  probot: createProbot(),
});