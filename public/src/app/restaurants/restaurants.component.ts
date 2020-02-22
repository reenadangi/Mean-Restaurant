import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import {restaurantService} from '../restaurantService'
import { Restaurant  } from '../restaurant.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
 
import {Appearance, GermanAddress, Location} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
// import {} from '@types/googlemaps';
import {} from '@agm/core'
// Authetication 
import { AuthService } from '../auth/auth.service';
interface marker {
	lat: number;
	lng: number;
  label?: string;
  name?:string;
  draggable: boolean;
  cuisine:string;
  about:string;
}

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit,OnDestroy { 
  zoom: number = 8;
  latitude:number = 41.881832;
  longitude:number =  -87.623177;
  locationChosen = false;

  markers: marker[] = [
	  {
		  lat: 41.881832,
		  lng: -87.623177,
      label: 'A',
      name:'Big Bowl',
      draggable: true,
      cuisine:"",
      about:""
       
	  },
	  {
		  lat:  42.033360,
		  lng:  -88.083405,
      label: 'B',
      name:'Purple Pig',
      draggable: false,
      cuisine:"",
      about:""
      
	  },
	  {
		  lat:  41.977226,
		  lng: -87.836723,
		  label: 'C',
      name:"Seasons 32",
      draggable: true,
      cuisine:"",
      about:""
	  }
  ]



  restaurants:Restaurant[]=[];
  private restaurantSub:Subscription;
  private error;
  showAddNew=false

  private userId:string;
  
  cuisine:string="";
  
  constructor(public restaurantService :restaurantService,private _router: Router,private authService:AuthService,private _route: ActivatedRoute) { }


  ngOnInit() {
    this.userId=this.authService.getUserId()

    // ****cuisine 
    // this._route.params.subscribe((params: Params) => {
    //   console.log("show this cuisine", params['cuisine'])
    //   this.cuisine = params['cuisine']
    //   // this.getRestaurantService(this.id);      
    // });   
    this.cuisine=this.restaurantService.getCuisine()
    if(this.cuisine=="All")
    {
      console.log("show all")

    }
    else {
      console.log("****",this.cuisine)
    }

    // ******

    this.restaurantService.getRestaurants()
    this.restaurantSub= this.restaurantService.getRestaurantsUpdateListener().subscribe((restaurants:Restaurant[])=>{
    this.restaurants=restaurants
    this.getMarkers();  

  });
  }
  getMarkers(){
   
    this.restaurants.forEach(restaurant => {
      console.log(restaurant.latitude,restaurant.longitude)

      this.markers.push(
      {
        lat:  restaurant.latitude,
        lng: restaurant.longitude,
        label: "R",
        name:restaurant.name,
        draggable: false,
        cuisine:restaurant.cuisine,
        about:restaurant.about
      });
      //now pass this place id and get lat/lan
      var request = {
        placeId: 'restaurant.place_id',
        fields: ['name', 'formatted_address', 'place_id', 'geometry']
      };
      console.log(document.getElementById("gmail") as HTMLDivElement)
     
    //   var placesService = new google.maps.places.PlacesService(document.getElementById("gmail") as HTMLDivElement);
    //   console.log("after",document.getElementById("gmail") as HTMLDivElement)
    //   // var service = new google.maps.places.PlacesService();
    //   placesService.getDetails(request,function(place,status){
    //     console.log("***",place.geometry.location);
    //   });
    });

//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -33.866, lng: 151.196},
//       zoom: 15
//     });
//     var request = {
//       placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
//       fields: ['name', 'formatted_address', 'place_id', 'geometry']
//     };

//     var infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
// console.log('&&&&&&')
//     service.getDetails(request, function(place, status) {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
        
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });
//         console.log("****"+place.name)
//         google.maps.event.addListener(marker, 'click', function() {
//           infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//             'Place ID: ' + place.place_id + '<br>' +
//             place.formatted_address + '</div>');
//           infowindow.open(map, this);
//         });
//       }
//     });


  }
  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
  
  clickedMarker(label: string, index: number) {
   console.log(`clicked the marker: ${label || index}`)
  }

  ngOnDestroy(){
    this.restaurantSub.unsubscribe();
   }
   deleteRestaurant(id){
    let observable = this.restaurantService.deleteRestaurant(id);
    // observable.subscribe(data =>{
    //   if(data['status'] == 'errors'){
    //     this.error = data['errors']
    //     console.log(this.error);
    //   }else{

    //     console.log()
    //     this.restaurantSub= this.restaurantService.getRestaurantsUpdateListener().subscribe((restaurants:Restaurant[])=>{
    //       this.restaurants=restaurants
    //       });
      // this._router.navigate(['/'])
    //   }
    // });
  }
  loadMyChildComponent(){
    console.log("this is new")
    this.showAddNew=true;
    
  }
}
