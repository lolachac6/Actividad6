import { Component, inject, Input } from '@angular/core';
import { IResult } from '../../interfaces/iresult.interfaces';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent {
  @Input() myUser!: IResult;
  userservices = inject(UsersService);
  user: IResult[] = [];

  async ngOnInit() {
    const response = await this.userservices.getAll();
    this.user = response.results;
  }

  async deleteUser(myUserid: IResult) {
    if (myUserid._id) {
      Swal.fire({
        title: `Estas seguro de que quieres borrar al usuario ${myUserid.first_name} ${myUserid.last_name}?`,
        imageUrl: `${myUserid.image}`,
        imageWidth: 200,
        imageHeight: 200,
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `No eliminar`,
        confirmButtonColor: '#4caf50',
      }).then(async (result) => {
        if (result.isConfirmed) {
          //lo borramos
          let variable = myUserid._id;
          const response: IResult = await this.userservices.delete(variable);
          if (response._id) {
            try {
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
              //Actualizamos los usuarios
              const updateResponse = await this.userservices.getAll(); //He puesto esto porque es lo que tendriamos que hacer para actualizar los usuarios y obtener todos menos el que hemos borrado.
              this.user = updateResponse.results; // Se hace esto para que el componente se actualice del usuario que ficticiamente hemos borrado. En este caso no ocurre pero he querido dejarlo plasmado por si acaso.
            } catch (error) {
              console.log(error);
            }
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
}
