import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface EmailPayload {
  fromName: string
  to: string
  subject: string
  text: string
  html: string
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly API_URL = environment.emailServerUrl
  private http = inject(HttpClient)

  sendEmail(payload: EmailPayload): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/email/send`, payload)
  }

  sendWorkbook(payload: EmailPayload): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/email/sendWorkbook`, payload)
  }

  getTemplate(fileName: string): Observable<string> {
    return this.http.get(`assets/email-templates/${fileName}`, {
      responseType: 'text',
    })
  }
}
