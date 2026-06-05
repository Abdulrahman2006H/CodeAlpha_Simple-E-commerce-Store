import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  get user(): any {
    return this.getUser();
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        alert("Login successful!");
        
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('bookmuse-cart');

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user') || !!localStorage.getItem('token');
  }

getUser(): any {
  const user = localStorage.getItem('user');

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

  getUserId(): number | null {
  let user = this.getUser();
  user = user.user;
  if (!user) return null;

  return user.id || user.userId || user.Id || user.UserId || null;
}
}