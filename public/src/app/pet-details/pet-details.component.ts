import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetsService } from '../petservice';
@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  pet;
  id;
  private error;
  isLiked = false;

  constructor(private petService: PetsService,  
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id']
      this.getPetService(this.id);      
    });    
  }
  getPetService(id){
    let obversable = this.petService.getPetById(this.id);
    obversable.subscribe(data=>{
      this.pet = data;
      console.log(this.pet);
    })
  }
  deletePet(id){
    let observable = this.petService.deletePet(id);
    observable.subscribe(data =>{
      if(data['status'] == 'errors'){
        this.error = data['errors']
        console.log(this.error);
      }else{
      this._router.navigate(['/'])
      }
    });
  }
  likePet(likedPet){
    likedPet.likes++;
    this.isLiked = true;

    let obversable= this.petService.updatePet(likedPet);
    obversable.subscribe(data=>{
      if(data['status'] == 'errors'){
        this.error = data['errors'];
      }
    });

  }

}
