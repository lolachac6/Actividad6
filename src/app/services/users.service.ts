import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interfaces';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IResult } from '../interfaces/iresult.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  private url: string = 'https://peticiones.online/api/users'
  private http = inject(HttpClient)


getAll(page:number = 1):Promise<IUser>{
  return firstValueFrom(this.http.get<IUser>(`${this.url}?page=${page}`))
}


getById(id:number):Promise<IResult>{
  return firstValueFrom(this.http.get<IResult>(`${this.url}/${id}`))

}

delete(id:string):Promise<IResult>{
  return firstValueFrom(this.http.delete<IResult>(`${this.url}/${id}`))
}

insert(user:IResult):Promise<IResult>{
  return firstValueFrom(this.http.post<IResult>(`${this.url}`,user))

}

update(user:IResult):Promise<IResult>{
  return firstValueFrom(this.http.put<IResult>(`${this.url}/${user._id}`,user))

}

}