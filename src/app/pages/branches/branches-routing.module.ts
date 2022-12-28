import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/shared/helpers/auth.guard';
import { BranchesComponent } from './components/branches/branches.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    data: {
      breadcrumb: 'Branches',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
