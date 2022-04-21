import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  url = environment.apiUrl + "collections/";

  constructor(private http: HttpClient) { }

  getCultures(){
    return this.http.get(this.url + "cultures");
  }

  getCounties(){
    return this.http.get(this.url + "counties");
  }
}
