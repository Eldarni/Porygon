
//=============================================================================

//
const databaseFile   = 'porygon.db';
const databaseSchema = './schema/';

//
const fs      = require('fs')
const sqlite3 = require('sqlite3');

//=============================================================================

//open the database, this will also create the file if it's needed
global.database = new sqlite3.Database(databaseFile);

global.database.serialize(function() {

    //create the scheme control table if it does not exist
    global.database.get('SELECT name FROM sqlite_master WHERE type = \'table\' AND name = \'schemaChangeLog\';', function(error, result) {

        //if the schema table is undefined, then create it
        if (typeof result == 'undefined') {
            global.database.run("CREATE TABLE schemaChangeLog (scriptName TEXT, dateApplied TEXT)");
        }

        //=============================================================================

        //time to apply any schema changes to the database
        fs.readdir(databaseSchema, function(error, files) {

        //create the scheme control table if it does not exist
        global.database.all('SELECT scriptName FROM schemaChangeLog;', function(error, result) {

                //extract the script's that have already been applied into a simple column
                let alreadyApplied = [];
                if (typeof result !== 'undefined') {
                    alreadyApplied = result.map(x => x['scriptName']);
                }

                //apply each schema change in order
                files.forEach(function(filename) {

                    //if the script has already been aplied - skip it now
                    if (alreadyApplied.indexOf(filename) !== -1) {
                        console.log('The update script "' + filename + '" has already been applied.');
                        return true;
                    }

                    //
                    console.log('Running the update script "' + filename + '".');

                    //run the schema files, these are js files so feel free to be clever...
                    require(databaseSchema + filename);

                    //log the update into the schema change log table, this will prevent the change from being applied again later
                    global.database.run('INSERT INTO schemaChangeLog (scriptName, dateApplied) VALUES (?, STRFTIME(\'%Y-%m-%dT%H:%M:%S\'))', filename);

                });

            });

        });

        //=============================================================================

    });

});