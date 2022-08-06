import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBanner } from './types/banner-data';

@Injectable({
    providedIn: 'root',
})
export class BannerService{

    getBanner(): Observable<IBanner>{
        let banner: IBanner = {
          data: 'https://i.picsum.photos/id/1010/200/200.jpg?hmac=030jCT8DyI2wW-CYue7-l9xlHBAGpacaSJ6tYnnka3I',
        }
        return of(banner)
        .pipe(
            catchError( (this.handleError))
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage: string;
        
        if( err.error instanceof ErrorEvent){
            //client side or newtwork error
            errorMessage = `An error ocurred getting banner: ${err.error.message}`;
        } else {
            //error in backend
            errorMessage = `Backend returned error code getting banner ${err.message}`;
        }
        return throwError(() => errorMessage);
    }
}
