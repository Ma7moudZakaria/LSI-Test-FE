import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkthroughHasUnsavedDataGuard } from 'src/app/core/guards/walkthrough-has-unsaved-data-guard';
import { ViewAllWalkThroughComponent } from './components/view-all-walk-through/view-all-walk-through';
import { WalkThroughComponent } from './components/view-all-walk-through/walk-through/walk-through';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'create-walk-through', component: WalkThroughComponent},
      { path: 'update-walk-through/:id', component: WalkThroughComponent},
      { path: 'view-all-walk-through', component: ViewAllWalkThroughComponent, canDeactivate: [WalkthroughHasUnsavedDataGuard]},
     ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkthroughRoutingModule { }
