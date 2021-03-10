//Connecting to AWS 
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

//Creating AWS services
const ssm = new AWS.SSM({ apiVersion: '2014-11-06' });


module.exports = { ssm };