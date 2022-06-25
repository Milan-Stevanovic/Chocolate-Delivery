import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboars.component';
import { ProfileComponent } from './dashboardElements/profile/profile.component';
import { EntryComponent } from './entry/entry.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './auth/admin.guard';
import { CustomerAuthGuard } from './auth/customer.guard';
import { DelivererAuthGuard } from './auth/deliverer.guard';
import { VerificationComponent } from './dashboardElements/adminPages/verification/verification.component';
import { NewCurrentOrderComponent } from './dashboardElements/customerPages/newCurrentOrder/newCurrentOrder.component';
import { NewOrdersComponent } from './dashboardElements/delivererPages/newOrders/newOrders.component';
import { CustomerCurrentOrderComponent } from './dashboardElements/customerPages/newCurrentOrder/customerCurrentOrder/customerCurrentOrder.component';
import { CustomerNewOrderComponent } from './dashboardElements/customerPages/newCurrentOrder/customerNewOrder/customerNewOrder.component';
import { AddNewProductComponent } from './dashboardElements/adminPages/addNewProduct/addNewProduct.component';
import { PastOrdersComponent } from './dashboardElements/customerPages/pastOrders/pastOrders.component';
import { MyOrdersComponent } from './dashboardElements/delivererPages/myOrders/myOrders.component';
import { AllOrdersComponent } from './dashboardElements/adminPages/allOrders/allOrders.component';
import { CurrentOrderComponent } from './dashboardElements/delivererPages/currentOrder/currentOrder.component';
import { DelivererNoOrderComponent } from './dashboardElements/delivererPages/currentOrder/delivererNoOrder/delivererNoOrder.component';
import { DelivererCurrentOrderCompoenent } from './dashboardElements/delivererPages/currentOrder/delivererCurrentOrder/delivererCurrentOrder.component';
import { ChangePasswordComponent } from './dashboardElements/changePassword/changePassword.component';

const routes: Routes = [
  // every user
  { path: '', redirectTo: '/entry', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate:[AuthGuard] },
  
  // customer
  { path: 'newCurrentOrder', component: NewCurrentOrderComponent, canActivate:[AuthGuard]},
  { path: 'customerNewOrder', component: CustomerNewOrderComponent, canActivate:[AuthGuard]},
  { path: 'customerCurrentOrder', component: CustomerCurrentOrderComponent, canActivate:[AuthGuard]},
  { path: 'pastOrders', component: PastOrdersComponent, canActivate:[AuthGuard]},
  
  // deliverer
  { path: 'newOrders', component: NewOrdersComponent, canActivate:[AuthGuard, DelivererAuthGuard]},
  { path: 'myOrders', component: MyOrdersComponent, canActivate:[AuthGuard]},
  { path: 'currentOrder', component: CurrentOrderComponent, canActivate:[AuthGuard]},
  { path: 'delivererCurrentOrder', component: DelivererCurrentOrderCompoenent, canActivate:[AuthGuard]},
  { path: 'delivererNoOrder', component: DelivererNoOrderComponent, canActivate:[AuthGuard]},
  
  // admin
  { path: 'verification', component: VerificationComponent, canActivate:[AuthGuard, AdminAuthGuard] },
  { path: 'allOrders', component: AllOrdersComponent, canActivate:[AuthGuard, AdminAuthGuard] },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate:[AuthGuard, AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
