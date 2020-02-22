import {HttpInterceptor,HttpRequest, HTTP_INTERCEPTORS, HttpHandler} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>,next: HttpHandler){
        // get token from authservice
        const authToken=this.authService.getToken();
        // copy and edit
        const authRequest=req.clone({
            headers:req.headers.set("Authorization","Bearer "+authToken)

        });
        return next.handle(authRequest);

    }

}