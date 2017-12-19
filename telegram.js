const request = require('request');

const baseUrl = 'https://api.telegram.org/bot';
const botApiToken = '405926939:AAG-WEw7x6svDIkxj94z7D_Q6U13nzo09uQ'

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
    url:`${baseUrl}${botApiToken}/getUpdates`,
    json: true
  }, (error, response, body) => {  
    if (error) {
      callback('Unable to connect to Telegram servers.');
    } else if (body.error_code === 404 || body.error_code === 400){
      callback(body.description);
    } else if (body.ok === true && body.results === []) {
      callback('No message found.');
    } else if (body.ok === true) {
      callback(undefined, body.result);
    }
  });

}

module.exports = {
  sendMessage,
  getUpdates
};