import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import {PetsService} from '../petservice'
import { Pet } from '../pet.model';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit,OnDestroy {
  pets:Pet[]=[];
  private petsSub:Subscription;

  constructor(public petService:PetsService) { }

  ngOnInit() {this.petService.getPets()
    this.petsSub= this.petService.getPetsUpdateListener().subscribe((pets:Pet[])=>{
    this.pets=pets

    this.pets.sort(function(a, b){
      var typeA=a.type.toLowerCase(), typeB=b.type.toLowerCase()
      if (typeA < typeB){ //sort string ascending
       return -1 
      }
      if (typeA > typeB){
        return 1
      }
      return 0 //default return value (no sorting)
    });
    
    });
  }
 ngOnDestroy(){
  this.petsSub.unsubscribe();
 }

}
