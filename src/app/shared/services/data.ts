import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor(private http: HttpClient) { }

  getLocalJson(route: string): Observable<any> {
    return this.http.get(route);
  }

}

