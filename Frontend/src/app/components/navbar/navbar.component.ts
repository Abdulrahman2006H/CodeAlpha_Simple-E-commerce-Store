import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly cartService = inject(CartService);
  public readonly authService = inject(AuthService);


  readonly cartCount = computed(() => this.cartService.count());
  readonly user = this.authService.user;

  logout(): void {
    this.authService.logout();
    window.location.reload();
    window.location.href = '/';

  }
}
