
// NOTE: this model comes from /u/th0rnleaf
// https://old.reddit.com/r/TheSilphRoad/comments/aks0k7/weather_gone_germany/ef7jnwu/
// https://docs.google.com/spreadsheets/d/1v51qbI1egh6eBTk-NTaRy3Qlx2Y2v9kDYqmvHlmntJE/edit#gid=0


//https://github.com/5310/discord-bot-castform/issues/2
//weather translation based on code used by the castform bot, cosmetic code changes

//
const weatherTypes = ({
    'clear'                : { 'dominant' : 'clear',        'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'cloudy'               : { 'dominant' : 'cloudy',       'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'dreary'               : { 'dominant' : 'cloudy',       'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'flurries'             : { 'dominant' : 'snow',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'fog'                  : { 'dominant' : 'fog',          'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'freezingrain'         : { 'dominant' : 'rain',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'hazymoonlight'        : { 'dominant' : 'cloudy',       'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'hazysunshine'         : { 'dominant' : 'cloudy',       'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'ice'                  : { 'dominant' : 'snow',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'intermittentclouds'   : { 'dominant' : 'partlycloudy', 'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'mostlyclear'          : { 'dominant' : 'clear',        'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'mostlycloudy'         : { 'dominant' : 'cloudy',       'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'mostlycloudywflurries': { 'dominant' : 'cloudy',       'canBeWindy ': false, 'isRainy' : false, 'isSnowy': true  },
    'mostlycloudywshowers' : { 'dominant' : 'cloudy',       'canBeWindy ': false, 'isRainy' : true,  'isSnowy': false },
    'mostlycloudywsnow'    : { 'dominant' : 'cloudy',       'canBeWindy ': false, 'isRainy' : false, 'isSnowy': true  },
    'mostlycloudywtstorms' : { 'dominant' : 'cloudy',       'canBeWindy ': false, 'isRainy' : true,  'isSnowy': false },
    'mostlysunny'          : { 'dominant' : 'sunny',        'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'partlycloudy'         : { 'dominant' : 'partlycloudy', 'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'partlycloudywshowers' : { 'dominant' : 'partlycloudy', 'canBeWindy ': false, 'isRainy' : true,  'isSnowy': false },
    'partlycloudywtstorms' : { 'dominant' : 'partlycloudy', 'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'partlysunny'          : { 'dominant' : 'partlycloudy', 'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'partlysunnywflurries' : { 'dominant' : 'partlycloudy', 'canBeWindy ': false, 'isRainy' : false, 'isSnowy': true  },
    'partlysunnywshowers'  : { 'dominant' : 'partlycloudy', 'canBeWindy ': false, 'isRainy' : true,  'isSnowy': false },
    'partlysunnywtstorms'  : { 'dominant' : 'partlycloudy', 'canBeWindy ': false, 'isRainy' : true,  'isSnowy': false },
    'rain'                 : { 'dominant' : 'rain',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'rainandsnow'          : { 'dominant' : 'snow',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'showers'              : { 'dominant' : 'rain',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'sleet'                : { 'dominant' : 'rain',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'snow'                 : { 'dominant' : 'snow',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'sunny'                : { 'dominant' : 'sunny',        'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
    'thunderstorms'        : { 'dominant' : 'rain',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'tstorms'              : { 'dominant' : 'rain',         'canBeWindy ': false, 'isRainy' : false, 'isSnowy': false },
    'windy'                : { 'dominant' : 'windy',        'canBeWindy ': true,  'isRainy' : false, 'isSnowy': false },
});

//
const thresholds = {
  'dominant':    { 'wind': 24, 'gust': 35 },
  'superficial': { 'wind': 16             },
}

module.exports = (label, wind, gust) => {

    //
    const weather = weatherTypes[label.replace(/[^\w!?]/g, '').toLowerCase()];

    //
    const isWindy = (wind >= thresholds.dominant.wind) || (gust >= thresholds.dominant.gust);

    //calculate the dominant and superficial weather type
    const dominant = ((weather.canBeWindy && isWindy) ? 'windy' : weather.dominant);
    const superficial = { 'rain' : weather.isRainy, 'snow' : weather.isSnowy, 'windy' : (dominant !== 'windy' && (!weather.canBeWindy && (isWindy || wind) >= thresholds.superficial.wind)) }; 

    //
    return {'dominant' : dominant, 'superficial' : superficial};

}