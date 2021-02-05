import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { ClientAddEditComponent } from './client-add-edit/client-add-edit.component';

const routes: Routes = [
  { path: '', component: ClientsComponent, pathMatch: 'full' },
  { path: 'client/:id', component: ClientComponent },
  { path: 'add', component: ClientAddEditComponent },
  { path: 'client/edit/:id', component: ClientAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
