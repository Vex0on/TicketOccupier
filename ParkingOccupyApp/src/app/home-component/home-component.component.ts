import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/dataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  parkSpots$: Observable<any[]> = of([]);
  
    constructor(private dataService: DataService, private router: Router) {}
  
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

    navigateToHistory(id: number): void {
      this.router.navigate(['/history', id]);
    }
  }
