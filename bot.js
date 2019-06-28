
//get the discord client
const discord = require('discord.js');

//get the config
global.config = require('./config.json');

//------------------------------------------------------------------------------

//make a connection the the database
const sqlite3 = require('sqlite3');
global.database = new sqlite3.Database('porygon.db');

//------------------------------------------------------------------------------

//import the various commands - these will be accessible with !{propertyname} fron the chat
global.commands = {};
global.commands.help           = require('./commands/help.js');
global.commands.hello          = require('./commands/hello.js');
global.commands.friend         = require('./commands/friend.js');
global.commands.weather        = require('./commands/weather.js');
global.commands.addLocation    = require('./commands/addLocation.js');
global.commands.removeLocation = require('./commands/removeLocation.js');

//------------------------------------------------------------------------------

//
const client = new discord.Client();

//
client.on('ready', () => {
    console.log(`Logged in as "${client.user.tag}".`);
});

//
client.on('message', message => {

    //look for a command - aka a message that starts with a !
    if (message.content.substring(0, 1) == '!') {

        //process the message content into a command and it's arguments
        let [command, ...arguments] = message.content.substring(1).split(' ');
        arguments = arguments.join(' ').split(',').map(value => value.trim());

        //if the command exits - then execute it
        if (global.commands.hasOwnProperty(command)) {
            global.commands[command](client, command, ((arguments == '') ? null : arguments), message);
        } else {
            console.log(`Unknown Command "${command}".`);
        }

    }

});

//
client.login(global.config['discord-bot-token']);