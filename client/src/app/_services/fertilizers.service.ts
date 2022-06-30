import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddFertilizerRegistry } from 'app/_models/farm/addfertilizerregistrydata';
import { IEditFertilizerRegistry } from 'app/_models/farm/editfertilizerregistrydata';
import { IFertilizerRegistry } from 'app/_models/farm/fertilizerregistrydata';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FertilizersService {
  postFertilizerUrl = environment.apiUrl + "parcels/applyFertilizer";
  getFertilizerUrl = environment.apiUrl + "parcels/getFertilizers";
  printUrl = environment.apiUrl + "parcels/print";

  constructor(private http: HttpClient) { }

  getFertilizersRegistry(){
    return this.http.get<IFertilizerRegistry[]>(this.getFertilizerUrl)
  }

  addFertilizersRegistry(model: IAddFertilizerRegistry){
    return this.http.post(this.postFertilizerUrl, model)
  }

  print(){
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.http.get(this.printUrl, requestOptions);
  }

  // deleteFertilizersRegistry(parcelId: number){
  //   return this.http.delete(this.postFertilizerUrl + `/${parcelId}`)
  // }
}
