import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
    heroesUrl: string;
    textfile: string;
}

@Injectable()
export class ConfigService {
    configUrl = 'assets/config.json';

    constructor (private http: HttpClient){

    }

    getConfig(){
        return this.http.get<Config>(this.configUrl)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            )
    }

    private handleError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent){
            console.error('An error occurred:', error.error.message);
        } else {
            console.error (
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }

        return throwError(
            'Something bad happened; please try again later,');
    }

    getConfig_1(){
        return this.http.get(this.configUrl);
    }

    getConfig_2(){
        // now returns an Observable of Config
        return this.http.get<Config>(this.configUrl);
    }

    getConfig_3(){
        return this.http.get<Config>(this.configUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    getConfigResponse(): Observable<HttpResponse<Config>> {
        return this.http.get<Config>(
          this.configUrl, { observe: 'response' });
    }

    makeIntentionalError() {
        return this.http.get('not/a/real/url')
            .pipe(
                catchError(this.handleError)
            );
    }



}