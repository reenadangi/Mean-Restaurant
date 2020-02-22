import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetsService } from '../petservice';
import {FormGroup,Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {

  form:FormGroup;
 pet;
  id;
  error;

  constructor(private _httpService: PetsService,  
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("edit this pet", params['id'])
      this.id = params['id']
      this.getPetService(this.id);      
    });    
  }
  getPetService(id){
    let obversable = this._httpService.getPetById(this.id);
    obversable.subscribe(data=>{
      this.pet = data;
      this.form=new FormGroup({
        name:new FormControl(this.pet.name,{validators:[Validators.required]}),
        type:new FormControl(this.pet.type,{validators:[Validators.required]}),
        description:new FormControl(this.pet.description,{validators:[Validators.required]}),
        skill1:new FormControl(this.pet.skill1),
        skill2:new FormControl(this.pet.skill2),
        skill3:new FormControl(this.pet.skill3)
      });
      console.log(this.pet);
    })
  }
  editPetForm(){
    if(this.form.invalid){
      return;
    }
this.pet.name=this.form.value.name;
this.pet.type=this.form.value.type;
this.pet.description=this.form.value.description;
this.pet.skill1=this.form.value.skill1;
this.pet.skill2=this.form.value.skill2;
this.pet.skill3=this.form.value.skill3;
console.log("before update");
console.log("before update",this.pet)
let obversable= this._httpService.updatePet(this.pet);
    obversable.subscribe(resData=>{
      console.log(resData);
      if(resData['status'] == 'errors'){
        this.error= resData['errors']
        console.log(this.error);
      }else{
      this._router.navigate(['/details/'+this.id])
      }
    });
  }

}
