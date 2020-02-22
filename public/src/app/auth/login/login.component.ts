import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authSub:Subscription;
  errorMsg=null;
  constructor(public authService:AuthService) { }

  ngOnInit() {

  }
  onLogin(form:NgForm){
    console.log(form.value)
    if(form.invalid){
      return
    }
    
    this.authService.login(form.value.email,form.value.password)

    this.authSub=this.authService.getAuthStatusListener().subscribe((authStatus:Boolean)=>{
      this.errorMsg=this.authService.getSucessMsg();
      console.log(`This is auth status ${authStatus}`)
    });

    // console.log(this.authService.getAuthStatusListener());
    // console.log(this.authService.getSucessMsg());

  }


}
