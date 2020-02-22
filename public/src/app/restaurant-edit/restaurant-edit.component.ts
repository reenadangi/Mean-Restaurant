import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { restaurantService } from '../restaurantService';
import {FormGroup,Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  form:FormGroup;
  restaurant;
  id;
  error;

  constructor(private _restaurantService: restaurantService,  
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("edit this res", params['id'])
      this.id = params['id']
      this.getRestaurantService(this.id);      
    });   
  }
    getRestaurantService(id){
      let obversable = this._restaurantService.getRestaurantById(this.id);
      obversable.subscribe(data=>{
        this.restaurant = data;
        this.form=new FormGroup({
          name:new FormControl(this.restaurant.name,{validators:[Validators.required]}),
          cuisine:new FormControl(this.restaurant.cuisine,{validators:[Validators.required]}),
          
        });
        console.log(this.restaurant);
      })
    } 

    editRestaurantForm(){
      if(this.form.invalid){
        return;
      }
  this.restaurant.name=this.form.value.name;
  this.restaurant.cuisine=this.form.value.cuisine;
  console.log("before update");
  console.log("before update",this.restaurant)
  let obversable= this._restaurantService.updateRestaurant(this.restaurant);
      obversable.subscribe(resData=>{
        console.log(resData);
        if(resData['status'] == 'errors'){
          this.error= resData['errors']
          console.log(this.error);
        }else{
        // this._router.navigate(['/details/'+this.id])
        this._router.navigate(['/'])
        }
      });
    }
  
  

}
