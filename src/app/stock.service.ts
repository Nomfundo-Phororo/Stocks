import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Stock } from './stock';
import {StockDetail} from './stockDetail';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocksUrl = 'assets/Stocks.json';
  private stocksdetailUrl = 'assets/StockValues.json'

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getAllStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(this.stocksUrl)
  .pipe(tap(data => console.log('All:')),
      catchError(this.handleError));
  }
  getAllStockdetail(): Observable<StockDetail[]> {
    return this.httpClient.get<StockDetail[]>(this.stocksdetailUrl)
    .pipe(tap(data => console.log('All:' )),
      catchError(this.handleError));
  }
  searchStocks(term: string): Observable<Stock[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Stock[]>(`${this.stocksUrl}/?stock=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found Stocks matching "${term}"`) :
        console.log(`no Stocks matching "${term}"`)),
      catchError(this.handleError)
    );
  }

}
