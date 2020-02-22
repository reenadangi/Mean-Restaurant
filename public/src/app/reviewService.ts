import { Review } from './review.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import {Router} from '@angular/router'

import { environment } from "../environments/environment";
const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn:'root'})
export class ReviewService{

private reviews: Review[]=[];

// public todaysCat:Cat;
private reviewsUpdated=new Subject<Review[]>();

private petUpdated=new Subject<Review>();
constructor(private httpClient:HttpClient,private router:Router){}

getReviews(id){
  console.log("Reviews in service:",id)
   this.httpClient.get<{reviews:Review[]}>(BACKEND_URL+'/reviews/'+id).subscribe((reviewData)=>{this.reviews=reviewData.reviews;
   
   this.reviewsUpdated.next([...this.reviews]);   
  });
   console.log(`reviews${[...this.reviews]}`);
 }
getReviewsUpdateListener(){
    return this.reviewsUpdated.asObservable();
}
// getReviewUpdatedListener(){
//   return this.reviewUpdated.asObservable();
// }

addReview(name:string,rating:number,user_review:string,restaurant:string,){
  const review: Review= {
      _id:null,

      name: name,
      rating:rating,
      review:user_review,
      restaurant:restaurant
    }
    console.log("in service" ,review);


  this.httpClient.post<{message: string,_id:string}>(BACKEND_URL+'/reviews',review).subscribe(responseData=>{
         console.log(`pet created ${responseData._id}`);
         const _id= responseData._id;
         review._id=_id;
         this.reviews.push(review);
         this.reviewsUpdated.next([...this.reviews]); 
         this.router.navigate(["/"]);
      },error=>{
        console.log("This is the error",error)
        }
        );

 }
    
}
