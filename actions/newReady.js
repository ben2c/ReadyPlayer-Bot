import { playerArr, playerArrString } from "../main.js";


export const notReady = (args, message) => {
  if (args[1] == undefined) {
    message.channel.send('You\'ve been removed from all queues')
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i].indexOf('<@' + message.author.id + '>') !== -1) {
        let x = playerArr[i].indexOf('<@' + message.author.id + '>');
        playerArr[i].splice(x, 1)
        playerArrString[i].splice(x, 1)
      }
    }
  }
  else if (args[1] > playerArr.length || !args[1].match(/^\d+$/) || args[1] <= 0) {
    message.channel.send(`Please enter a valid queue number`)
  }
  else if (playerArr[args[1] - 1].indexOf('<@' + message.author.id + '>') !== -1) {
    let x = playerArr[args[1] - 1].indexOf('<@' + message.author.id + '>');
    playerArr[args[1] - 1].splice(x, 1)
    playerArrString[args[1] - 1].splice(x, 1)
    message.channel.send(`You\'ve been removed from queue ${args[1]}`)
  }
  else {
    message.channel.send(`You\'re already removed from queue ${args[1]}`);
  }
}