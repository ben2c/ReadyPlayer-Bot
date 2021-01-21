const Discord = require('discord.js');
const bot = new Discord.Client();
let user_id = 0;

//(1) Needed for direct execution from VSC 
//const TOKEN = '';

//(2) Needed for Heroku hosting
bot.login(process.env.TOKEN);

let prefix = '*';
let playerArray1 = [];
let playerArray2 = [];
var teamSpaceAvailable1 = 5;
var teamSpaceAvailable2 = 5;
let gameName1 = ' ';
let gameName2 = ' ';
let playerArrString1 = [];
let playerArrString2 = [];

bot.on('ready', () => {
    console.log('The bot is online!!');
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
    
    //var voiceChannel = message.member.voice.channel;
    var isReady = true;
    if (!message.content.startsWith('*')) return;

    let args= message.content.substring(prefix.length).toLowerCase().split(" ");

    switch(args[0]){
        case 'help':
            message.channel.send('-r(1/2)\n-nr(1/2)\n-game(1/2)\n-clear(1/2)\n-check');
            break;
        case 'game1':
            if (args[1]!=undefined) {
                gameName1 = (args[1]).toUpperCase();
                message.channel.send(`Queue 1 game: ${gameName1}`);
                break;
            }
            else {
                message.channel.send('Please retry with a game. !game1 [Game]');
                break;
            }
        case 'game2':
            if (args[1]!=undefined) {
                gameName2 = (args[1]).toUpperCase();
                message.channel.send(`Queue 2 game: ${gameName2}`);
                break;
            }
            else {
                message.channel.send('Please retry with a game. !game2 [Game]');
                break;
            }
        case 'r1':
            if (playerArray1.indexOf('<@'+ message.author.id +'>') === -1 && teamSpaceAvailable1>0) {
                playerArray1.push('<@'+ message.author.id +'>');
                playerArrString1.push(message.author.username);
                teamSpaceAvailable1--;
                if(teamSpaceAvailable1 >1)
                    message.channel.send(`You\'ve been added to queue 1\nTeam: ${playerArrString1}, missing ${teamSpaceAvailable1} more players`)
                if(teamSpaceAvailable1 === 1)
                    message.channel.send(`You\'ve been added to queue 1\nTeam: ${playerArrString1}, missing ${teamSpaceAvailable1} more player!`)
                if(playerArray1.length === 5)
                    message.channel.send(`HELLOOO ${playerArray1}\nGUESS IT\'S TIME TO PLAY ${gameName1}!??!`);
                break;
            }
            else if (playerArray1.indexOf('<@'+ message.author.id +'>') !== -1) {
                message.channel.send('You\'ve already been added to queue 1');
                break;
            }
            else if (teamSpaceAvailable1 === 0){
                message.channel.send('Queue 1 is full')
                break;
            }
        break;
        case 'r2':
            if (playerArray2.indexOf('<@'+ message.author.id +'>') === -1 && teamSpaceAvailable2>0) {
                playerArray2.push('<@'+ message.author.id +'>');
                playerArrString2.push(message.author.username);
                teamSpaceAvailable2--;
                if(teamSpaceAvailable2 >1)
                    message.channel.send(`You\'ve been added to queue 2\nTeam: ${playerArrString2}, missing ${teamSpaceAvailable2} more players`)
                if(teamSpaceAvailable2 === 1)
                    message.channel.send(`You\'ve been added to queue 2\nTeam: ${playerArrString2}, missing ${teamSpaceAvailable2} more player!`)
                if(playerArray2.length === 5)
                    message.channel.send(`HELLOOO ${playerArray2}\nGUESS IT\'S TIME TO PLAY ${gameName2}!??!`);
                break;
            }
            else if (playerArray2.indexOf('<@'+ message.author.id +'>') !== -1) {
                message.channel.send('You\'ve already been added to queue 2');
                break;
            }
            else if (teamSpaceAvailable2 === 0){
                message.channel.send('Queue 2 is full')
                break;
            }
        break;
        case 'nr1':
            if (playerArray1.indexOf('<@'+ message.author.id +'>') !== -1) {
                let x = playerArray1.indexOf('<@'+ message.author.id +'>');
                playerArray1.splice(x,1)
                playerArrString1.splice(x,1)
                teamSpaceAvailable1++;
                message.channel.send('You\'ve been removed from queue 1')
                break;
            }
                else {
                message.channel.send('You\'re already removed from queue 1');
                break;
            }
        case 'nr2':
            if (playerArray2.indexOf('<@'+ message.author.id +'>') !== -1) {
                let x = playerArray2.indexOf('<@'+ message.author.id +'>');
                playerArray2.splice(x,1)
                playerArrString2.splice(x,1)
                teamSpaceAvailable2++;
                message.channel.send('You\'ve been removed from queue 2')
                break;
            }
                else {
                message.channel.send('You\'re already removed from queue 2');
                break;
            }        
        case 'clear1':
            playerArray1.splice(0, playerArray1.length);
            message.channel.send('Queue 1 cleared');
            teamSpaceAvailable1 = 5;
            gameName1 = '';
            playerArrString1.splice(0, playerArrString1.length);
            break;
        case 'clear2':
            playerArray2.splice(0, playerArray2.length);
            message.channel.send('Queue 2 cleared');
            teamSpaceAvailable2 = 5;
            gameName2 = '';
            playerArrString2.splice(0, playerArrString2.length);
            break;
        case 'check':
            message.channel.send(`Queue 1: ${playerArray1} | Game: ${gameName1}`);
            message.channel.send(`Queue 2: ${playerArray2} | Game: ${gameName2}`);
            break;
        case 'game':
            message.channel.send('Please enter game(1/2) [game]')
            break;
        case 'nr':
            message.channel.send('Please enter nr(1/2)')
            break;
        case 'r':
            message.channel.send('Please enter r(1/2)')
            break;
        case 'clear':
            message.channel.send('Please enter clear(1/2)')
            break;
        case 'leave' :
            voiceChannel.leave();
            break;
        case 'reviveme' :
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
            if (playerArray1.indexOf('<@'+args[1].slice(3,args[1].length-1)+'>') != -1) {
                var y = playerArray1.indexOf('<@'+args[1].slice(3,args[1].length-1)+'>');
                playerArray1.splice(y,1);
                playerArrString1.splice(y,1);
                teamSpaceAvailable1++;
                message.channel.send(`${args[1]} removed`);
                break;
            }
            else {
                console.log(playerArray1)
                message.channel.send('@player not found/no name entered');
                break;
            }
    }
   
})

//(1)for local deployment
//bot.login(TOKEN);

