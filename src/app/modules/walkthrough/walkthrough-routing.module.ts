import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllWalkThroughComponent } from './components/view-all-walk-through/view-all-walk-through';
import { WalkThroughComponent } from './components/walk-through/walk-through';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'create-walk-through', component: WalkThroughComponent},
      { path: 'update-walk-through/:id', component: WalkThroughComponent},
      { path: 'view-all-walk-through', component: ViewAllWalkThroughComponent},
     ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkthroughRoutingModule { }
