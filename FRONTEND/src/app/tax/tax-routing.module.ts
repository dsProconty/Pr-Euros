import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [

  { path: 'tax', redirectTo: 'tax/index', pathMatch: 'full'},
  { path: 'tax/index', component: IndexComponent },
  { path: 'tax/create', component: CreateComponent },
  { path: 'tax/edit/:idTax', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
