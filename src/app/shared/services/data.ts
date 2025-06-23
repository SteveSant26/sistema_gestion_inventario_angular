import { Injectable } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Adapter } from '@shared/interfaces/adapter';

@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor(private http: HttpClient) { }

  getLocalJson<T>(route: string, adapter?: Adapter<T>): Observable<T> {
    return this.http.get<T>(route).pipe(
      map((response: any) => adapter ? adapter(response) : response)
    );
  }

  getLocalJsonReadOnly<T>(route: string, adapter?: Adapter<T>): HttpResourceRef<T> {
    return httpResource<any>(
      () => route,
      {
        parse: (response: any) => adapter ? adapter(response) : response
      }
    );
  }
}
