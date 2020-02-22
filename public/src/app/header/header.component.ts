import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {restaurantService} from '../restaurantService'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private authListenerSubs: Subscription;
  private userIsAuthenticated=false;
  title = 'public'; 
  form:FormControl;

  //  *************
  myControl = new FormControl();
  options: string[] = ['All','American', 'Italian', 'Chinese','Japanese','Indian'];

  // ***************,
   

   
  constructor(private authService: AuthService,private router:Router,public restaurantService :restaurantService){}
  ngOnInit(){
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
    });

  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
  onLogOut()
  {
    this.authService.logOut()
  }
  onSearch(cuisine){
    console.log("Find",cuisine)
    // this.router.navigate(['/'+cuisine]);
    this.restaurantService.getRestaurantbyCuisine(cuisine)
  }
}
