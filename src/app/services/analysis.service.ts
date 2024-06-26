import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const baseUrl = 'http://localhost:8080/analysis';
const testbaseUrl = 'http://localhost:8080/test';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/all`);
  }

  getById(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/result/${id}`);
  }
  setTest(idtest: any, value: any): Observable<any> {
    return this.http.get<any>(`${testbaseUrl}/${idtest}/${value}`);
  }
  create(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/add`, data);
  }
  getAnalysisReport(requestBody: any): Observable<any[]> {
    return this.http.post<any[]>(`${baseUrl}/rapport`, requestBody);
  }
  getAnalysisReportMonthly(requestBody: any): Observable<any[]> {
    return this.http.post<any[]>(`${baseUrl}/rapport`, requestBody);
  }
  getAnalysisCount(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/count`);
  }
}
