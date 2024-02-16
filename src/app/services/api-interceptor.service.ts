import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiInterceptorService implements HttpInterceptor {
  modifiedRequest!: HttpRequest<any>;
  loading = false;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add your API key to the headers
    const apiKey = environment.apiKey;

    if (request.url.startsWith(environment.apiUrl)) {
      this.modifiedRequest = request.clone({
        setHeaders: {
          apiKey: apiKey,
        },
      });
    } else if (request.url.startsWith(environment.onesignalApi)) {
      this.modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Basic ${environment.onesignalKey}`,
        },
      });
    } else {
      // Handle other cases if needed
      this.modifiedRequest = request.clone();
    }

    return next.handle(this.modifiedRequest);
    // Pass the modified request to the next interceptor or the HTTP handler
  }
}
