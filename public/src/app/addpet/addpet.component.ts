import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
// import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormGroup,Validators} from '@angular/forms';

import { Pet } from '../pet.model';
import { invalid } from '@angular/compiler/src/render3/view/util';
import {PetsService} from '../petservice'

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent implements OnInit {

  constructor(public petService:PetsService,public route: ActivatedRoute) {
  }
  form:FormGroup;

  // this is for edit cat
    mode = "create";
    petId: string;
    pet:Pet;
    pets: Pet[]= [];
    onAddPet(){
      // if(this.form.invalid){
      //   return;
      // }
      // if (this.mode === "create") 
      // {
      // this.petService.addPet(this.form.value.name,this.form.value.type,this.form.value.description,this.form.value.skill1,this.form.value.skill2,this.form.value.skill3)
      
      // }
      // else{
      //   console.log("in update cat in component")
      // // this.catService.updateCat(this.catId,this.form.value.name,this.form.value.favfood,this.form.value.breed,this.form.value.cat_img)
      // // this.form.reset()
      // }
    }  

  ngOnInit() {
    this.form=new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      type:new FormControl(null,{validators:[Validators.required]}),
      description:new FormControl(null,{validators:[Validators.required]}),
      skill1:new FormControl(null),
      skill2:new FormControl(null),
      skill3:new FormControl(null)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("petId")) {
        
      } else {
        this.mode = "create";
        this.petId = null;
      }
    }); 
    //edit/add
  }
  

}
