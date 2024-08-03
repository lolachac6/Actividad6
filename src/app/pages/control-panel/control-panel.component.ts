import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {

}
