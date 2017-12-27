const telegram = require('./telegram.js');
const sendgrid = require('./sendgrid.js');
const keypress = require('keypress');
const fs = require('fs');
require('dotenv').config();
let chatId;

keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  console.log('got keypress', key);
  if(key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
    console.log('paused');
  } else if(key && key.name === 'v') {
    console.log('geldi');
    process.stdin.pause();
    console.log('paused');
  } else if(key && key.name === 'return' && chatId !== undefined) {
    telegram.sendMessage('Emergency situation, help!', chatId, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(results, undefined, 2));
      }
    });
    console.log('SendMessage called.');
    sendgrid.sendMail();
    console.log('SendMail called.');
  }
});

process.stdin.setRawMode(true);

fs.access('chatId.txt', (err) => {
  if(err) {
    let getUpdateLoop = setInterval(() => {
      telegram.getUpdates((errorMessage, results) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          chatId = results;
          clearInterval(getUpdateLoop);
          fs.writeFile('chatId.txt', chatId, (err) => {
            if (err) throw err;
            console.log('ChatId saved!', chatId);
          });
        }
      });
    }, 5000);
  } else {
    let chatIdBuffer = fs.readFileSync('chatId.txt');
    chatId = chatIdBuffer.toString();
    console.log('ChatId already exists', chatId);
  }
});

console.log('App started...');