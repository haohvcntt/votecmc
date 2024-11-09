import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteStasticRoutingModule } from './vote-stastic-routing.module';
import { VoteStasticComponent } from './vote-stastic.component';


@NgModule({
  declarations: [
    VoteStasticComponent
  ],
  imports: [
    CommonModule,
    VoteStasticRoutingModule
  ]
})
export class VoteStasticModule { }
