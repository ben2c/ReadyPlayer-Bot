import { newQueue } from './actions/newQueue.js';
import { readyUp } from './actions/readyUp.js';
import { notReady } from './actions/notReady.js';
import { check } from './actions/check.js';
import { clear } from './actions/clear.js';
import { deleteQueue } from './actions/delete.js';

import { Client, Intents, DiscordAPIError } from 'discord.js';
import Discord from 'discord.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//const client = new Discord.Client();
const prefix = '?';

//For hosting on Heroku
//client.login(process.env.TOKEN);

let [playerArr, gameNameArr, playerArrString, queueSize] = [[[], []], [["League"], ["Valorant"]], [[], []], [[5], [5]]];

export { playerArr, gameNameArr, playerArrString, queueSize };

client.on('ready', () => {
  console.log('Bot is online!');
})

const help = new Discord.MessageEmbed()
  .setColor('#304281')
  .setTitle('Commands')
  .setURL('https://www.youtube.com/watch?v=oHg5SJYRHA0')
  .addFields(
    { name: 'new [game] [size]', value: 'Create a new queue' },
    { name: 'r [queue #]', value: 'Ready up for a queue' },
    { name: 'r', value: 'Ready up for all available queues' },
    { name: 'nr [queue #]', value: 'Remove yourself from a queue' },
    { name: 'nr', value: 'Remove yourself from all queues' },
    { name: 'clear [queue #]', value: 'Clear a queue' },
    { name: 'clear', value: 'Clear all queues' },
    { name: 'delete [queue #]', value: 'Delete a specific queue' },
    { name: 'delete', value: 'Delete all available queues' },
    { name: 'check [queue #]', value: 'Check a queue' },
    { name: 'check', value: 'Check all queues' },
  );

client.on('message', message => {
  if (!message.content.startsWith('?')) return;

  let args = message.content.substring(prefix.length).toLowerCase().split(" ");

  switch (args[0]) {
    case 'help':
      message.channel.send(help);
      break;
    case 'new':
      newQueue(args, message);
      break;
    case 'nr':
      notReady(args, message);
      break;
    case 'clear':
      clear(args, message);
      break;
    case 'delete':
      deleteQueue(args, message);
      break;
    case 'check':
      check(args, message);
      break;
    case 'r':
      readyUp(args, message);
      break;
  }

})

//for local deployment
client.login('NzU1NTIzOTQ0NDIwODY4MTA2.X2EigQ.vweUTii7GDdNU0-2SOyyZTRxeNY');
