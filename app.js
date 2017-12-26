const telegram = require('./telegram.js');
const keypress = require('keypress');
const fs = require('fs');
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
  }
});

process.stdin.setRawMode(true);

let getUpdateLoop = setInterval(() => {
  telegram.getUpdates((errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      chatId = results;
      clearInterval(getUpdateLoop);
      // fs.writeFile('chatId.txt', lyrics, (err) => {
      //   if (err) throw err;
      //   console.log('ChatId saved!');
      // });
    }
  });
}, 5000);

console.log('App started...');

