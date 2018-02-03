# discord logger v1.0.0


## Dependency

 * [`request`](https://www.npmjs.com/package/request) library for sending requests

## Installation

Using npm:
```shell
$ npm install discord-logger
```

## How to use

In Node.js:
```js
const DiscordLogger = require('discord-logger');
const options = {
  endpoint: process.env.DISCORD_WEBHOOK,
  botUsername: 'my app logger'
  infoPrefix: :information_source: // optional, default value is :information_source:,
  successPrefix: :white_check_mark: // optional, default value is :white_check_mark:,
  errorPrefix: :sos: // optional, default value is :sos:
}

const logger = new DiscordLogger(options);

// Send message to discord channel associated with provided hook
logger.info('This is regular info message.');
logger.success('Another message, but very successful this time.');
logger.error('Oops! Something is wrong!');

```

Output:
![](images/example.png)


## Author

maleta

## Licence

MIT
