
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecommendationRequest {
  place: string;
  people: 'solo' | 'couple' | 'family';
  date: string;  // yyyy-mm-dd
}

export interface RecommendationResponse {
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = '/api'; // update if you don't use proxy

  getRecommendations(payload: RecommendationRequest): Observable<RecommendationResponse> {
    console.log('API Service - getRecommendations called with payload:', payload);
    return this.http.post<RecommendationResponse>(`${this.baseUrl}/recommendations`, payload);
  }
}
