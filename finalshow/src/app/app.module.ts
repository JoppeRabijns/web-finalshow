import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoadingComponent,
    CountdownTimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
