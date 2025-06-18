  import { CommonModule } from '@angular/common';
  import { Component, input, output } from '@angular/core';

  @Component({
    selector: 'app-button',
    imports: [CommonModule],
  template: `
    <button
      type="submit"
      [disabled]="disabled()"
      (click)="sendOnClickEvent()"
      class="text-white rounded-md px-5 py-2 text-sm transition-all duration-300"
      [ngClass]="disabled() 
        ? 'bg-primary-btn-own cursor-not-allowed' 
        : 'bg-primary-btn-own hover:bg-secondary-btn-own hover:cursor-pointer'"
    >
      {{ btnLabel() }}
    </button>
  `
  })
  export class Button {
    disabled = input<boolean>(false);
    btnLabel = input<string>('Send');

    onclickEvent = output<void>();

    ngOnInit(): void {
      console.log('ngOnInit');
      console.log(this.disabled());
    }

    sendOnClickEvent() {
      this.onclickEvent.emit();
      console.log('click');
    }


  }
