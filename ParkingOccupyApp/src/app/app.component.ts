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
}
