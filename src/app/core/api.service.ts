import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Tips, TeamAnalysis, ChipsPlan } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  meta()              { return this.http.get<Meta>('/api/meta'); }
  tips()              { return this.http.get<Tips>('/api/tips'); }
  team(id: number)    { return this.http.get<TeamAnalysis>(`/api/team/${id}`); }
  chips(id: number)   { return this.http.get<ChipsPlan>(`/api/team/${id}/chips`); }
}