import { checkAll } from "./checkAll.js";
import { playerArr, playerArrString, gameNameArr, queueSize } from "../main.js";

export const check = (args, message) => {
  if (playerArr.length === 0) {
    message.channel.send(`No queues were created yet`)
  }
  else if (args[1] == undefined) {
    checkAll(message);
  }
  else if (args[1] > playerArr.length || !args[1].match(/^\d+$/) || args[1] <= 0) {
    message.channel.send(`Please enter a valid queue`)
  }
  else {
    message.channel.send(`Queue ${args[1]}: ${playerArrString[args[1] - 1]} | Game: ${gameNameArr[args[1] - 1]} | Size: ${queueSize[args[1] - 1]}`);
  }
}