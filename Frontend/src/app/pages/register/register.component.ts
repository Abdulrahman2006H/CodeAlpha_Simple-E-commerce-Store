import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';

  submit(): void {
    if (!this.name || !this.email || !this.password) return;
this.authService.register({
  name: this.name,
  email: this.email,
  password: this.password
}).subscribe({
  next: (res) => {
    this.router.navigateByUrl('/');
  },
  error: (err) => {
    console.error('Registration failed', err);
  }
});
    this.router.navigateByUrl('/');
  }
}
