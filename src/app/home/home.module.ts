import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { ComponentsModule } from '../components/component.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    SharedDirectivesModule,
  ],
  declarations: [HomePage,HeaderComponent]
})
export class HomePageModule {}
