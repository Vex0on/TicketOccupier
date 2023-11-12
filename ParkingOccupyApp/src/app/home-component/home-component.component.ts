import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/dataService';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  parkSpots$: Observable<any[]> = of([]);
  registrationToUpdate: string = '';
  visibleUpdateForms: { [key: number]: boolean } = {};
  
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

    updateRegistration(spot: any): void {
      this.dataService.updateRegistration(spot.id, this.registrationToUpdate).subscribe(
        (response) => {
          console.log('Registration updated successfully!', response);
          this.parkSpots$ = this.dataService.getParkSpots();
          this.visibleUpdateForms[spot.id] = false;
        },
        (error) => {
          console.error('Error updating registration:', error);
        }
      );
    }
  }