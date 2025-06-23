import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  template: `
  <h2 class="w-full text-xl md:text-2xl text-center font-bold p-2 bg-highlight-own text-white-own rounded-t-md">
    {{ headerTitle() }}
</h2>`
})
export class SectionHeader {
  headerTitle = input<string>('');
  
}
