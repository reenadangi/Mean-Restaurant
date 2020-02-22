import { Pet } from './pet.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import {Router} from '@angular/router'



@Injectable({providedIn:'root'})
export class PetsService{

private pets: Pet[]=[];

// public todaysCat:Cat;
private petsUpdated=new Subject<Pet[]>();

private petUpdated=new Subject<Pet>();
constructor(private httpClient:HttpClient,private router:Router){}

getPets(){
   this.httpClient.get<{pets:Pet[]}>('http://localhost:3000/api/pets').subscribe((petData)=>{this.pets=petData.pets;
   this.petsUpdated.next([...this.pets]);   
  });
   console.log(`pets${[...this.pets]}`);
 }
getPetsUpdateListener(){
    return this.petsUpdated.asObservable();
}
getPetUpdateListener(){
  return this.petUpdated.asObservable();
}

addPet(name:string,type:string,description:string,skill1:string,skill2:string,skill3:string){
  const pet: Pet= {
      _id:null,
      name: name,
      type: type,
      description:description,
      skill1:skill1,
      skill2:skill2,
      skill3:skill3,
      likes:0
    }
    console.log("in service" ,pet);
//   const petData=new FormData();
//   petData.append("name",name);
//   petData.append("type",type);
//   petData.append("description",description);
//   petData.append("skill1",skill1);
//   petData.append("skill2",skill2);
//   petData.append("skill3",skill3);
// //   petData.append("likes",likes);
// console.log(petData)

  this.httpClient.post<{message: string,_id:string}>('http://localhost:3000/api/pets',pet).subscribe(responseData=>{
         console.log(`pet created ${responseData._id}`);
         const _id= responseData._id;
         pet._id=_id;
         this.pets.push(pet);
         this.petsUpdated.next([...this.pets]); 
         this.router.navigate(["/"]);
      },error=>{
        console.log("This is the error",error)
        }
        );

 }
    getPetById(id){
    //     this.httpClient.get<{pets:Pet[]}>('http://localhost:3000/api/pets').subscribe((petData)=>{this.pets=petData.pets;
    //     this.petsUpdated.next([...this.pets]);   
    //    });
    console.log("this is id",id)
        return this.httpClient.get('http://localhost:3000/api/pet/'+id)
       }
 
    deletePet(id){
        return this.httpClient.delete('http://localhost:3000/api/pet/'+id);
       }
    updatePet(pet){
        return this.httpClient.put('http://localhost:3000/api/pets/edit/'+pet._id, pet);
       }
     
}
