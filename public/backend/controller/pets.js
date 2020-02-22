const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Pets = mongoose.model('Pets');

module.exports = {
    Show: function(req, res){
        Pets.find({}, function(err,pets){
            if(err){
                console.log(err);
            }
            res.json({message: "All Pets", pets:pets});
        });
    },
    CreatePet: function(req, res){
        // let newPet = new Pet(req.body)
        console.log("in controller adding pet");
        console.log(req.body);
    const pet=new Pets();
    pet.name=req.body.name;
    pet.type=req.body.type;
    pet.description=req.body.description;
    pet.skill1=req.body.skill1;
    pet.skill2=req.body.skill2;
    pet.skill3=req.body.skill3;
    pet.save()
    .then(newPetData=>
        {
        console.log(`pet added successfully${newPetData}`)
        res.status(201).json({
        message:"pet added successfully",
        _id:newPetData._id,
        likes:newPetData.likes
        })
        })
        .catch(err=>res.status(500).json({
            error:err
        }));
      
    },

    PetDetails:function(req, res){
        let id = req.params.id;
        Pets.findOne({_id:id}, function(err, pet){
            if(err){
                console.log('error');
                res.json({status: "errors", errors:err});
            }else{
                console.log('Found pet');
                res.json(pet);
            }
        });

    },
    deletePet:function(req,res){
        let petId = req.params.id;
            Pets.deleteOne({_id: petId}, function(err){
                if (err){
                    console.log("Error");
                    res.json({error: err});
                }else{
                    console.log("Successfuly Deleted");
                    res.json({message: "Successfully Delete"});
                }
            });
    },
    updatePet: function(req, res){
        let petId = req.params.id;
        
        console.log("update",petId,req.body )
        Pets.findByIdAndUpdate( petId, req.body, function(err){
            if(err){
                console.log('error');
                res.json({status: "errors", errors: err})
            }else{
                console.log('Successfully edited pet!');
                res.json({message:'Successfully edited pet!'});
            }
        });
    },

}
