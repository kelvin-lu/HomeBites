var Connection = require('tedious').Connection;

var config = {
    userName: 'jarvis',
    password: 'Hack2019',
    server: 'homeBites.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'homeBites'}
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
 * @param name      the name of the student requesting the food
 * @param location  the location of the student requesting food
 * @param food      the food style requested
 * @return 'DONE' if request input was successful, 'ERR' if not.
 */
RequestController.requestFood = function(req, res, next){
  //Uhh.. This function just calls another function ._.
  //Going to get rid of this layer - function calling takes time on the computer
  //foodToSQL();
  var student    = req.query.name,
      location   = req.query.location,
      food       = req.query.food,

  request = new Request("INSERT SalesLT.Product (Student, Host, Location, Food, TimeReq, TimeServ) OUTPUT INSERTED.ProductID " +
                      "VALUES (@Name, @Location, @Food, CURRENT_TIMESTAMP);", function(err) {
        if (err) {
          console.log(err);
          res.send("ERR");
        }
        res.send("DONE");
      });
      request.addParameter('Name', TYPES.NVarChar, Student);
      request.addParameter('Location', TYPES.NVarChar , location);
      request.addParameter('Food', TYPES.NVarChar, food);
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

RequestController.seeOpenRequests = function(req, res, next){
    request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {
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
