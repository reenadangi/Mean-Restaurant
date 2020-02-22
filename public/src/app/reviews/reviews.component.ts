import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import {ReviewService} from '../reviewService'
import { Review  } from '../review.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit,OnDestroy  {
  reviews:Review[]=[];
  restaurant=""
  private reviewSub:Subscription;
  private error;
  restaurantId="";
  constructor(public reviewService :ReviewService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log("Show review of this res", params['id'])
      this.restaurantId = params['id']
    });
    this.reviewService.getReviews(this.restaurantId);
    this.reviewSub= this.reviewService.getReviewsUpdateListener().subscribe((reviews:Review[])=>{
      console.log("reviews getting :", reviews)
    this.reviews=reviews
    this.restaurantId=reviews[0]['restaurant'];
    console.log("This is the rest" ,reviews[0]['restaurant'])

    this.reviews.sort(function(a, b){
      var typeA=a.rating
      var typeB=b.rating
      if (typeA < typeB){ //sort 
       return -1 
      }
      if (typeA > typeB){
        return 1
      }
      return 0 
    });


    });
  }
    ngOnDestroy(){
      this.reviewSub.unsubscribe();
     } 

}


