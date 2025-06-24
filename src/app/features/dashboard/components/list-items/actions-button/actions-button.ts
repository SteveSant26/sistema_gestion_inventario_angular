import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '@features/auth/services';

@Component({
  selector: 'app-actions-button',
  imports: [MatIconModule,CommonModule],
  templateUrl: './actions-button.html'
})
export class ActionsButton {
  onclickEventEdit = output<void>();
  onclickEventDelete = output<void>();

  private authService = inject(Auth);

  sendOnClickEventEdit() {
    this.onclickEventEdit.emit();
  }
  sendOnclickEventDelete() {
    this.onclickEventDelete.emit();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }


}
