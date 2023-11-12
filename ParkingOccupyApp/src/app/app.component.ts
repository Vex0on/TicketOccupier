import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './services/dataService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ParkingOccupyApp';
  parkSpots$: Observable<any[]> = of([]);
  
    constructor(private dataService: DataService) {}
  
    ngOnInit(): void {
      this.parkSpots$ = this.dataService.getParkSpots();
    }

    releaseParkSpot(id: number): void {
      this.dataService.releaseParkSpot(id).subscribe(
        response => {
          console.log('Parking spot released successfully!', response);
          this.parkSpots$ = this.dataService.getParkSpots();
        },
        error => {
          console.error('Error releasing parking spot:', error);
        }
      );
    }

    showHistory(id: number): void {
      this.dataService.getSpotHistory(id).subscribe(
        history => {
          console.log('Spot history:', history);
        },
        error => {
          console.error('Error fetching spot history:', error);
        }
      );
    }
  }

