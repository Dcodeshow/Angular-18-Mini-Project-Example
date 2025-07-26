import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  singleClientData = 'client-data.json';
  allClientData = 'allClients.json';

  constructor(private http: HttpClient) {}

  GetAllClients() {
    return this.http.get(this.allClientData);
  }

  GetSiteByClientId(a: any) {
    return this.http.get(this.singleClientData);
  }
}
