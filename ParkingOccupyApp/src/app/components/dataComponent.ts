import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService';
import { Observable, of } from 'rxjs';

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
        this.parkSpots$ = this.dataService.getParkSpots();
      }
    }