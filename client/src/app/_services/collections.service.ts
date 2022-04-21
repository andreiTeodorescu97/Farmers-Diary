import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { County } from "app/_models/farm/county";
import { Culture } from "app/_models/farm/culture";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class CollectionsService {
  url = environment.apiUrl + "collections/";

  constructor(private http: HttpClient) {}

  getCultures() {
    return this.http.get<{ [key: string]: Culture }>(this.url + "cultures");
  }

  getCounties() {
    return this.http.get<{ [key: string]: County }>(this.url + "counties");
  }
}
