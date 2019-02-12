import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFS } from './ifs-data/IFS'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class IfsServiceService {
  private url = 'api/dummy/ifs-data.json';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  getAll(): Observable<IFS[]> {
    return this.apiService.getData('ifs')
      .pipe(
        tap( data => JSON.stringify(data)),
        catchError(this.errorHandler)
      );
  }

  add(data: IFS): void {
    console.log(data);
    // Post request will come here
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
