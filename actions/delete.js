import { playerArr, playerArrString, gameNameArr, queueSize } from "../main.js";

export const deleteQueue = (args, message) => {
  if (args[1] == undefined) {
    message.channel.send(`All queues deleted`);
    playerArr.splice(0, playerArr.length);
    gameNameArr.splice(0, gameNameArr.length);
    playerArrString.splice(0, playerArrString.length);
    queueSize.splice(0, queueSize.length);
  }
  else if (args[1] > gameNameArr.length || !args[1].match(/^\d+$/) || args[1] <= 0) {
    message.channel.send(`Please enter a valid queue`);
  }
  else {
    message.channel.send(`Queue ${args[1]} deleted`);
    playerArrString.splice(args[1] - 1, 1);
    playerArr.splice(args[1] - 1, 1);
    gameNameArr.splice(args[1] - 1, 1);
    queueSize.splice(args[1] - 1, 1);
  }
}