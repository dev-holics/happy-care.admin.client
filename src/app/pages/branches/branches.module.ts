import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { BranchesRoutingModule } from "./branches-routing.module";
import { BranchDialogComponent } from "./components/branch-dialog/branch-dialog.component";
import { BranchesComponent } from "./components/branches/branches.component";


@NgModule({
  imports: [CommonModule, BranchesRoutingModule, SharedModule.forRoot()],
  declarations: [
    BranchesComponent,
    BranchDialogComponent
  ],
})
export class BranchesModule {}
