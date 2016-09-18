var Connection = require('tedious').Connection;

var config = {
<<<<<<< HEAD
    userName: '****',
    password: '****',
=======
    userName: 'jarvis',
    password: process.env.hbAzurePW,
>>>>>>> cc1c591901bc804d1259e343c2d52fd00e8a340f
    server: 'homebites.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'homeBites'}
};
var connection = new Connection(config);
connection.on('connect', function(err) {
// If no error, then good to proceed.
    console.log("Connected to Azure DB");
});


RequestController = {};

RequestController.requestFood = function(req, res, next){
    postFoodToSQL(req);
}

RequestController.seeRequests = function(req, res, next){

}


module.exports = RequestController;

/* 

*/
function postFoodToSQL(req) {
    var name = req.query.name;
    var student = req.query.student;
    var host = req.query.host;
    var location = req.query.location;
    var food = req.query.food;
    var time = req.query.time;

    request = new Request("INSERT SalesLT.Product (Name, Student, Host, Location, Food, Time) OUTPUT INSERTED.ProductID " +
                        "VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('Name', TYPES.NVarChar,'SQL Server Express 2014');  
        request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2014');  
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