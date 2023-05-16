import { playerArr, playerArrString, gameNameArr, queueSize } from "../main.js";

const hasValidArgs = (args) => args.reduce((isValid, arg) => {
  const num = parseInt(arg);
  return isValid && !(num === NaN || num <= 0 || num > gameNameArr.length);
}, true);

const readyForGame = (gameIndex, sendMessage, message) => {
  if (playerArr[gameIndex].indexOf('<@' + message.author.id + '>') !== -1) {
    sendMessage && message.channel.send(`You're already in this queue`);
  } else if (playerArr[gameIndex].length == queueSize[gameIndex]) {
    sendMessage && message.channel.send(`Queue ${gameIndex + 1} is full`);
  } else if (gameIndex < playerArr.length) {
    playerArr[gameIndex].push('<@' + message.author.id + '>');
    playerArrString[gameIndex].push(message.author.username);
    if (playerArr[gameIndex].length == queueSize[gameIndex]) {
      message.channel.send(`Get in here ${playerArr[gameIndex]} It's time to play ${gameNameArr[gameIndex]}!`);
    } else {
      sendMessage && message.channel.send(`Queue for ${gameNameArr[gameIndex]}: ${playerArrString[gameIndex]} | Missing ${queueSize[gameIndex] - playerArr[gameIndex].length} more!`);
    }
  } else {
    sendMessage && message.channel.send(`Final catch, idk what the fuck you entered, allow me to fix it`);
  }
};

export const readyUp = (args, message) => {
  const addToAllQueues = args.length <= 1;
  const postArgs = args.slice(1);
  if (playerArr.length === 0) {
    message.channel.send(`No queues avaliable`);
  } else if (!addToAllQueues && !hasValidArgs(postArgs)) {
    message.channel.send(`Please enter valid queue numbers`);
  } else {
    if (addToAllQueues) {
      message.channel.send('You\'ve been added to all queues');
    }
    const games = addToAllQueues
      ? Array.from(Array(playerArr.length).keys()) 
      : postArgs.map(i => i - 1);
    games.forEach((gameIndex) => {
      readyForGame(gameIndex, !addToAllQueues, message);
    });
  }
}
