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
import { ActivatedRoute, Router } from '@angular/router';
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
  activatedRoute = inject(ActivatedRoute);

  users: IResult[] = [];
  tipo: string = 'NUEVO';
  tipobtn:string = 'Guardar';
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
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
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'ACTUALIZAR';
        this.tipobtn = 'Actualizar';
        const user: IResult = await this.userServices.getById(params.id);
        this.userForm = new FormGroup({
          _id: new FormControl(user._id, []),
          nombre: new FormControl(user.first_name, [Validators.required]),
          apellidos: new FormControl(user.last_name, [Validators.required]),
          email: new FormControl(user.email, [Validators.required,
            Validators.pattern(
              /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
            ),
          ]),
          imagen: new FormControl(user.image, [Validators.required]),
        });
      }
    });
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
    if (this.userForm.value._id) {

      try {
        const response: IResult = await this.userServices.update(this.userForm.value)
        if (response._id) {
          Swal.fire({
            title: 'Usuario actualizado con exito',
            icon: 'success',
          });
          this.router.navigate(['/control', 'home']);
        }
        }catch(error){
          console.log(error)
        }
     
      }else {
      
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
}
