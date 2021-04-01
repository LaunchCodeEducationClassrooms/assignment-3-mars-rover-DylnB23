const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = position;
    if (!position) {
      throw Error("Starting position required.");
    }
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let response = {
      message: message.name,
      results: []
    }

    let command = message.commands;

    let roverStatus = {
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position
    }
    for (let i = 0; i < command.length; i++){
      if (command[i].commandType === 'STATUS_CHECK'){
        response.results.push({completed: true, roverStatus});
      } else if (message.commands[i].commandType === 'MODE_CHANGE'){
        roverStatus.mode = command[i].value;
          response.results.push({ completed: true})
      } else if (command[i].commandType === 'MOVE'){
        if (roverStatus.mode === 'LOW_POWER'){
          response.results.push({ completed: false})
        } else if (roverStatus.mode === 'NORMAL'){
          roverStatus.position = command[i].value;
          response.results.push({ completed: true})
        }
      }
    }
    return response;
  }
}


module.exports = Rover;