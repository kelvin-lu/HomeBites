var Connection = require('tedious').Connection;

var config = {
    userName: 'jarvis',
    password: process.env.hbAzurePW,
    server: 'homebites.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'AdventureWorks'}
};
var connection = new Connection(config);
connection.on('connect', function(err) {
// If no error, then good to proceed.
    console.log("Connected to Azure DB");
});


RequestController = {};

RequestController.requestFood = function(req, res, next){
  
}

RequestController.seeRequests = function(req, res, next){

}


module.exports = RequestController;
