import { Component,inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IResult } from '../../interfaces/iresult.interfaces';
import {  RouterLink } from '@angular/router';
import { AllUsersComponent } from "../../component/all-users/all-users.component";
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, AllUsersComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userService = inject(UsersService)
  arrUsers!: IResult[];
  activePage:number=1
  viewport=inject(ViewportScroller)
  
  

  async ngOnInit() {
    try{
      const response = await this.userService.getAll()
      this.arrUsers=response.results
    } catch(error){
      console.log(error)
    }
    
  }

  async restOfUsers(page:number=1):Promise<void>{
   
      const response = await this.userService.getAll(page)
      this.arrUsers = response.results 
      this.activePage = page
      this.viewport.scrollToPosition([0, 0]);
   
    
  
     }
   

}


