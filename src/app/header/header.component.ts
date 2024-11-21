import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  //TODO: Add search functionality and button click functionality

}
