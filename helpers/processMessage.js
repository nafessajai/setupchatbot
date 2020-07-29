const API_AI_TOKEN = '	56e4c23e50f90463bb5b368e875ef361f3c2e49d';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAIXjimsNRsBAPLSgobIPaLMmhgGZCuncJebF9xBwis5uo77LNhFOZAlo9KZCjmsZCjNtFJT3nkEJ5vaBE3LVQYKZCuvhxxAFDqIucVyrPzcXEw3o3Xh0zigi65tG5goJSP8aBeLkiSz0oY2yNMAZC7mZCYZAvSVokhcoO2qfkgbqo7mvcvGyGDE';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
        recipient: { id: senderId },
        message: { text },
        }
    });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'factchecker'}); 
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};