import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap,catchError,filter,take } from 'rxjs/operators';
import { LoginResponse } from './components/auth/login/login-response.payload';

@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptor implements HttpInterceptor {

    // // These act as semaphores to block the outgoing requests
    // isTokenRefreshing: boolean = false;
    // refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    // constructor(public authService: AuthService) {
    // }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     // Guard condition to skip the process if we are making an API call to refresh token and login
    //     if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
    //         return next.handle(req);
    //     }

    //     // fetch the jwt token from the service (local storage)
    //     const jwtToken = this.authService.getJwtToken();

    //     if (jwtToken) {
    //         return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
    //             if (error instanceof HttpErrorResponse && error.status === 403) {
    //                 return this.handleAuthErrors(req, next);
    //             } else {
    //                 return throwError(error);
    //             }
    //         }));
    //     }
    //     return next.handle(req);
    // }
    
    // // We have to temporarily block all the outgoing back-end calls for the user, when call to
    // // refresh token is being given. Once we get the new Authentication token from the backend
    // // we will release all the requests again. For this purpose we use: "isTokenRefreshing" and 
    // // "refreshTokenSubject"
    
    // private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (!this.isTokenRefreshing) {
    //         this.isTokenRefreshing = true;
    //         this.refreshTokenSubject.next(null);

    //         return this.authService.refreshToken().pipe(
    //             switchMap((refreshTokenResponse: LoginResponse) => {
    //                 this.isTokenRefreshing = false;
    //                 this.refreshTokenSubject
    //                     .next(refreshTokenResponse.authenticationToken);
    //                 return next.handle(this.addToken(req,
    //                     refreshTokenResponse.authenticationToken));
    //             })
    //         )
    //     } else {
    //         return this.refreshTokenSubject.pipe(
    //             filter(result => result !== null),
    //             take(1),
    //             switchMap((res) => {
    //                 return next.handle(this.addToken(req,
    //                     this.authService.getJwtToken()))
    //             })
    //         );
    //     }
    // }

    // addToken(req: HttpRequest<any>, jwtToken: any) {
    //     return req.clone({
    //         headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    //     });
    // }

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }



}