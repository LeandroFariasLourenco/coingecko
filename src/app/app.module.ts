import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: {
        slidesPerView: 'auto',
        direction: 'horizontal',
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
          reverseDirection: true,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        }
      } as SwiperConfigInterface
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
