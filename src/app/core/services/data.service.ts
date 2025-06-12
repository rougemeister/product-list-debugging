import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { Dessert } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/data.json';
  constructor(private http: HttpClient) { }

  getDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.apiUrl);
  }

  getDessertById(id: number): Observable<Dessert> {
    return this.http.get<Dessert>(`${this.apiUrl}/${id}`);
  }
}
