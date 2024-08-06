import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IResult } from '../../interfaces/iresult.interfaces';
import Swal from 'sweetalert2'
import { routes } from '../../app.routes';



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
  router = inject(Router)
  
  
  ngOnInit(){
    this.activeRoute.params.subscribe( async params => {
      let id = (params['id'])
     this.singleUser = await this.serviceUser.getById(id)
     
 
    })
  }

  deleteUser(singleUser:IResult){
    Swal.fire({
      title: `Estas seguro de que quieres borrar al usuario ${singleUser.first_name} ${singleUser.last_name}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No eliminar`,
      confirmButtonColor: '#4caf50',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let variable = singleUser._id;
        const response: IResult = await this.serviceUser.delete(variable);
        if (response._id) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Usuario eleminado con éxito',
            showConfirmButton: false,
            timer: 2500,
            background: '#4caf50',
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          const updateResponse = await this.serviceUser.getAll();
          console.log(updateResponse.results);
          //this.router.navigate(['/control', 'home']);
        } else {
          console.log('id de usuario no encontrado');
        }
      } else if (result.isDenied) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Proceso cancelado',
          showConfirmButton: false,
          background: '#dc3545',
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      }
    });
  }
}

 
