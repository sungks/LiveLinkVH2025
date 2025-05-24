const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID; // from Twilio Verify

const client = twilio(accountSid, authToken);

module.exports = { client, serviceSid };
