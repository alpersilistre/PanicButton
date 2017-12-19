const telegram = require('./telegram.js');
const keypress = require('keypress');
let chatId;

keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  console.log('got keypress', key);
  if(key && key.ctrl && key.name === 'c') {
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
      chatId = results[0].message.chat.id;
      clearInterval(getUpdateLoop);
      console.log('Chat Id saved...');
    }
  });
}, 5000);

console.log('App started...');