import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';

  submit(): void {
    if (!this.email || !this.password) return;
this.authService.login({
  email: this.email,
  password: this.password
}).subscribe({
  next: (res) => {
    this.router.navigateByUrl('/');
  },
  error: (err) => {
    console.error('Login failed', err);
  }
});
    this.router.navigateByUrl('/');
  }
}
