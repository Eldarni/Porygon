
//
const action = function(client, cmd, args, message) {
	message.reply('Hello');
};

//
const help = function() {
	return 'Replies with  "Hello".';
}

//
module.exports = function(client, command, arguments, message) {
	if (command !== 'help') {
		return action(client, command, arguments, message);
	} else {
		return help();
	}
};


