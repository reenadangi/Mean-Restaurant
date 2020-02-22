
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import {HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatInputModule,
  MatButtonModule,
  MatOptionModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,MatExpansionModule,
  MatProgressSpinnerModule} from '@angular/material'

 import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';


import {HttpClient} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PetsComponent } from './pets/pets.component';
import { AddpetComponent } from './addpet/addpet.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddrestaurantComponent } from './addrestaurant/addrestaurant.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';

import { AgmCoreModule } from '@agm/core';
//for google map
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

// google auto complete
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ResComponent } from './res/res.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    routingComponents,
    LoginComponent,
    SignupComponent,
    PetsComponent,
    AddpetComponent,
    PetDetailsComponent,
    PetEditComponent,
    RestaurantsComponent,
    AddrestaurantComponent,
    RestaurantEditComponent,
    ReviewsComponent,
    AddReviewsComponent,
    MainNavComponent,
    ResComponent,
  ],
  imports: [
   
    
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_API_KEY',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    GooglePlaceModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
    
  ],
  bootstrap: [AppComponent,FooterComponent,routingComponents]
})
export class AppModule { }




