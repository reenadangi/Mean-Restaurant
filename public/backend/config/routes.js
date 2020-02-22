var pets = require('../controller/pets.js');
var restaurants=require('../controller/restaurants.js');
var reviews=require('../controller/reviews');
var users=require('../controller/users');

const multer = require('multer');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'

}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }

});



module.exports = function (app) {
  //***********************Users routes**********************/

  app.post("/api/user/signup", (req, res, next) => {
    const user = req.body;
    users.create(req, res);
  });

  app.post("/api/user/login",(req,res) => {
      console.log("*********************",req.body)
      users.login(req,res);

  });
// ****************Pet Routes****************
// app.get('/api/pets', (req, res)=>{
//   console.log("in routes getting pets")
//   pets.Show(req, res);
// });

// // api/pet/
// app.get('/api/pet/:id', (req,res)=>{
//   console.log("in route gettng pet")
//   pets.PetDetails(req,res);
// });

// app.post('/api/pets',(req,res,next)=>{
//   console.log("in create pet");
//   console.log(req.body)
//   pets.CreatePet(req,res);
// });

//***resturent routes */
app.get('/api/restaurants', (req, res)=>{
  console.log("in routes getting restaurant")
  restaurants.Show(req, res);
});

// // api/pet/
app.get('/api/restaurant/:id', (req,res)=>{
  console.log("in route gettng restaurant")
  restaurants.RestaurantDetails(req,res);
});

// app.post('/api/restaurants',(req,res,next)=>{
//   console.log("in create restaurants");
//   console.log(req.body)
//   restaurants.CreateRestaurant(req,res);
// });

app.post('/api/restaurants', multer({
  storage: storage
}).single("image"), (req, res, next) => {
  const restaurant = req.body;
  const url = req.protocol + '://' + req.get("host");
  const imagePath = url + "/images/" + req.file.filename

  console.log(restaurant,imagePath);
  restaurants.CreateRestaurant(req, res, imagePath);

  // res.status(201).json({message:'Cat added sucessusfully'});
});


app.delete('/api/restaurant/:id',(req,res)=>{
  restaurants.DeleteRestaurant(req,res);
}); 
app.put('/api/restaurants/edit/:id',(req,res)=>{
  restaurants.UpdateRestaurant(req,res);
});

//**for reviews */

app.get('/api/reviews/:id', (req, res)=>{
  console.log("in routes getting reviews")
  reviews.Show(req, res);
});

// // // api/pet/
// app.get('/api/restaurant/:id', (req,res)=>{
//   console.log("in route gettng restaurant")
//   restaurants.RestaurantDetails(req,res);
// });

app.post('/api/reviews',(req,res,next)=>{
  console.log("in create reviews");
  console.log(req.body)
  reviews.CreateReview(req,res);
});
}