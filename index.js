/* Notes:
console.log(message)

*/
const Discord = require('discord.js');
const bot = new Discord.Client();
let user_id = 0;
const TOKEN = 'NzU1NTIzOTQ0NDIwODY4MTA2.X2EigQ.kJ0Q3RDN2JmKA8I2xrhlBXICiRQ';
//bot.login(process.env.TOKEN);

let playerArray = [];
var teamSpaceAvailable = 5;
const prefix = '!';
let gameName = ' ';
let playerArrString = [];

bot.on('ready', () => {
    console.log('The bot is online!');
    var isReady = true;       
    })

/*    bot.on('message', message =>{
        var voiceChannel = message.member.voice.channel;
        voiceChannel.join().then(connection =>'755531025375035396').catch(err => console.log(err));
        const dispatcher = connection.play('./Documents/jettRevive.mp3');
        dispatcher.on("end", end => '755531025375035396');
        voiceChannel.leave();});    
*/

/*bot.on("ready", () => {
    const channel = bot.channels.cache.get("389588830316920833");
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        console.log("Successfully connected.");
    }).catch(e => {
        console.error(e);
    });
    //const dispatcher = connection.play('./Documents/jettRevive.mp3');
   // dispatcher.on("end", end => '755531025375035396');
    //voiceChannel.leave();
});
*/

bot.on('message', message => {
    
    var voiceChannel = message.member.voice.channel;
    var isReady = true;
    if (!message.content.startsWith('!')) return;

    let args= message.content.substring(prefix.length).toLowerCase().split(" ");

    switch(args[0]){
        case 'help':
            message.channel.send('-r\n-nr\n-game\n-clear\n-check');
            break;
        case 'game':
            if (args[1]!=undefined) {
                gameName = (args[1]).toUpperCase();
                message.channel.send(`GUESS WE\'RE PLAYING ${gameName}`);
                break;
            }
            else {
                message.channel.send('Please retry with a game. !game [Game]');
                break;
            }
        case 'r':
            if (playerArray.indexOf('<@'+ message.author.id +'>') === -1 && teamSpaceAvailable<6) {
                playerArray.push('<@'+ message.author.id +'>');
                playerArrString.push(message.author.username);
                teamSpaceAvailable--;
                if(teamSpaceAvailable >1)
                    message.channel.send(`You\'ve been added to the queue\nTeam: ${playerArrString}, missing ${teamSpaceAvailable} more players`)
                if(teamSpaceAvailable === 1)
                    message.channel.send(`You\'ve been added to the queue\nTeam: ${playerArrString}, missing ${teamSpaceAvailable} more player!`)
                if(playerArray.length === 5)
                    message.channel.send(`${playerArray}\nGUESS IT\'S TIME TO PLAY ${gameName}!??!`);
                        
                break;
            }
            else {
                message.channel.send('You\'ve already been added to the queue');
                break;
            }
        case 'nr':
            if (playerArray.indexOf('<@'+ message.author.id +'>') != -1) {
                let x = playerArray.indexOf('<@'+ message.author.id +'>');
                playerArray.splice(x)
                playerArrString.splice(x)
                teamSpaceAvailable++;
                message.channel.send('You\'ve been removed from the queue')
                if(playerArray.length === 0)
                     message.channel.send(`No one on team so far, missing ${teamSpaceAvailable} more players`);
                else
                    message.channel.send(`Team: ${playerArrString} so far, missing ${teamSpaceAvailable} more players`);
                break;
            }
                else {
                message.channel.send('You\'re already removed from the queue');
                break;
            }
        case 'clear':
            playerArray.splice(0, playerArray.length);
            message.channel.send('Team cleared');
            teamSpaceAvailable = 5;
            gameName = '';
            playerArrString.splice(0, playerArrString.length);
            break;
        case 'check':
            message.channel.send(`Team: ${playerArray} | Game: ${gameName}`);
            break;
        case 'leave' :
            voiceChannel.leave();
            break;
        case 'join' :
            if (isReady && message.content === '!join') {
                const channel = bot.channels.cache.get("389588830316920833");
            if (!channel) return console.error("The channel does not exist!");
                channel.join().then(connection => {
                console.log("Successfully connected.");
                    }).catch(e => {
                console.error(e);
                });
                isReady = false;
                break;
            }
        case 'remove' :
            if (playerArray.indexOf('<@'+args[1].slice(3,args[1].length-1)+'>') != -1) {
                var y = playerArray.indexOf('<@'+args[1].slice(3,args[1].length-1)+'>');
                playerArray.splice(y);
                playerArrString.splice(y);
                teamSpaceAvailable++;
                message.channel.send(`${args[1]} removed`);
                break;
            }
            else {
                console.log(playerArray)
                message.channel.send('@player not found/no name entered');
                break;
            }
        /*case 'add':
            if (playerArray.indexOf('<@'+args[1].slice(3,args[1].length-1)+'>') === -1) {
                playerArray.push('<@'+args[1].slice(3,args[1].length-1)+'>');
                playerArrString.push(('<@'+args[1].slice(3,args[1].length-1)+'>'))
                console.log(('<@'+args[1].slice(3,args[1].length-1)+'>'))
                teamSpaceAvailable--;
                message.channel.send(`${args[1]} added`);
                break;
            }
            else {
                console.log(playerArray)
                message.channel.send('@player not found/no name entered');
                break;
            }*/
    }
   
})


bot.login(TOKEN);

