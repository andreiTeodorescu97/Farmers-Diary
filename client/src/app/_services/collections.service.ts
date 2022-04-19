import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  getCultures(){
    return this.http.get(this.baseUrl + "collections/cultures");
  }

  getCounties(){
    return this.http.get(this.baseUrl + "collections/counties");
  }
}
