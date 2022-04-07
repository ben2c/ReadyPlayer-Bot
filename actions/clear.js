import { playerArr, playerArrString } from "../main.js";

export const clear = (args, message) => {
  if (args[1] == undefined) {
    if (playerArr.length === 0) {
      message.channel.send(`No queues to clear`)
    }
    else {
      message.channel.send(`All queues cleared`);
      for (let i = 0; i < playerArr.length; i++) {
        playerArrString[i].splice(0, playerArrString[i].length);
        playerArr[i].splice(0, playerArr[i].length);
      }
    }
  }
  else if (args[1] > playerArr.length || !args[1].match(/^\d+$/) || args[1] <= 0) {
    message.channel.send(`Please enter a valid queue`)
  }
  else {
    message.channel.send(`Queue ${args[1]} cleared`);
    playerArrString[args[1] - 1].splice(0, playerArrString[args[1] - 1].length);
    playerArr[args[1] - 1].splice(0, playerArr[args[1] - 1].length);
  }
}