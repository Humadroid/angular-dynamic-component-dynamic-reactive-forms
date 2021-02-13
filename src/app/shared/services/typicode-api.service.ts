import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypicodeAPIService {
  URL = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  searchUser(text): Observable<any> {
    // debounce
    return timer(1000).pipe(
      switchMap(() => {
        // Check if username is available
        return this.http.get<any>(`${this.URL}/users?username=${text}`);
      })
    );
  }

  userValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value).pipe(
        map(res => {
          // if username is already taken
          if (res.length) {
            // return error
            return { userNameExists: true };
          }
        })
      );
    };
  }
}
