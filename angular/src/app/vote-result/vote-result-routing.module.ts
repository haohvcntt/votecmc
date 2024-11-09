import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoteResultComponent } from './vote-result.component';

const routes: Routes = [{ path: '', component: VoteResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoteResultRoutingModule { }
