import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsService } from '@shared/services/notificactions';
import NotificationType from '@shared/types/notification.type';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, MatIconModule],
  templateUrl: './notification.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  notificationsService = inject(NotificationsService);
  notificationType: NotificationType = NotificationType.AlertError;
  message = signal('');
  showAlert = signal(false);

  ngOnInit() {
    this.notificationsService.alert$.subscribe((res: any) => {
      this.showAlert.set(true);
      this.message.set(res.message);
      this.notificationType = res.notificationType;
      setTimeout(() => {
        this.showAlert.set(false);
      }, res.time);
    });
  }
}
