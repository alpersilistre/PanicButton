const telegram = require('./telegram.js');
const iohook = require('iohook');

iohook.on('keydown', event => {
  console.log(event);

  if(event.keycode === 28) {
    telegram.sendMessage('Emergency situation, help!', (errorMessage, results) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(results, undefined, 2));
      }
    });
  }
});

iohook.start();