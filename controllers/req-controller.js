var Models = require('../models/Model.js')

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


}

/*
 * Looks at the Offers that a
 *
 *
 */
 RequestController.seeOffers = function(req, res, next){
   var id   = req.query.name;


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

}

/*
 * Looks at nearby requests for food.
 * @param location the location of the server
 * @return SQL rows of all open requests within (5 km?)
 *
 */
RequestController.seeRequests = function(req, res, next){

}

//It's good habit to have this at the very end
module.exports = RequestController;
