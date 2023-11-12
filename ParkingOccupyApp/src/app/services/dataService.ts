import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor() {}

  getParkSpots(): Observable<any> {
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
}