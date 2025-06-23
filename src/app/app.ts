import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "@shared/layouts/header/header";
import { Footer } from "@shared/layouts/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
      <div class="relative bg-primary-color overflow-x-hidden">

  <app-header></app-header>
    <main class="flex flex-grow min-h-screen flex-col bg-background-own" >

  <router-outlet></router-outlet>
    </main>
  <app-footer></app-footer>
  </div>
  `,
})
export class App {
  protected title = 'Sistema Gestión Inventario';
}


