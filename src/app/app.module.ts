import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRountingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

// Importaciones de Font Awesome
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Iconos sólidos


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRountingModule,
    BrowserModule,
    SharedModule,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {   }
