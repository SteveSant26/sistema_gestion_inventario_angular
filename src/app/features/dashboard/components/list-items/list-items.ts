import { Component, input, output } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { IInputField } from '@shared/types';
import { ErrorMessageBox } from '@shared/components/error-message-box/error-message-box';
import { ActionsButton } from './actions-button/actions-button';

@Component({
  selector: 'app-list-items',
  imports: [SectionHeader, ErrorMessageBox,ActionsButton],
  templateUrl: './list-items.html'
})
export class ListItems {
  headerTitle = input<string>('');
  formInputFields = input<IInputField[]>();
  error_message = input<string>('');

  items = input<any>();

  editEvent = output<any>();
  deleteEvent = output<any>();

  emitEditEvent(item: any) {
    this.editEvent.emit(item);
  }

  emitDeleteEvent(item: any) {
    this.deleteEvent.emit(item);
  }


  

}
