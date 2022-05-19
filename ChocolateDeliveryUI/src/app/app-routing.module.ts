import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboars.component';
import { ProfileComponent } from './profile/profile.component';
import { EntryComponent } from './entry/entry.component';

const routes: Routes = [
  { path: '', redirectTo: '/entry', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
