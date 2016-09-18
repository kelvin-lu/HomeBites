var Models = require('../models/Model.js')

RequestController = {};

/*
 * Request a food item for the night. Puts a request in our SQL databases
 * @param id        the ID of the student requesting the food
 * @param location  the location of the student requesting food
 * @param desc      the food style DESCription requested
 * @param cost      the maximum price willing to be paid
 * @param time      the maximum time willing to wait for food
 * @return 'DONE' if request input was successful.
 */
RequestController.requestFood = function(req, res, next){
  var id         = req.query.id,
      location   = req.query.location,
      desc       = req.query.desc,
      dist       = req.query.dist,
      max_time   = req.query.time,
      cost       = req.query.cost;

  var request = {
    "student"  : id,
    "desc"     : desc,
    "cost"     : cost,
    "max_time" : max_time,
    "st_time"  : Date.now(),
    "offers"   : "",
    "distance" : dist
  };

  console.log(request);

  Models.client.createDocument(Models.requests._self, request, function(err, doc){
    if (err) return next(err);
    console.log(doc);
    res.send(doc);
  });

  var querySpec = {
      query: 'SELECT * FROM docs d WHERE d.id = @id',
      parameters: [{
          name: '@id',
          value: id
      }]
  };
  Models.client.queryDocuments(Models.users._self, querySpec).toArray(function(err, users){
    if (users.length > 0){
      user = users[0];
      user.location = location;
    } else{
      var user = {
        "id"       : id,
        "location" : location
      }

      Models.client.createDocument(Models.users._self, user, function(err, doc){
        if (err) return next(err);
      });
    }


  });
};

/*
 * Looks at the Offers that a
 *
 *
 */
 RequestController.seeOffers = function(req, res, next){
   var userQ = {
       query: 'SELECT * FROM docs d WHERE d.id = @id',
       parameters: [{
           name: '@id',
           value: req.query.id
       }]
   };

   Models.client.queryDocuments(Models.users._self, userQ).toArray( function(err, users){
     if (err) return next(err);
     var dinnerQ = {
         query: "SELECT * FROM docs d WHERE d.id IN (@id)",
         parameters: [{
             name: '@id',
             value: users[0].offers
         }]
     };
     Models.client.queryDocuments(Models.dinners._self, dinnerQ).toArray(function(err, dinners){
       if(err) return next(err);
       res.send(dinners);
     });
   });
 };

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
          desc       = req.query.desc;

};

/*
 * Looks at nearby requests for food.
 * @param location the location of the server
 * @return SQL rows of all open requests within (5 km?)
 *
 */
RequestController.seeRequests = function(req, res, next){

};

//It's good habit to have this at the very end
module.exports = RequestController;
