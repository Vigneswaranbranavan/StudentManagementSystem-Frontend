import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:7058/api/Auth/login';

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<{
    role: string; token: string
  }> {
    return this.http.post<{ token: string; user: { role: string } }>(`${this.apiUrl}`, { email, password })
      .pipe(map(response => ({
        token: response.token,
        role: response.user.role
      }))
      );
  }

}
// transforming the API response to extract and format only the token and role