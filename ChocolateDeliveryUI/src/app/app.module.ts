import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboars.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './dashboardElements/profile/profile.component';
import { LoginComponent } from './entry/login/login.component';
import { RegisterComponent } from './entry/register/register.component';
import { EntryComponent } from './entry/entry.component';
import { UserService } from './shared/services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './dialogs/messageDialog/messageDialog.component';
import { VerificationComponent } from './dashboardElements/adminPages/verification/verification.component';
import { UserContainerComponent } from './dashboardElements/adminPages/verification/userContainer/userContainer.component';
import { AdminService } from './shared/services/admin.service';
import { ProductContainerComponent } from './dashboardElements/customerPages/newCurrentOrder/customerNewOrder/productContainer/productContainer.component';
import { CustomerService } from './shared/services/customer.service';
import { DelivererService } from './shared/services/deliverer.service';
import { NewOrdersComponent } from './dashboardElements/delivererPages/newOrders/newOrders.component';
import { OrderContainerComponent } from './dashboardElements/delivererPages/newOrders/orderContainer/orderContainer.component';
import { UploadComponent } from './uploadComponent/upload.component';
import { NewCurrentOrderComponent } from './dashboardElements/customerPages/newCurrentOrder/newCurrentOrder.component';
import { CustomerNewOrderComponent } from './dashboardElements/customerPages/newCurrentOrder/customerNewOrder/customerNewOrder.component';
import { CustomerCurrentOrderComponent } from './dashboardElements/customerPages/newCurrentOrder/customerCurrentOrder/customerCurrentOrder.component';
import { AddNewProductComponent } from './dashboardElements/adminPages/addNewProduct/addNewProduct.component';
import { PastOrdersComponent } from './dashboardElements/customerPages/pastOrders/pastOrders.component';
import { PastOrderContainerComponent } from './dashboardElements/customerPages/pastOrders/pastOrderContainer/pastOrderContainer.component';
import { MyOrdersComponent } from './dashboardElements/delivererPages/myOrders/myOrders.component';
import { MyOrderContainerComponent } from './dashboardElements/delivererPages/myOrders/myOrderContainer/myOrderContainer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UploadComponent,
    LoginComponent,
    EntryComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    VerificationComponent,
    UserContainerComponent,
    MessageDialogComponent,
    ProductContainerComponent,
    NewOrdersComponent,
    OrderContainerComponent,
    NewCurrentOrderComponent,
    CustomerNewOrderComponent,
    CustomerCurrentOrderComponent,
    AddNewProductComponent,
    PastOrdersComponent,
    PastOrderContainerComponent,
    MyOrdersComponent,
    MyOrderContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    AdminService,
    CustomerService,
    DelivererService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
