import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/component.module';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [AppComponent, SafePipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule,
    ComponentsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
