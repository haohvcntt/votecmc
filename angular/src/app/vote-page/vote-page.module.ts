import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotePageRoutingModule } from './vote-page-routing.module';
import { VotePageComponent } from './vote-page.component';
import { CandidateCardComponent } from '../candidate-card/candidate-card.component';
import { CandidateManagementComponent } from '../candidate-management/candidate-management.component';


@NgModule({
  declarations: [
    VotePageComponent
  ],
  imports: [
    CommonModule,
    VotePageRoutingModule,
    CandidateCardComponent,
    CandidateManagementComponent
  ]
})
export class VotePageModule { }
