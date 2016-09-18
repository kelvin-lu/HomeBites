var DocumentClient = require("documentdb").DocumentClient;

var endpoint = "https://homebites.documents.azure.com:443/";
var authKey  = "N6VHDQzTjSJoTMXgJQ5PK2G8jynV6z0KSljOkNbqF1Q1vgS8BvZMyoTm9Kib31lx9zJz7uwa33TM26QhnpiGPw==";

var client   = new DocumentClient(endpoint, {"masterKey": authKey});

Models = {};

var databaseDefinition = {"id": "homeBites"};
var requestDefinition = {"id": "requests"};
var userDefinition = {"id": "users"};
var dinnerDefinition = {"id": "dinners"};

client.createDatabase(databaseDefinition, function(err, database){
  if (err) throw err;
  client.createCollection(database._self, requestDefinition, function(err, requestCollection){
    if (err) throw err;
    Models.requests = requestCollection;
  });
  client.createCollection(database._self, userDefinition, function(err, userCollection){
    if (err) throw err;
      Models.users = userCollection;
  });
  client.createCollection(database._self, dinnerDefinition, function(err, dinnerCollection){
    if (err) throw err;
    Models.dinners = dinnerCollection;
  });

  console.log("collections created");

});

module.exports = Models;
