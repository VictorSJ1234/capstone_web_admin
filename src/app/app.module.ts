import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { BarangayDashboardComponent } from './barangay-dashboard/barangay-dashboard.component';
import { BarangaySidenavComponent } from './barangay-sidenav/barangay-sidenav.component';
import { BarangayConcernManagementComponent } from './barangay-concern-management/barangay-concern-management.component';
import { ManageDengueCasesComponent } from './manage-dengue-cases/manage-dengue-cases.component';
import { EditDengueCasesComponent } from './edit-dengue-cases/edit-dengue-cases.component';
import { AdminReportsForBarangayManagementComponent } from './admin-reports-for-barangay-management/admin-reports-for-barangay-management.component';
import { CreateReportForBarangayComponent } from './create-report-for-barangay/create-report-for-barangay.component';
import { AdminReportToBarangayInformationComponent } from './admin-report-to-barangay-information/admin-report-to-barangay-information.component';
import { AdminReportBarangayViewComponent } from './admin-report-barangay-view/admin-report-barangay-view.component';
import { BarangayResponseViewComponent } from './barangay-response-view/barangay-response-view.component';
import { BarangayAdminProfileEditComponent } from './barangay-admin-profile-edit/barangay-admin-profile-edit.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminSidenavComponent } from './super-admin-sidenav/super-admin-sidenav.component';
import { SuperAdminAccountManagementComponent } from './super-admin-account-management/super-admin-account-management.component';
import { EditTaskforceProfileComponent } from './edit-taskforce-profile/edit-taskforce-profile.component';
import { InquiriesManagementComponent } from './inquiries-management/inquiries-management.component';
import { InquiryInformationComponent } from './inquiry-information/inquiry-information.component';
import { TaskForceAccountComponent } from './task-force-account/task-force-account.component';
import { SuperAdminAccountInformationComponent } from './super-admin-account-information/super-admin-account-information.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { AdminNotificationPageComponent } from './admin-notification-page/admin-notification-page.component';
import { BarangayNotificationPageComponent } from './barangay-notification-page/barangay-notification-page.component';

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
    DengueCasesPostComponent,
    BarangayDashboardComponent,
    BarangaySidenavComponent,
    BarangayConcernManagementComponent,
    ManageDengueCasesComponent,
    EditDengueCasesComponent,
    AdminReportsForBarangayManagementComponent,
    CreateReportForBarangayComponent,
    AdminReportToBarangayInformationComponent,
    AdminReportBarangayViewComponent,
    BarangayResponseViewComponent,
    BarangayAdminProfileEditComponent,
    SuperAdminDashboardComponent,
    SuperAdminSidenavComponent,
    SuperAdminAccountManagementComponent,
    EditTaskforceProfileComponent,
    InquiriesManagementComponent,
    InquiryInformationComponent,
    TaskForceAccountComponent,
    SuperAdminAccountInformationComponent,
    ForgotPasswordComponent,
    NotificationPageComponent,
    AdminNotificationPageComponent,
    BarangayNotificationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
