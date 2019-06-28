
//
const discord = require('discord.js');

//
const help = function() {
    return `friend <code>: Display's a scannable qr code of the supplied friend code`;
}

//
const action = function(client, command, arguments, message) {
    const embed = new discord.RichEmbed();
    embed.setDescription('**' + message.author.username + '** want\'s to be your friend!');
    embed.setColor('#00AE86').setImage('https://chart.googleapis.com/chart?cht=qr&chl=' + encodeURIComponent(arguments.join(' ')) + '&chs=160x160&chld=L|0;')
    message.channel.send({embed});
};

//
module.exports = function(client, command, arguments, message) {
    if (command !== 'get-help') {
        return action(client, command, arguments, message);
    } else {
        return help();
    }
};