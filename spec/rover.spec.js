const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110)
  });
  //8
  it('response returned by receiveMessage contains name of message', function() {
    let rover = new Rover(100);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('New message', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });
  //9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
  //10
  it("responds correctly to status check command", function() {
    let rover = new Rover(98382)
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Status Message", commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual(response.results);
  });
  //11
  it("responds correctly to mode change command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Mode message', commands);
    let response= rover.receiveMessage(message);
    expect(response.results).toEqual([{ completed: true }]);
  });

//   //12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(110);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 3579)];
    let message = new Message('Move in low power mode', commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{ completed: true}, { completed: false}]);
  });
  //13
  it("responds with position for move command", function() {
    let rover = new Rover(110);
    let command = [new Command('MOVE', 110)];
    let message = new Message('Move this distance', command);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(110);
  });

});
