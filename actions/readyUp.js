import { playerArr, playerArrString, gameNameArr, queueSize } from "../main.js";

export const readyUp = (args, message) => {

  if (playerArr.length === 0) {
    message.channel.send(`No queues avaliable`);
  }

  else if (args[1] === undefined) {
    message.channel.send('You\'ve been added to all queues');
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i].indexOf('<@' + message.author.id + '>') === -1 && playerArr[i].length < queueSize[i]) {
        playerArr[i].push('<@' + message.author.id + '>');
        playerArrString[i].push(message.author.username);
        if (playerArr[i].length == queueSize[i]) {
          message.channel.send(`Get in here ${playerArr[i]} It's time to play ${gameNameArr[i]}!`);
        }
      }
    }
  }

  else if (args[1] > gameNameArr.length || !args[1].match(/^\d+$/) || args[1] <= 0) {
    message.channel.send(`Please enter a valid queue number`)
  }

  else if (playerArr[args[1] - 1].indexOf('<@' + message.author.id + '>') !== -1) {
    message.channel.send(`You're already in this queue`);
  }

  else if (playerArr[args[1] - 1].length == queueSize[args[1] - 1]) {
    message.channel.send(`Queue ${args[1]} is full`)
  }

  else if (args[1] <= playerArr.length) {
    message.channel.send(`You have been added to queue ${args[1]}`);
    playerArr[args[1] - 1].push('<@' + message.author.id + '>');
    playerArrString[args[1] - 1].push(message.author.username);
    if (playerArr[args[1] - 1].length == queueSize[args[1] - 1]) {
      message.channel.send(`Get in here ${playerArr[args[1] - 1]} It's time to play ${gameNameArr[args[1] - 1]}!`);
    }
  }

  else {
    message.channel.send(`Final catch, idk what the fuck you entered, allow me to fix it`);
  }
}