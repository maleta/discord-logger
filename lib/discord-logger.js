// discord-logger.js
const request = require('request');

function Hook(options) {
  var webhook = {};
  var defaults = {
    endpoint: '',
    botUsername: '',
    infoPrefix: ':information_source:',
    errorPrefix: ':sos:',
    successPrefix: ':white_check_mark:'
  }

  if (!options.endpoint || !options.botUsername){
    throw new Error(`Field ${defaults.endpoint ? 'botUsername' : 'endpoint'} is mandatory and cannot be empty.`);
  }

  defaults.endpoint = `${options.endpoint}/slack`;
  defaults.botUsername = options.botUsername;

  if (options.defaultInfoEmoji) {
    defaults.infoPrefix = options.infoPrefix;
  }
  if (options.defaultErrorEmoji) {
    defaults.errorPrefix = options.errorPrefix;
  }
  if (options.defaultSuccessEmoji) {
    defaults.successPrefix = options.successPrefix;
  }

  // check if hook is valid
  request(options.endpoint, (error, response, body) => {
    if(error) {
      console.error(`\n\n\n Could not get webhook info: ${error.stack} \n\n\n`);
    }
    try {
      hookInfo = JSON.parse(body);
      webhook.token = hookInfo.token;
      webhook.id = hookInfo.id;
      webhook.name = hookInfo.name;
    } catch(error) {
      console.error(`\n\n\nCould not use provided hook. Stacktrace: ${error.stack} \n\n\n`);
    }
  });

  var sendMessage = function(message) {
    try {
      request({
        url: defaults.endpoint,
        method: 'POST',
        body: {
          username: defaults.botUsername,
          text: message
        },
        json:true
      }, (error, response, body) => {
        if (error) {
          console.error(`\n\n\nCould not log following message to Discord: ${message}\nError stack trace: ${error.stack}\n\n\n`);
        }
      });
    } 
    catch (error) {
      console.error(`\n\n\nCould not log following message to Discord: ${message}\nError stack trace: ${error.stack}\n\n\n`);
    }
  }

  this.info = function (message) {
    sendMessage(`${defaults.infoPrefix} ${message}`);
  };
  this.error = function (message) {
    sendMessage(`${defaults.errorPrefix} ${message}`);
  };
  this.success = function (message) {
    sendMessage(`${defaults.successPrefix} ${message}`);
  };
}

module.exports = Hook;
