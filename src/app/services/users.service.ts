import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interfaces';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http= inject(HttpClient)
  private url: string= 'https://peticiones.online/api/users'


  getAll():Promise <IUser>{
    return firstValueFrom(this.http.get<IUser>(this.url))
  }







}
