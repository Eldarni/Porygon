
//
const help = function() {
    return `
    help: Displays a list of available commands
    help <command>: Displays detailed help for a specfic command`;
}

//
const action = function(client, command, arguments, message) {

    if (arguments == null) {
        message.reply('Available commands: ' + Object.keys(global.commands).join(', ')  );
    } else {
        if (global.commands.hasOwnProperty(arguments[0])) {
            message.reply(global.commands[arguments[0]](client, 'get-help'));
        }
    }

};

//
module.exports = function(client, command, arguments, message) {
    if (command !== 'get-help') {
        return action(client, command, arguments, message);
    } else {
        return help();
    }
};