const request = require('request');

const baseUrl = 'https://api.telegram.org/bot';
const botApiToken = '483461591:AAGG0iNPgfQyEWJbf6glcuF1yBtyOjSD6ZA'

function sendMessage (message, chatId, callback) {
  
  request({
    url:`${baseUrl}${botApiToken}/sendMessage?chat_id=${chatId}&text=${message}`,
    json: true
  }, (error, response, body) => {
  
    if (error) {
      callback('Unable to connect to Telegram servers.');
    } else if (body.error_code === 404 || body.error_code === 400){
      callback(body.description);
    } else if (body.ok === true) {
      callback(undefined, body.result);
    }
  });

}

function getUpdates (callback) {

  request({
    url:'http://localhost:3000/getUpdates',
    json: true
  }, (error, response, body) => {  
    if (error) {
      callback('Unable to connect servers.');
    } else if (body.result !== undefined) {
      callback(undefined, body.result);
    }
    else if (body !== 'No new message') {
      console.log('ChatId captured...');
      callback(undefined, body);
    }
  });

}

module.exports = {
  sendMessage,
  getUpdates
};