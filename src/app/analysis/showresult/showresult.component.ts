import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from 'src/app/services/analysis.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.css'],
})
export class ShowresultComponent implements OnInit {
  AnalysisResult?: any;
  logoDataUrl: string;

  constructor(
    private analysisService: AnalysisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadLogo();
    this.retrieveAnalysisResult();
  }

  public downloadInvoice() {
    const doc = new jsPDF();
    doc.addImage(this.logoDataUrl, 'PNG', 10, 10, 80, 20);
    autoTable(doc, {
      body: [
        [
          {
            content: '',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
          {
            content: '',
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
        fillColor: '',
      },
    });
    autoTable(doc, {
      startY: 40,
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
              '\nStatus : ' +
              this.AnalysisResult.status,
            styles: {
              halign: 'left',
            },
          },
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
      head: [['test name', 'min', 'max', 'result', 'result status', 'status']],
      body: this.AnalysisResult.testsDTO.map((item) => [
        item.nameTest,
        item.min,
        item.max,
        item.resultTest,
        item.result,
        item.status,
      ]),
      theme: 'striped',
      headStyles: {
        fillColor: '#343a40',
      },
    });

    return doc.save(
      `AnalysisResult_` +
        this.AnalysisResult.patientDTO.firstname +
        `-` +
        this.AnalysisResult.patientDTO.lastname +
        `-` +
        new Date().toISOString().slice(0, 10) +
        `.pdf`
    );
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

  loadLogo() {
    this.http
      .get('http://localhost:4200/assets/images/labxpert-logo.png', {
        responseType: 'blob',
      })
      .subscribe((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoDataUrl = reader.result.toString();
        };
        reader.readAsDataURL(blob);
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
