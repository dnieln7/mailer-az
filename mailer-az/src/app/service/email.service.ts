import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Email} from '../model/email';
import {EmailResponse} from '../model/email-response';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) {
  }

  private functionURL = 'https://mailingform.azurewebsites.net/api/sendmail?code=spquJAo3ggbvFFaUzgt6J7UWlRx5XKPMdjLujAz8XzHkDbWGyvac9Q==';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    })
  };

  private static handleError(error: any): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }

  public send(entity: Email): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.functionURL, entity, this.httpOptions)
      .pipe(retry(1), catchError(EmailService.handleError));
  }
}
