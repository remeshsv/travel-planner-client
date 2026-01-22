
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ApiService, RecommendationRequest } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('travel-planner-client');

  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  year = new Date().getFullYear();
  loading = false;
  error = '';
  recommendations: any = null;

  places: string[] = [
    'Paris, France', 'London, United Kingdom', 'New York, USA', 'Tokyo, Japan',
    'Dubai, UAE', 'Singapore', 'Rome, Italy', 'Barcelona, Spain',
    'Bali, Indonesia', 'Sydney, Australia', 'Toronto, Canada', 'Bangkok, Thailand',
    'Cape Town, South Africa', 'Cancún, Mexico', 'Istanbul, Türkiye', 'Honolulu, USA',
    'Lisbon, Portugal', 'Zurich, Switzerland', 'Reykjavík, Iceland', 'San Francisco, USA'
  ];

  // Safe to initialize here because `inject()` is resolved before field init
  plannerForm = this.fb.group({
    place: ['', [Validators.required, Validators.minLength(2)]],
    people: ['solo' as 'solo' | 'couple' | 'family', [Validators.required]],
    date: ['', [Validators.required]],
  });

  onSubmit() {
    this.error = '';
    this.recommendations = null;

    if (this.plannerForm.invalid) {
      this.error = 'Please fill in destination, traveler type, and date.';
      return;
    }

    const { place, people, date } = this.plannerForm.value;
    const payload: RecommendationRequest = { place: place!, people: people!, date: date! };

    this.loading = true;
    this.api.getRecommendations(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.recommendations = res;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Sorry, we could not fetch recommendations right now.';
        console.error(err);
      }
    });
  }
}
