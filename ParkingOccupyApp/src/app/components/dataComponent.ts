import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-park-spot-list',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class dataComponent implements OnInit {
  parkSpots$: Observable<any[]> = of([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log('Initializing dataComponent...');
    this.refreshParkSpots();
  }

  async releaseParkSpot(id: number): Promise<void> {
    try {
      await this.dataService.releaseParkSpot(id).toPromise();
      const updatedParkSpots = await this.dataService.getParkSpots().toPromise();
      if (updatedParkSpots) {
        this.parkSpots$ = of(updatedParkSpots);
        console.log('Parking spot released successfully!');
      } else {
        console.error('Error updating parking spots: data is undefined');
      }
    } catch (error) {
      console.error('Error releasing parking spot:', error);
    }
  }

  private refreshParkSpots(): void {
    this.parkSpots$ = this.dataService.getParkSpots();
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
