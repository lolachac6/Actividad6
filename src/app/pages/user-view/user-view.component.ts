import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IResult } from '../../interfaces/iresult.interfaces';


@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  activeRoute = inject(ActivatedRoute)
  serviceUser= inject(UsersService)
  singleUser!:IResult
  
  ngOnInit(){
    this.activeRoute.params.subscribe( async params => {
      let id = (params['id'])
     this.singleUser = await this.serviceUser.getById(id)
     
 
    })
  }

}
