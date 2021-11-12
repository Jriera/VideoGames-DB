import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,throwError as observableThrowError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable() export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept( req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    req=req.clone({
        setHeaders:  {
            'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
            'x-rapidapi-key': '7c2325863fmsh926e1d461bb15fep19aaeajsnb37c76192724',

          },
          setParams:{
              'key': 'ff2714b4ea4b4ad1a05e76a01b144b29'
          }
    });
    return next.handle(req);
  }

}