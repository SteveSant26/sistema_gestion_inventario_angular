import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import NotificationType from '../types/notification.type';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private alertSource = new Subject()
    alert$ = this.alertSource.asObservable()
    constructor() { }

    showAlert(message: string, notificationType: NotificationType, time: number = 5000) {
        this.alertSource.next({ message, notificationType, time })
    }

}
