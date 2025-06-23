import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `
    <button
    [type]="type()"
      class="text-white rounded-md px-5 py-2 text-sm transition-all duration-300 bg-primary-btn-own hover:bg-secondary-btn-own hover:cursor-pointer"

    >
      {{ btnLabel() }}
    </button>
  `
})
export class Button {
  btnLabel = input<string>('Send');
  type = input<string>('submit');

}
