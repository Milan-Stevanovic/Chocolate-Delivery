import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboars.component';
import { ProfileComponent } from './profile/profile.component';
import { EntryComponent } from './entry/entry.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './auth/admin.guard';
import { CustomerAuthGuard } from './auth/customer.guard';
import { DelivererAuthGuard } from './auth/deliverer.guard';

const routes: Routes = [
  { path: '', redirectTo: '/entry', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
