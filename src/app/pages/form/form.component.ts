import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IResult } from '../../interfaces/iresult.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  userServices= inject(UsersService)
  router = inject(Router)

  users:IResult[]=[]

  tipo: string = 'NUEVO';
  userForm:FormGroup;
  
  constructor() {
    this.userForm=new FormGroup({
      nombre: new FormControl(null,[]),
      apellidos: new FormControl(null,[]),
      email: new FormControl(null,[]),
      imagen: new FormControl(null,[]),
      
    },[])
  }


  async getDataForm(){
    try{
      const response:IResult = await this.userServices.insert(this.userForm.value)
      if(response._id){
        this.router.navigate(['/control', 'home']);
      }
 
    }catch(error){
      console.log(error);
    }
     
      
       
    
}      
   
  

   
    
}      
