
//
const help = function() {
    return `
    hello: Says "hello" back to the user`;
}

//
const action = function(client, cmd, args, message) {
	message.reply('Hello');
};

//
module.exports = function(client, command, arguments, message) {
	if (command !== 'get-help') {
		return action(client, command, arguments, message);
	} else {
		return help();
	}
};