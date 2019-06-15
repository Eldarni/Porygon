
//
const moment  = require('moment');
const discord = require('discord.js');

//
const help = function() {
    return `weather: Display the predicted weather for the next few hours.`;
}

//
const action = function(client, command, arguments, message) {

    const typeIcons = {
        'bug'      : '<:bugtype:589166490931167232>',
        'dark'     : '<:darktype:589166490348158996>',
        'dragon'   : '<:dragontype:589166490586972162>',
        'electric' : '<:electrictype:589166490734034974>',
        'fairy'    : '<:fairytype:589166490989625405>',
        'fighting' : '<:fightingtype:589166490885029946>',
        'fire'     : '<:firetype:589166490671120405>',
        'flying'   : '<:flyingtype:589166490574651440>',
        'ghost'    : '<:ghosttype:589166490993819681>',
        'grass'    : '<:grasstype:589166490826309672>',
        'ground'   : '<:groundtype:589166490775846920>',
        'ice'      : '<:icetype:589166490834698270>',
        'normal'   : '<:normaltype:589166490897481748>',
        'poison'   : '<:poisontype:589166490989625401>',
        'psychic'  : '<:psychictype:589166490490634242>',
        'rock'     : '<:rocktype:589166490842955776>',
        'steel'    : '<:steeltype:589166490993819741>',
        'water'    : '<:watertype:589166490654343170>',
    }

    //
    const getForecastsSQL = 'SELECT wf_forecastDate, wf_weatherType, wf_temperature, wf_rainChance, wb_weatherLabel, wb_boostedTypes FROM weatherForecast INNER JOIN weatherBoost ON wb_weatherType = wf_weatherType WHERE DATETIME(wf_forecastDate) >= DATETIME(?) AND DATETIME(wf_requestDate) = (SELECT MAX(DATETIME(wf_requestDate)) FROM weatherForecast) ORDER BY DATETIME(wf_forecastDate) ASC LIMIT 0, 3';

    //
    global.database.all(getForecastsSQL, moment().format('YYYY-MM-DD HH:mm:ss'), function(error, result) {

        //
        const embed = new discord.RichEmbed();
        embed.setThumbnail('http://smith-net.org.uk/porygon/' + result[0]['wf_weatherType'] + '.png');
        embed.setColor('#00AE86');

        //
        for (let i = 0; i < result.length; i++) {

            let boostedTypes = JSON.parse(result[i]['wb_boostedTypes']).reduce((acc, value) => {
                return acc + ' ' + typeIcons[value];
            }, '');

            var fieldTitle = moment(result[i]['wf_forecastDate']).format('HH:00') + ' (+' + i + ' hours) - ' + result[i]['wb_weatherLabel'];
            var fieldValue = 'Temp: ' + result[i]['wf_temperature'] + '°C - Rain Risk: ' + result[i]['wf_rainChance'] + '% - Boosted types are ' + boostedTypes;
            embed.addField(fieldTitle, fieldValue);
        }

        //
        message.channel.send({embed});

    });

};

//
module.exports = function(client, command, arguments, message) {
    if (command !== 'get-help') {
        return action(client, command, arguments, message);
    } else {
        return help();
    }
};