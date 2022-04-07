import { playerArrString, gameNameArr, queueSize } from "../main.js";

export const checkAll = (message) => {
  for (let i = 0; i < gameNameArr.length; i++) {
    message.channel.send(`Queue ${i + 1}: ${playerArrString[i]} | Game: ${gameNameArr[i]} | Size: ${queueSize[i]}`);
  }
}