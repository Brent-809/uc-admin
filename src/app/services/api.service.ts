import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface loginResponse {
  token: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.apiUrl;
  token!: string;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  updateUser(_id: string, req: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/users/${_id}`, req);
  }

  verifyUser(userId: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/users/${userId}/verify`, {});
  }

  declineUser(userId: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/users/${userId}/decline/remove`,
      {}
    );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  countUsers(): Observable<{ count: number }> {
    const url = `${this.baseUrl}/users/count`;
    return this.http.get<{ count: number }>(url);
  }

  countYetToVerify(): Observable<{ count: number }> {
    const url = `${this.baseUrl}/users/count/toverify`;
    return this.http.get<{ count: number }>(url);
  }

  countGroups(): Observable<{ count: number }> {
    const url = `${this.baseUrl}/groups/count`;
    return this.http.get<{ count: number }>(url);
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/groups/${id}/delete`, id);
  }

  loginUser(user: any): Observable<loginResponse> {
    return this.http
      .post<loginResponse>(`${this.baseUrl}/auth/login`, user)
      .pipe(
        map((response) => {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          return response;
        })
      );
  }

  uploadImage(config: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', config.requestBody, config.originalFileName); // Modify this line

    const url = `https://api.upload.io/v2/accounts/${config.accountId}/uploads/form_data`;
    return this.http.post(url, formData, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'X-Upload-Metadata': JSON.stringify(config.metadata),
      },
    });
  }

  createGroup(groupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/groups`, groupData);
  }

  editGroup(groupId: string, groupData: any): Observable<any> {
    const url = `${this.baseUrl}/groups/${groupId}/edit`;
    return this.http.post(url, groupData);
  }

  getGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/groups/`);
  }

  getGroupById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/groups/${id}`);
  }
}
