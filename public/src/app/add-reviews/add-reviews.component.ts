import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
// import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormGroup,Validators} from '@angular/forms';

import { Review } from '../review.model';
import { invalid } from '@angular/compiler/src/render3/view/util';
import {ReviewService} from '../reviewService'

@Component({
  selector: 'app-add-reviews',
  templateUrl: './add-reviews.component.html',
  styleUrls: ['./add-reviews.component.css']
})
export class AddReviewsComponent implements OnInit {

  constructor(public reviewService:ReviewService,public route: ActivatedRoute) {
  }
  form:FormGroup;

  // this is for edit cat
    mode = "create";
    reviewId: string;
    review:Review;
    reviews: Review[]= [];
    restaurantId="";

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log("review this res", params['id'])
      this.restaurantId = params['id']
    });

    this.form=new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      rating:new FormControl(null,{validators:[Validators.required]}),
      review:new FormControl(null,{validators:[Validators.required]}),
    });
   
    
  
}
  onAddReview(){
    if(this.form.invalid){
      return;
    }
    if (this.mode === "create") 
    {
    this.reviewService.addReview(this.form.value.name,this.form.value.rating,
      this.form.value.review,
      this.restaurantId)
    }
    else{
      console.log("in update cat in component")
    // this.catService.updateCat(this.catId,this.form.value.name,this.form.value.favfood,this.form.value.breed,this.form.value.cat_img)
    // this.form.reset()
    }
  }
}
