
//
const help = function() {
    return `addLocation: Add a location to the weather prediction system.`;
}

//
const action = function(client, command, arguments, message) {

    //check to see if the user using this is allowed
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send('You do not have the necessary permissions "administrator" to configure me.');
        return false;
    }

    //
    global.database.run('INSERT INTO weatherLocation (wl_location) VALUES (?)', arguments[0]);

    //
    message.channel.send('Location added.');

};

//
module.exports = function(client, command, arguments, message) {
    if (command !== 'get-help') {
        return action(client, command, arguments, message);
    } else {
        return help();
    }
};