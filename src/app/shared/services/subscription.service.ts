import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export default class SubscriptionService {
  public unsubscribeComponent$ = new Subject<void>();

  public unsubscribe$ = this.unsubscribeComponent$.asObservable();
}
