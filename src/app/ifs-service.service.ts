import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFS } from './ifs-data/IFS'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class IfsServiceService {
  // private url = 'api/dummy/ifs-data.json';
  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  getAll(): Observable<IFS[]> {
    return this.apiService.getData('ifs')
      .pipe(
        tap( data => JSON.stringify(data)),
        catchError(this.errorHandler)
      );
  }

  addData(data: IFS): Observable<IFS> {
    return this.apiService.postData('ifs', data)
      .pipe(
        tap(_data => JSON.stringify(_data)),
        catchError(this.errorHandler)
      )
  }

  updateData(data: IFS): Observable<IFS> {
    return this.apiService.putData('ifs', data)
      .pipe(
        tap(_data => JSON.stringify(_data)),
        catchError(this.errorHandler)
      )
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = `An Error Occured ${err.error.message}`;
    } else {
      // errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
      errorMessage = err.error;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }
}
