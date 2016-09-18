var Connection = require('tedious').Connection;
var geo        = require('geolib');

var config = {
    userName: 'jarvis',
    password: 'Hack2019',
    server: 'homeBites.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {
      encrypt: true,
      database: 'homeBites'
      rowCollectionOnRequestCompletion: true;
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    if (err){
      //Stop and throw an error
      throw err;
    }

    // If no error, then good to proceed.
    console.log("Connected to Azure DB");

});

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

RequestController = {};

/*
 * Request a food item for the night. Puts a request in our SQL databases
 * @param id        the ID of the student requesting the food
 * @param location  the location of the student requesting food
 * @param desc      the food style DESCription requested
 * @return 'DONE' if request input was successful, 'ERR' if not.
 */
RequestController.requestFood = function(req, res, next){
  //Uhh.. This function just calls another function ._.
  //Going to get rid of this layer - function calling takes time on the computer
  //foodToSQL();
  var id         = req.query.name,
      location   = req.query.location,
      desc       = req.query.desc;

  request = new Request("INSERT SalesLT.Product (Student, Location, Desc, TimeReq, Offers, Dinner) OUTPUT INSERTED.ProductID " +
                      "VALUES (@Name, @Location, @Desc, CURRENT_TIMESTAMP);", function(err) {
    if (err) {
      console.log(err);
      res.send("ERR");
    }
    res.send("DONE");
  });
  request.addParameter('Name', TYPES.NVarChar, student);
  request.addParameter('Location', TYPES.NVarChar , location);
  request.addParameter('Desc', TYPES.NVarChar, desc);
  request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          console.log('NULL');
        } else {
          console.log("Product id of inserted item is " + column.value);
        }
      });
  });
  connection.execSql(request);
}

/*
 *
 *
 *
 */
 RequestController.seeOpenOffers = function(req, res, next){

 }

/*
 * Opens a dinner for the night.
 * @param name      the name of the host serving the food
 * @param location  the location of the host
 * @param desc      the food style DESCription that will be served
 * @return 'DONE' if request input was successful, 'ERR' if not.
 */
RequestController.openDinner = function(req, res, next){
  var host     = req.query.name,
      location = req.query.location,
      capacity = req.query.capacity,
      food     = req.query.food;

      var student    = req.query.name,
          location   = req.query.location,
          desc       = req.query.desc,

  request = new Request("INSERT SalesLT.Product (Student, Host, Location, Desc, TimeReq, Offers, Dinner) OUTPUT INSERTED.ProductID " +
                      "VALUES (@Name, @Location, @Desc, CURRENT_TIMESTAMP);", function(err) {
    if (err) {
      console.log(err);
      res.send("ERR");
    }
    res.send("DONE");
  });
  request.addParameter('Name', TYPES.NVarChar, student);
  request.addParameter('Location', TYPES.NVarChar , location);
  request.addParameter('Desc', TYPES.NVarChar, desc);
  request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          console.log('NULL');
        } else {
          console.log("Product id of inserted item is " + column.value);
        }
      });
  });
  connection.execSql(request);
}

/*
 * Looks at nearby requests for food.
 * @param location the location of the server
 * @return SQL rows of all open requests within (5 km?)
 *
 */
RequestController.seeOpenRequests = function(req, res, next){
  request = new Request("SELECT * FROM (help Sean) WHERE IsOpen = 1", function(err) {
    if (err) {
      console.log(err);
        res.send("ERR");
      }
    });
    var result = "";
    request.on('row', function(columns) {
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        result+= column.value + " ";
      }
    });
    console.log(result);
    result ="";
  });

  request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
  });
  connection.execSql(request);
}

//It's good habit to have this at the very end
module.exports = RequestController;
