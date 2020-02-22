import { Restaurant } from './restaurant.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import {Router} from '@angular/router'

import { environment } from "../environments/environment";
const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn:'root'})
export class restaurantService{
  cuisine:string="All";
private restaurants: Restaurant[]=[];
// public todaysCat:Cat;
private restaurantsUpdated=new Subject<Restaurant[]>();
private petUpdated=new Subject<Restaurant>();
constructor(private httpClient:HttpClient,private router:Router){}
getRestaurants(){
   this.httpClient.get<{restaurants:Restaurant[]}>(BACKEND_URL+'/restaurants').subscribe((restaurantData)=>{this.restaurants=restaurantData.restaurants;
   this.restaurantsUpdated.next([...this.restaurants]);   
  });
   console.log(`restaurants${[...this.restaurants]}`);
 }
getRestaurantsUpdateListener(){
    return this.restaurantsUpdated.asObservable();
}
getRestaurantUpdatedListener(){
  return this.petUpdated.asObservable();
}
getCuisine()
{
  return this.cuisine;
}

// addRestaurant(name:string,cuisine:string){
//   const restaurant: Restaurant= {
//       _id:null,
//       name: name,
//       cuisine:cuisine
//     }
//     console.log("in service" ,restaurant);
//     this.httpClient.post<{message: string,_id:string}>(BACKEND_URL+'/restaurants',restaurant).subscribe(responseData=>{
//          console.log(`pet created ${responseData._id}`);
//          const _id= responseData._id;
//          restaurant._id=_id;
//          this.restaurants.push(restaurant);
//          this.restaurantsUpdated.next([...this.restaurants]); 
//          this.router.navigate(["/"]);
//       },error=>{
//         console.log("This is the error",error)
//         }
//         );

//  }

addRestaurant(name:string,cuisine:string,about:string,image:File,place_id:string,userId:string,latitude:number,longitude:number){
  const restaurant: Restaurant= {
      _id:null,
      name: name,
      cuisine:cuisine,
      about:about,
      imagepath:null,
      place_id:place_id,
      userId:userId,
      latitude:latitude,
      longitude:longitude

    }
    const restaurantData=new FormData();
    restaurantData.append("name",name);
    restaurantData.append("cuisine",cuisine);
    restaurantData.append("about",about)
    restaurantData.append("image",image,name);
    restaurantData.append("place_id",place_id);
    restaurantData.append("userId",userId);
    restaurantData.append("latitude",latitude.toString());
    restaurantData.append("longitude",longitude.toString());
    

    console.log("in service" ,restaurant);
    this.httpClient.post<{message: string,_id:string,imagepath:string}>(BACKEND_URL+'/restaurants',restaurantData).subscribe(responseData=>{
         console.log(`restaurants created ${responseData._id}`);
         const _id= responseData._id;
         restaurant._id=_id;
         restaurant.imagepath=responseData.imagepath;
         this.restaurants.push(restaurant);
         this.restaurantsUpdated.next([...this.restaurants]); 
         this.router.navigate(["/"]);
      },error=>{
        console.log("This is the error",error)
        }
        );

 }

    getRestaurantById(id){
    //     this.httpClient.get<{pets:Pet[]}>('http://localhost:3000/api/pets').subscribe((petData)=>{this.pets=petData.pets;
    //     this.petsUpdated.next([...this.pets]);   
    //    });
    console.log("this is id",id)
        return this.httpClient.get(BACKEND_URL+'/restaurant/'+id)
       }
 
    deleteRestaurant(id){
        // return this.httpClient.delete('http://localhost:3000/api/restaurant/'+id);
        this.httpClient.delete(BACKEND_URL+'/restaurant/'+id).subscribe(()=>{
          const updatedRestaurants=this.restaurants.filter(restaurant=>restaurant._id!==id);
          this.restaurants=updatedRestaurants;
          this.restaurantsUpdated.next([...this.restaurants]);
          });


    }
    updateRestaurant(restaurant){
        return this.httpClient.put(BACKEND_URL+'/restaurants/edit/'+restaurant._id, restaurant);
       }

       getRestaurantbyCuisine(cuisine){
         console.log("cuisine",cuisine)
         if(cuisine=="All"){
          this.getRestaurants();
         }
         else{
          
        this.cuisine=cuisine;
        //  this.router.navigate(['/']);
         const updatedRestaurants=this.restaurants.filter(restaurant=>restaurant.cuisine==cuisine);
         this.restaurants=updatedRestaurants;
         this.restaurantsUpdated.next([...this.restaurants]);
         console.log(updatedRestaurants)
         }
        //  this.router.navigate(['/']);



       }
     
}
