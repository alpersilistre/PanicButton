const telegram = require('./telegram.js');
const keypress = require('keypress');

keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  console.log('got keypress', key);
  if(key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
    console.log('paused');
  } else if(key && key.name === 'return') {
    telegram.sendMessage('Emergency situation, help!', (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(results, undefined, 2));
      }
    });
  }
});

process.stdin.setRawMode(true);