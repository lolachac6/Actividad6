import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IResult } from '../../interfaces/iresult.interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  userServices = inject(UsersService);
  router = inject(Router);

  users: IResult[] = [];

  tipo: string = 'NUEVO';
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup(
      {
        nombre: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
          ),
        ]),
        imagen: new FormControl(null, [
          Validators.required,
          this.imagenValidator,
        ]),
      },
      []
    );
  }

  imagenValidator(controlName: AbstractControl): any {
    const exp =
      /^(https?:\/\/(www\.)?|www\.)[a-zA-Z0-9._-]+\.[a-zA-Z.]{2,5}(\/[a-zA-Z0-9._-]*)*(\?[a-zA-Z0-9=&_.-]*)?$/;
    if (!exp.test(controlName.value)) {
      return { imagenValidator: 'Url de la imagen no valida' };
    } else {
      return null;
    }
  }

  checkControl(formControlName: string, Validators: string) {
    return (
      this.userForm.get(formControlName)?.hasError(Validators) &&
      this.userForm.get(formControlName)?.touched
    );
  }
  async getDataForm() {
    try {
      const response: IResult = await this.userServices.insert(
        this.userForm.value
      );
      if (response.id) {
        Swal.fire({
          title: 'Usuario creado con exito',
          icon: 'success',
        });
        this.router.navigate(['/control', 'home']);
      } else {
        Swal.fire({
          title: 'Ha habido un problema al crear el usuario',
          icon: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
