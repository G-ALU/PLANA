import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private baseUrl = 'http://localhost:5500/users/switch-role'

  constructor(private http: HttpClient) { }

  switchRoleToUser(user_id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}`, { user_id: user_id });
  }
}
