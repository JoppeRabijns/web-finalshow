import { MobileModule } from './../mobile/mobile.module';
import { MobileComponent } from './../mobile/mobile.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AnimationModule } from 'src/animation/animation.module';
import { HubModule } from 'src/hub/hub.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [	
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnimationModule,
    HubModule,
    NgbModule,
    MobileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
