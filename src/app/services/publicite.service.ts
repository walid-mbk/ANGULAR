import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Publicite} from "../models/Publicite";

@Injectable({
  providedIn: 'root'
})
export class PubliciteService {

  constructor(public httpClient: HttpClient) { }
  getPub() {
    return this.httpClient.get<Publicite[]>("http://localhost:8081/pub");
  }
  addPub(data: any) {
    return this.httpClient.post("http://localhost:8081/Add-pub", data);
  }
  updatePub(id: number, data: any) {
    return this.httpClient.put("http://localhost:8081/updatepub/"+ id, data)
  }
  removePub(id: number) {
    return this.httpClient.delete("http://localhost:8081/pub/" + id)
  }
}
