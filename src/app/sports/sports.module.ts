import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportsPageRoutingModule } from './sports-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SportsPage } from './sports.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportsPageRoutingModule
  ],
  declarations: [SportsPage]
})
export class SportsPageModule {}
