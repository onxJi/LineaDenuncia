import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LineaDenuncia';

  constructor(private router: Router){

  }
  newComplaint(){
    this.router.navigate(['newcomplaint']);
  }
}
