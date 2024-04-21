import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Chart from 'chart.js/auto';
import { AnalysisService } from '../services/analysis.service';
@Component({
  selector: 'app-bar-chart-monthly',
  templateUrl: './bar-chart-monthly.component.html',
  styleUrls: ['./bar-chart-monthly.component.css'],
})
export class BarChartMonthlyComponent implements OnInit {
  @Output() dataEmitter: EventEmitter<any> = new EventEmitter<any>();
  public chart: any;

  constructor(private analysisService: AnalysisService) {}

  ngOnInit(): void {
    this.getChartData();
  }

  getChartData() {
    // Calculate the start date 30 days before today
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    // Format dates to match the required format
    const formattedStartDate =
      startDate.toISOString().split('T')[0] + 'T23:59:59';
    const formattedEndDate =
      new Date().toISOString().split('T')[0] + 'T00:00:00'; // End date is today at 23:59:59

    // Prepare request body
    const requestBody = {
      analysisTypeId: 1,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      intervalRapport: 'MONTH',
    };

    // Make the API call to fetch analysis report
    this.analysisService.getAnalysisReportMonthly(requestBody).subscribe(
      (data) => {
        this.createChart(data);
      },
      (error) => {
        console.error('Error fetching analysis report:', error);
      }
    );
  }
  createChart(data: any[]) {
    // Extract labels and data from the response
    data.sort(
      (a, b) =>
        new Date(a.groupedDate).getTime() - new Date(b.groupedDate).getTime()
    );

    const labels = data.map((item) => item.groupedDate);
    const analysisData = data.map((item) => item.analysisCount);
    this.sendDataToParent(analysisData[analysisData.length - 1]);
    this.chart = new Chart('MyChartGAIN', {
      type: 'bar', // This denotes the type of chart

      data: {
        // Values on X-Axis
        labels: labels,
        datasets: [
          {
            label: 'Monthly Earnings (MAD)',
            data: analysisData,
            backgroundColor: '#4BC0C0',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  sendDataToParent(data): void {
    this.dataEmitter.emit(data);
  }
}
