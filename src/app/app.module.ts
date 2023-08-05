import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MobileUsersComponent } from './mobile-users/mobile-users.component';
import { AdminsComponent } from './admins/admins.component';
import { UserReportComponent } from './user-report/user-report.component';
import { CommunityReportManagementComponent } from './community-report-management/community-report-management.component';
import { ReportInformationComponent } from './report-information/report-information.component';
import { EditAdminInformationComponent } from './edit-admin-information/edit-admin-information.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { MosquitopediaComponent } from './mosquitopedia/mosquitopedia.component';
import { CommunityProjectsManagementComponent } from './community-projects-management/community-projects-management.component';
import { CreateCommunityProjectComponent } from './create-community-project/create-community-project.component';
import { EditCommunityProjectComponent } from './edit-community-project/edit-community-project.component';
import { DengueCasesPostComponent } from './dengue-cases-post/dengue-cases-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountRegistrationComponent,
    AccountLoginComponent,
    AdminDashboardComponent,
    HeaderComponent,
    NavbarComponent,
    SidenavComponent,
    AccountManagementComponent,
    MobileUsersComponent,
    AdminsComponent,
    UserReportComponent,
    CommunityReportManagementComponent,
    ReportInformationComponent,
    EditAdminInformationComponent,
    EditUserProfileComponent,
    MosquitopediaComponent,
    CommunityProjectsManagementComponent,
    CreateCommunityProjectComponent,
    EditCommunityProjectComponent,
    DengueCasesPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
