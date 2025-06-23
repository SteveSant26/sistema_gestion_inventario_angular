import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message-box',
  imports: [],
  template: `
      <p class="bg-red-background-own text-black rounded-lg m-4 p-4 text-[0.95rem] 
      break-words max-w-full sm:text-[0.85rem] sm:m-3 sm:p-3">
        {{ error_message() }}
    </p>`
})
export class ErrorMessageBox {
  error_message = input<string>('');
}
