import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AnalysisService } from '../services/analysis.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  public chart: any;

  constructor(private analysisService: AnalysisService) {}

  ngOnInit(): void {
    this.getChartData();
  }
  getChartData() {
    // Calculate the start date 30 days before today
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

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
      intervalRapport: 'DAY',
    };

    // Make the API call to fetch analysis report
    this.analysisService.getAnalysisReport(requestBody).subscribe(
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

    this.chart = new Chart('MyChart', {
      type: 'bar', // This denotes the type of chart

      data: {
        // Values on X-Axis
        labels: labels,
        datasets: [
          {
            label: 'Analysis',
            data: analysisData,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
