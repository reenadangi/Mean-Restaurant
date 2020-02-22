const mongoose = require('mongoose');
// const Users = mongoose.model('Users');
// const Pets = mongoose.model('Pets');
const Restaurants = mongoose.model('Restaurant');


module.exports = {
    Show: function(req, res){
        Restaurants.find({}, function(err,restaurants){
            if(err){
                console.log(err);
            }
            res.json({message: "All Restaurant", restaurants:restaurants});
        });
    },
    // CreateRestaurant: function(req, res){
    //     // let newPet = new Pet(req.body)
    //     console.log("in controller adding restaurant");
    //     console.log(req.body);
    // const restaurant=new Restaurants();
    // restaurant.name=req.body.name;
    // restaurant.cuisine=req.body.cuisine;
    
    // restaurant.save()
    // .then(newRestaurantData=>
    //     {
    //     console.log(`restaurant added successfully${newRestaurantData}`)
    //     res.status(201).json({
    //     message:"newRestaurantData added successfully",
    //     _id:newRestaurantData._id,
    //     // likes:newPetData.likes
    //     })
    //     })
    //     .catch(err=>res.status(500).json({
    //         error:err
    //     }));
      
    // },
    CreateRestaurant: function(req, res,imagePath){
        // let newPet = new Pet(req.body)
        console.log("in controller adding restaurant");
        console.log(req.body);
    const restaurant=new Restaurants();
    restaurant.name=req.body.name;
    restaurant.cuisine=req.body.cuisine;
    restaurant.about=req.body.about;
    restaurant.imagePath=imagePath;
    restaurant.place_id=req.body.place_id;
    restaurant.userId=req.body.userId;
    restaurant.latitude=req.body.latitude;
    restaurant.longitude=req.body.longitude;
    restaurant.save()
    .then(newRestaurantData=>
        {
        console.log(`restaurant added successfully${newRestaurantData}`)
        res.status(201).json({
        message:"newRestaurantData added successfully",
        _id:newRestaurantData._id,
        // likes:newPetData.likes
        })
        })
        .catch(err=>res.status(500).json({
            error:err
        }));
      
    },

    RestaurantDetails:function(req, res){
        let id = req.params.id;
        Restaurants.findOne({_id:id}, function(err, pet){
            if(err){
                console.log('error');
                res.json({status: "errors", errors:err});
            }else{
                console.log('Found res');
                res.json(pet);
            }
        });

    },
    DeleteRestaurant:function(req,res){
        let restaurantId = req.params.id;
            Restaurants.deleteOne({_id: restaurantId}, function(err){
                if (err){
                    console.log("Error");
                    res.json({error: err});
                }else{
                    console.log("Successfuly Deleted");
                    res.json({message: "Successfully Delete"});
                }
            });
    },
    UpdateRestaurant: function(req, res){
        let restaurantId = req.params.id;
        console.log("update",restaurantId,req.body )
        Restaurants.findByIdAndUpdate( restaurantId, req.body, function(err){
            if(err){
                console.log('error');
                res.json({status: "errors", errors: err})
            }else{
                console.log('Successfully edited res!');
                res.json({message:'Successfully edited res!'});
            }
        });
    },

}
