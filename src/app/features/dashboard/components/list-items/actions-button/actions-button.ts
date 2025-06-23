import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actions-button',
  imports: [MatIconModule,CommonModule],
  templateUrl: './actions-button.html'
})
export class ActionsButton {
  onclickEventEdit = output<void>();
  onclickEventDelete = output<void>();

  sendOnClickEventEdit() {
    this.onclickEventEdit.emit();
  }
  sendOnclickEventDelete() {
    this.onclickEventDelete.emit();
  }


}
