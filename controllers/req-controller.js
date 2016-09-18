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
// If no error, then good to proceed.
    if (err){
      throw err;
    }
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
 */
RequestController.requestFood = function(req, res, next){
  //Uhh.. This function just calls another function ._.
  //Going to get rid of this layer - function calling takes time on the computer
  var student    = req.query.name,
      location   = req.query.location,
      food       = req.query.food,
      timeReq    = Date.now();

  request = new Request("INSERT SalesLT.Product (Student, Host, Location, Food, TimeReq, TimeServ) OUTPUT INSERTED.ProductID " +
                      "VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function(err) {
       if (err) {
          console.log(err);}
      });
      request.addParameter('Name', TYPES.NVarChar, student);
      request.addParameter('Number', TYPES.NVarChar , location);
      request.addParameter('Cost', TYPES.Int, 11);
      request.addParameter('Price', TYPES.Int,11);
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

RequestController.seeRequests = function(req, res, next){

}


module.exports = RequestController;

/*

*/
function postFoodToSQL(req) {

}

function getFoodFromSQL() {
    request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {
    if (err) {
        console.log(err);}
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
