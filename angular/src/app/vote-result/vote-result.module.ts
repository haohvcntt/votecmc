import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteResultRoutingModule } from './vote-result-routing.module';
import { VoteResultComponent } from './vote-result.component';


@NgModule({
  declarations: [
    VoteResultComponent
  ],
  imports: [
    CommonModule,
    VoteResultRoutingModule
  ]
})
export class VoteResultModule { }
