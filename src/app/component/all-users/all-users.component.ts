import { Component, Input } from '@angular/core';
import { IResult } from '../../interfaces/iresult.interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
@Input() myUser!:IResult



}
