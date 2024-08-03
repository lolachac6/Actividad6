import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { FormComponent } from './pages/form/form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'main'},
    {path:'main', component:MainComponent},
    {path:'control',component:ControlPanelComponent,children:[
        {path:'home',component:UserListComponent},
        {path:'user/:id', component:UserViewComponent},
        {path:'newuser',component:FormComponent},
        {path:'updateuser/:id',component:FormComponent},
    ]},
    {path:'**',pathMatch:'full',redirectTo:'main'},
];
