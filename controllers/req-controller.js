var Models = require('../models/Model.js');
var geolib = require('geolib')

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
      dist       = parseInt(req.query.dist,10),
      max_time   = req.query.time,
      cost       = req.query.cost;

  var request = {
    "student"  : id,
    "desc"     : desc,
    "cost"     : cost,
    "location" : location,
    "max_time" : max_time,
    "st_time"  : Date.now(),
    "offers"   : "",
    "distance" : dist,
    "isOpen"   : 1
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
 * Looks at nearby requests for food.
 * @param location the location of the server
 * @return SQL rows of all open requests within (5 km?)
 *
 */
RequestController.seeRequests = function(req, res, next){
  var location = req.query.location;

  var reqQuer = {
    query: "SELECT * FROM docs d where d.isOpen = 1",
  }
  Models.client.queryDocuments(Models.requests._self, querySpec).toArray(function(err, reqs){
    if (err) return next(err);
    for (var index in reqs){
      var request = reqs[index];
      //calculate distance to host location
      request.distTo = RequestController.distCalc(location, req.location);

      //remove if too far away
      if(request.distTo > request.dist){
        reqs.splice(index, 1);
      }
    }

    //sort by decreasing distance
    reqs.sort(function(r1, r2){
      return r1.distTo - r2.distTo;
    });
    res.send(reqs);
  });
};

RequestController.distCalc = function(point1, point2){

};

//It's good habit to have this at the very end
module.exports = RequestController;
