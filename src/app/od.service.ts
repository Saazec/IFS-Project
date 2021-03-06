import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IOD } from './operational-data/IOD'
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ODService {

  // private url = 'api/dummy/operational-data.json';
  constructor(private http: HttpClient, private apiservice: ApiService) { }

  getAll(): Observable<IOD[]> {
    return this.apiservice.getData('operational')
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = `An Error Occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
