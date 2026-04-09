import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreatePatientPayload,
  PagedResult,
  Patient,
} from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/patients';

  constructor(private http: HttpClient) {}

  create(body: CreatePatientPayload) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
  }

  update(id: number, body: any) {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  createdAfter(fromDate: string) {
    let params = new HttpParams().set('fromDate', fromDate);

    return this.http.get<Patient[]>(`${this.myAppUrl}${this.myApiUrl}/report`, {
      params,
    });
  }

  getAll(
    page: number,
    pageSize: number,
    name?: string,
    documentNumber?: string,
  ): Observable<PagedResult<Patient>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (name) params = params.set('name', name);
    if (documentNumber) params = params.set('documentNumber', documentNumber);

    return this.http.get<PagedResult<Patient>>(
      `${this.myAppUrl}${this.myApiUrl}`,
      { params },
    );
  }
}
