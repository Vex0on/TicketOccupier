import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor() {}

  private handleResponse(response: Response): any {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  getParkSpots(): Observable<any[]> {
    console.log('Getting park spots...');
    return new Observable(observer => {
      fetch(`${this.apiUrl}/parkSpots`)
        .then(response => response.json())
        .then(data => {
          console.log('Received data:', data);
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          observer.error(error);
        });
    });
  }

  getSpotHistory(id: number): Observable<any[]> {
    return new Observable((observer) => {
      fetch(`${this.apiUrl}/parkSpots/${id}`)
        .then((response) => this.handleResponse(response))
        .then((data) => {
          console.log('Received history data:', data);
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching spot history:', error);
          observer.error(error);
        });
    });
  }

  releaseParkSpot(id: number): Observable<any> {
    return new Observable(observer => {
      fetch(`${this.apiUrl}/parkSpots/release/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Received data:', data);
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          console.error('Error releasing parking spot:', error);
          observer.error(error);
        });
    });
  }

  updateRegistration(id: number, registration: string): Observable<any> {
    return new Observable((observer) => {
      fetch(`${this.apiUrl}/parkSpots/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registration }),
      })
        .then((response) => this.handleResponse(response))
        .then((data) => {
          console.log('Received data:', data);
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error updating registration:', error);
          observer.error(error);
        });
    });
  }
  
}