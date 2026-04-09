import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
     

      catchError((error: HttpErrorResponse) => {

        let summary = 'Error de Sistema';
        let detail = 'No se pudo completar la operación';

        if (error.error && typeof error.error === 'object') {
          const backendError = error.error;
          detail = backendError.Message || detail;
        }

        switch (error.status) {
          case 400:
            summary = 'Datos Inválidos';
            break;
          case 404:
            summary = 'No Encontrado';
            break;
          case 500:
            summary = 'Error en Servidor';
            break;
          case 0:
            summary = 'Sin Conexión';
            detail = 'No se pudo conectar con el servidor.';
            break;
        }

        this.errorService.emit(summary, detail);


        return throwError(() => error);
      }),
    );
  }
}
