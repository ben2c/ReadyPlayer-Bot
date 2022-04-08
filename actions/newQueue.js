import { playerArr, playerArrString, gameNameArr, queueSize } from "../main.js";

export const newQueue = (args, message) => {

  let loweredArr = gameNameArr.map(e => {
    return e.toString().toLowerCase();
  })

  if (loweredArr.indexOf(args[1].toString().toLowerCase()) !== -1) {
    message.channel.send(`This game queue already exist`);
  }
  else if (args[1] && args[2] && args[2] > 0 && args[2].match(/^\d+$/)) {
    message.channel.send(`A new queue has been added for ${args[1]} and you have been added to the queue`);
    playerArr.push(['<@' + message.author.id + '>']);
    playerArrString.push([message.author.username]);
    gameNameArr.push([args[1]]);
    queueSize.push([args[2]]);
  }
  else {
    message.channel.send(`Please state a game + proper queue size`);
  }
  if (args[2] == 1 && args[1] && args[2] && args[2] > 0 && args[2].match(/^\d+$/)) {
    message.channel.send(`Get in here ${playerArr[playerArr.length - 1]} It's time to play ${gameNameArr[playerArr.length - 1]}!... by yourself... sad...`);
  }
}