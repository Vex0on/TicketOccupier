import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/dataService';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spot-history',
  templateUrl: './spot-history.component.html',
  styleUrls: ['./spot-history.component.css'],
})
export class SpotHistoryComponent implements OnInit {
  history$: Observable<any[]> = of([]);
  historyJSON: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.history$ = this.dataService.getSpotHistory(+id);
      this.history$.subscribe(
        (history) => {
          this.historyJSON = JSON.stringify(history, null, 2);
          console.log('Spot history:', history);
        },
        (error) => {
          console.error('Error fetching spot history:', error);
        }
      );
    }
  }
}
