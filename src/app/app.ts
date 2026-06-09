import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ModalService } from './core/utils/modal/modal.service';
import { SplashService } from './core/utils/splash/splash.service';
import { SplashScreen } from './shared/components/splash-screen/splash-screen';
import { CartService } from './core/utils/cart/cart.service';
import { CartDrawer } from './shared/components/cart-drawer/cart-drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SplashScreen, CartDrawer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frt-farmacias-peruanas');
  private router = inject(Router);
  modalService = inject(ModalService);
  splashService = inject(SplashService);
  cartService = inject(CartService);
  constructor() {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        this.splashService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.splashService.hide();
        }, 500);
      }
    });
  }
}
