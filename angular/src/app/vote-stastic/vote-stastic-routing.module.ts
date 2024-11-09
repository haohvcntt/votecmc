import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoteStasticComponent } from './vote-stastic.component';

const routes: Routes = [{ path: '', component: VoteStasticComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoteStasticRoutingModule { }
