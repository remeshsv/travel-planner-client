
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecommendationRequest {
  place: string;
  people: 'solo' | 'couple' | 'family';
  date: string;  // yyyy-mm-dd
}

export interface Activity {
  time: string;
  location: string;
  description: string;
  type: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export interface RecommendationResponse {
  itinerary: ItineraryDay[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'http://localhost:8080/api';

  getRecommendations(payload: RecommendationRequest): Observable<RecommendationResponse> {
    console.log('API Service - getRecommendations called with payload:', payload);
    return this.http.post<RecommendationResponse>(`${this.baseUrl}/recommendations`, payload);
  }
}
