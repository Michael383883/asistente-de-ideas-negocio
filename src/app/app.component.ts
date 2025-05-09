import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necesario para *ngIf
import { RouterOutlet, RouterModule, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ Asegúrate de que NavbarComponent sea standalone

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,            // ✅ Necesario para *ngIf, *ngFor, etc.
    RouterModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    NavbarComponent          // ✅ Incluido si es standalone
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
