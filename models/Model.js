var DocumentClient = require("documentdb").DocumentClient;

Models = {};

var endpoint = "https://homebites.documents.azure.com:443/";
var authKey  = "N6VHDQzTjSJoTMXgJQ5PK2G8jynV6z0KSljOkNbqF1Q1vgS8BvZMyoTm9Kib31lx9zJz7uwa33TM26QhnpiGPw==";

Models.client  = new DocumentClient(endpoint, {"masterKey": authKey});


var databaseDefinition = {"id": "homebites"};
var requestDefinition = {"id": "requests"};
var userDefinition = {"id": "users"};

Models.client.createDatabase(databaseDefinition, function(err, database){
  if (err) throw err;
  Models.client.createCollection(database._self, requestDefinition, function(err, requestCollection){
    if (err) throw err;
    Models.requests = requestCollection;
  });
  Models.client.createCollection(database._self, userDefinition, function(err, userCollection){
    if (err) throw err;
      Models.users = userCollection;
  });

  console.log("collections created");

});

module.exports = Models;
