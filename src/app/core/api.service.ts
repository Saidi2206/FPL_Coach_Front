
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Tips, TeamAnalysis, ChipsPlan } from './models';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  meta() {
    return this.http.get<Meta>(`${this.API_URL}/api/meta`);
  }

  tips() {
    return this.http.get<Tips>(`${this.API_URL}/api/tips`);
  }

  team(id: number) {
    return this.http.get<TeamAnalysis>(`${this.API_URL}/api/team/${id}`);
  }

  chips(id: number) {
    return this.http.get<ChipsPlan>(`${this.API_URL}/api/team/${id}/chips`);
  }
}
