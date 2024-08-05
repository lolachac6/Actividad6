import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { IResult } from '../../interfaces/iresult.interfaces';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userservice = inject(UsersService);
  arrUsers!: IResult[];

 async ngOnInit() {
    try{
      const response = await this.userservice.getAll()
      this.arrUsers=response.results
    } catch(error){
      console.log(error)
    }
    
  }

}
