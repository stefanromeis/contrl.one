var mysql = require('mysql');
var config = require('./config');

exports.createDbConnection = function() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: config.mysqlSecret,
        database: 'contrlone'
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        //console.log('connected as id ' + connection.threadId);
    });

    return connection;
}