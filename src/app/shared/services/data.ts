import { Injectable } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef, } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { parse } from 'postcss';
import { Adapter } from '@shared/interfaces/adapter';


@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor(private http: HttpClient) { }

  getLocalJson<T>(route: string, adapter: any): Observable<T> {
    return this.http.get<unknown>(route).pipe(
      map(adapter)
    );
  }

  getLocalJsonReadOnly<T>(route: string, adapter: Adapter<T>): HttpResourceRef<T> {
    return httpResource<any>(() => route, { parse: (response: any) => adapter(response) });
  }
}

