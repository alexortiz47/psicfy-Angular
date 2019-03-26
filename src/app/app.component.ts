import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EstilosService } from './estilos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// Esto hace que el scroll se ponga arriba del todo al navegar por la app
export class AppComponent {
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
}
