global.database.serialize(function() {

    global.database.run(`
        CREATE TABLE "weatherLocation" (
            "weatherLocationID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "wl_name"           TEXT,
            "wl_location"       TEXT,
            "wl_token"          TEXT,
            "wl_requested"      TEXT
        )
    `);

    global.database.run(`
        CREATE TABLE "weatherForecast" (
            "weatherForecastID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "wf_requestDate"    TEXT,
            "wf_forecastDate"   TEXT,
            "wf_location"       INTEGER,
            "wf_weatherType"    TEXT,
            "wf_temperature"    TEXT,
            "wf_rainChance"     TEXT
        )
    `);

    global.database.run(`
        CREATE TABLE "weatherRequest" (
            "weatherRequestID" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            "wr_requestDate"   TEXT,
            "wr_forecastDate"  TEXT,
            "wr_location"      TEXT,
            "wr_response"      TEXT
        )
    `);


    global.database.run(`
        CREATE TABLE "weatherBoost" (
            "weatherBoostID"  INTEGER PRIMARY KEY AUTOINCREMENT,
            "wb_weatherType"  TEXT,
            "wb_weatherLabel" TEXT,
            "wb_boostedTypes" TEXT
        )
    `);

    //
    const populateWeatherBoostTable = global.database.prepare('INSERT INTO weatherBoost (wb_weatherType, wb_weatherLabel, wb_boostedTypes) VALUES (?, ?, ?)');

    populateWeatherBoostTable.run('clear', 'Clear', '["fire","ground","grass"]');
    populateWeatherBoostTable.run('sunny', 'Sunny', '["fire","ground","grass"]');
    populateWeatherBoostTable.run('rainy', 'Rainy', '["water","bug","electric"]');
    populateWeatherBoostTable.run('cloudy', 'Cloudy', '["fairy","fighting","poison"]');
    populateWeatherBoostTable.run('partlycloudy', 'Partly Cloudy', '["normal","rock"]');
    populateWeatherBoostTable.run('windy', 'Windy', '["flying","psychic","dragon"]');
    populateWeatherBoostTable.run('snow', 'Snow', '["ice","steel"]');
    populateWeatherBoostTable.run('fog', 'Fog', '["dark","ghost"]');


});