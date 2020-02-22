import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
// import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormGroup,Validators} from '@angular/forms';

import { Restaurant } from '../restaurant.model';
import { invalid } from '@angular/compiler/src/render3/view/util';
import {restaurantService} from '../restaurantService'

import {Appearance, GermanAddress, Location} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;


import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrls: ['./addrestaurant.component.css']
})
export class AddrestaurantComponent implements OnInit {

  constructor(public restaurantService:restaurantService,public route: ActivatedRoute,private authService:AuthService) {
  }
  form:FormGroup;
  latitude = 51.678418;
  longitude = 7.809007;
  locationChosen = false;

  imagePreview:string;
  place_id:string;
  userId:string;

  // on map click
  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

  onAutocompleteSelected(result: PlaceResult) {

    console.log('onAutocompleteSelected: ', result);
    console.log('onAutocompleteSelected Address**: ', result.formatted_address);
    this.form.controls['name'].setValue(result.name);
    // save place ID result. result.place_id
    console.log(result.place_id)
   

    console.log(result.url)
    console.log(result.photos[0].getUrl)
    this.place_id=result.place_id
  }
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.locationChosen = true;
  }
  // on sutocomplete 
  public handleAddressChange() {
    console.log("shdsdsjfhdsjfh")
}

  // this is for edit cat
    mode = "create";
    restaurantId: string;
    restaurant:Restaurant;
    restaurants: Restaurant[]= [];

  ngOnInit() {
    this.userId=this.authService.getUserId()
    this.form=new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      cuisine:new FormControl(null,{validators:[Validators.required]}),
      about:new FormControl(null,{validators:[Validators.required]}),
      cover_img:new FormControl(null),
      
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("Id")) {
        
      } else {
        this.mode = "create";
        this.restaurantId = null;
      }
    }); 
    //edit/add
  }
  onAddRestaurant(){
    if(this.form.invalid){
      return;
    }
    if (this.mode === "create") 
    {
    // this.restaurantService.addRestaurant(this.form.value.name,this.form.value.cuisine)
    console.log(this.userId);
    console.log("form values", this.form.value);
    this.restaurantService.addRestaurant(this.form.value.name,this.form.value.cuisine,this.form.value.about,this.form.value.cover_img,this.place_id,this.userId,this.latitude,this.longitude)
    
    this.form.reset();
    this.form.controls['name'].setErrors(null);
    this.form.controls['cuisine'].setErrors(null);
    this.form.controls['about'].setErrors(null);
    this.place_id="";
    
    }
    else{
      console.log("in update cat in component")
    // this.catService.updateCat(this.catId,this.form.value.name,this.form.value.favfood,this.form.value.breed,this.form.value.cat_img)
    // this.form.reset()
    }
  }  

  onImagePicked(event:Event){
    // get the file user selected
    console.log("image selected")
    const file=(event.target as HTMLInputElement).files[0];
    // set file object in new form control
    this.form.patchValue({cover_img:file})
    this.form.get('cover_img').updateValueAndValidity();

    // preview image file
    const reader=new FileReader();
    reader.onload =()=>{
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(`form data ${this.form}`)
    console.log(file)
  }
}
