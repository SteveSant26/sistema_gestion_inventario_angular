import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../../shared/layouts/sidebar/sidebar";

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Sidebar],
  template: `
<div class="flex flex-col md:flex-row antialiased">
  <app-sidebar class="w-full md:w-80"></app-sidebar> 
  <main class="flex-1 p-4">

    <router-outlet></router-outlet>
  </main>
</div>

  `
})
export class DashboardLayout {

}



