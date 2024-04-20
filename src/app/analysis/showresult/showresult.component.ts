import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from 'src/app/services/analysis.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.css'],
})
export class ShowresultComponent implements OnInit {
  AnalysisResult?: any;
  constructor(
    private analysisService: AnalysisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveAnalysisResult();
  }

  public downloadInvoice() {
    const doc = new jsPDF();

    autoTable(doc, {
      body: [
        [
          {
            content: 'Company brand',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
          {
            content: 'Analysis Result',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff',
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              'Reference: #R' +
              this.AnalysisResult.id +
              '\nDate: ' +
              this.getFormattedDate(),
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });
    autoTable(doc, {
      body: [
        [
          {
            content:
              'Client:' +
              '\n' +
              this.AnalysisResult.patientDTO.firstname +
              ' ' +
              this.AnalysisResult.patientDTO.lastname +
              '\n',
            styles: {
              halign: 'left',
            },
          },
          {
            content:
              'Analysis:' +
              '\nResult : ' +
              (this.AnalysisResult.resultAnalysis === null
                ? 'Waiting'
                : this.AnalysisResult.resultAnalysis
                ? 'NORMAL'
                : 'ANORMAL') +
              '\nStatus :',
            styles: {
              halign: 'left',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    return doc.save('invoice');
  }

  retrieveAnalysisResult(): void {
    this.analysisService
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (res) => {
          this.AnalysisResult = res;
          console.log(this.AnalysisResult);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  getFormattedDate(): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return formattedDate;
  }
}
