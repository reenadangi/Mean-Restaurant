const mongoose = require('mongoose');
// const Users = mongoose.model('Users');
// const Pets = mongoose.model('Pets');
const Reviews = mongoose.model('Reviews');


module.exports = {
    Show: function(req, res){
        console.log("in controller finding reviews", req.params.id);
        let id = req.params.id;

        Reviews.find({restaurant:id}, function(err,reviews){
            if(err){
                console.log(err);
            }
            console.log(reviews)
            res.json({message: "All Reviews", reviews:reviews});
        });
    },
    CreateReview: function(req, res){
        // let newPet = new Pet(req.body)
        console.log("in controller adding review");
        console.log(req.body);
    const review=new Reviews();
    review.name=req.body.name;
    review.rating=req.body.rating;
    review.review=req.body.review;
    review.restaurant=req.body.restaurant;
    
    review.save()
    .then(newReviewData=>
        {
        console.log(`newReviewData added successfully${newReviewData}`)
        res.status(201).json({
        message:"newReviewData added successfully",
        _id:newReviewData._id,
        // likes:newPetData.likes
        })
        })
        .catch(err=>res.status(500).json({
            error:err
        }));
      
    },

    // RestaurantDetails:function(req, res){
    //     let id = req.params.id;
    //     Restaurants.findOne({_id:id}, function(err, pet){
    //         if(err){
    //             console.log('error');
    //             res.json({status: "errors", errors:err});
    //         }else{
    //             console.log('Found res');
    //             res.json(pet);
    //         }
    //     });

    // },
    // DeleteRestaurant:function(req,res){
    //     let restaurantId = req.params.id;
    //         Restaurants.deleteOne({_id: restaurantId}, function(err){
    //             if (err){
    //                 console.log("Error");
    //                 res.json({error: err});
    //             }else{
    //                 console.log("Successfuly Deleted");
    //                 res.json({message: "Successfully Delete"});
    //             }
    //         });
    // },
    // UpdateRestaurant: function(req, res){
    //     let restaurantId = req.params.id;
    //     console.log("update",restaurantId,req.body )
    //     Restaurants.findByIdAndUpdate( restaurantId, req.body, function(err){
    //         if(err){
    //             console.log('error');
    //             res.json({status: "errors", errors: err})
    //         }else{
    //             console.log('Successfully edited res!');
    //             res.json({message:'Successfully edited res!'});
    //         }
    //     });
    // },

}