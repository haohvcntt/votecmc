import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CandidateCardComponent } from '../candidate-card/candidate-card.component';
import { CandidateManagementComponent } from '../candidate-management/candidate-management.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule,
    HomeRoutingModule, 
    CandidateCardComponent, 
    CandidateManagementComponent,
    TabViewModule
  ],
})
export class HomeModule {}
