import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddParcel } from "app/_models/farm/addparcel";
import { EditParcel } from "app/_models/farm/editparcel";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class FarmService {
  parcelsUrl = environment.apiUrl + "parcels";

  constructor(private http: HttpClient) {}

  getParcels() {
    return this.http.get(this.parcelsUrl);
  }

  addParcel(model: AddParcel) {
    return this.http.post(this.parcelsUrl, model);
  }

  editParcel(model: EditParcel) {
    return this.http.put(this.parcelsUrl, model);
  }

  deleteParcel(parcelId: number) {
    return this.http.delete(this.parcelsUrl + `/${parcelId}`);
  }
}
