import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSubject = new Subject<{ summary: string; detail: string }>();
  errors$ = this.errorSubject.asObservable();

  emit(summary: string, detail: string) {
    this.errorSubject.next({ summary, detail });
  }
}
