const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('response', (name) => {
  console.log('data recieved', name);
});

customEmitter.on('response', (name) => {
  console.log('wassup', name);
});

customEmitter.emit('response', 'J.Cole');
