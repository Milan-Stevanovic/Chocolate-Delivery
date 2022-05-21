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
import { VerificationComponent } from './dashboardElements/verification/verification.component';
import { UserContainerComponent } from './dashboardElements/verification/userContainer/userContainer.component';
import { AdminService } from './shared/services/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EntryComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    VerificationComponent,
    UserContainerComponent,
    MessageDialogComponent,
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
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
