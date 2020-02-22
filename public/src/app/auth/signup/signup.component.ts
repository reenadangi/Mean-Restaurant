import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private authSub:Subscription;
   errorMsg=null;

  constructor(public authService:AuthService) { 

  }

  ngOnInit() {
  }
  onSignup(form:NgForm){
    console.log(form.value)
    if(form.invalid){
      return;
    }
    this.authService.CreateUser(form.value.fname,form.value.lname,form.value.email,form.value.password);
    this.authSub=this.authService.getAuthStatusListener().subscribe((authStatus:Boolean)=>{
      this.errorMsg=this.authService.getSucessMsg();
      console.log(`This is auth status ${authStatus}`)
    });

    form.reset()  
    form.controls['fname'].setErrors(null);
    form.controls['lname'].setErrors(null);
    form.controls['email'].setErrors(null);
    form.controls['password'].setErrors(null);
    // this.catService.addCat(form.value.name,form.value.favfood,form.value.breed)
    // form.reset()   
    
  }
}

