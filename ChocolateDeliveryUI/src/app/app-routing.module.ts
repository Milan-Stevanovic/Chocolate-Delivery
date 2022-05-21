import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboars.component';
import { ProfileComponent } from './dashboardElements/profile/profile.component';
import { EntryComponent } from './entry/entry.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './auth/admin.guard';
import { CustomerAuthGuard } from './auth/customer.guard';
import { DelivererAuthGuard } from './auth/deliverer.guard';
import { VerificationComponent } from './dashboardElements/verification/verification.component';

const routes: Routes = [
  // every user
  { path: '', redirectTo: '/entry', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },

  // customer

  // deliverer

  // admin
  { path: 'verification', component: VerificationComponent, canActivate:[AuthGuard, AdminAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
