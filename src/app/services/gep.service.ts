import { Injectable } from '@angular/core';
import {Gep} from '../shared/models/gep';
import {sample_gep} from '../../../backend/src/data';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, GEPS_BY_ID_URL, GEPS_URL} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class GepService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/api/geps`);
  }

  getGepById(gepId: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/api/geps/${gepId}`);
  }
}
