import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../services/analysis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public count: number = 0;
  LastMonthEarning: any;

  constructor(private analysisService: AnalysisService) {}

  ngOnInit(): void {
    this.getAnalysisCount();
  }
  handleDataFromChild(data: any): void {
    this.LastMonthEarning = data;
    console.log('Received data from child:', this.LastMonthEarning);
  }
  getAnalysisCount() {
    this.analysisService.getAnalysisCount().subscribe(
      (data) => {
        this.count = data;
      },
      (error) => {
        console.error('Error fetching analysis count:', error);
      }
    );
  }
}
