import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MobileUsersComponent } from './mobile-users/mobile-users.component';
import { AdminsComponent } from './admins/admins.component';
import { UserReportComponent } from './user-report/user-report.component';
import { CommunityReportManagementComponent } from './community-report-management/community-report-management.component';
import { ReportInformationComponent } from './report-information/report-information.component';
import { EditAdminInformationComponent } from './edit-admin-information/edit-admin-information.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';

const routes: Routes = [
  {component: AccountLoginComponent, path: ''},
  {component: AccountRegistrationComponent, path: 'account-registration'},
  {component: AdminDashboardComponent, path: 'admin-dashboard'},
  {component: AdminDashboardComponent, path: 'admin-dashboard'},
  {component: AccountManagementComponent, path: 'account-management'},
  {component: MobileUsersComponent, path: 'mobile-users'},
  {component: AdminsComponent, path: 'admins'},
  {component: UserReportComponent, path: 'user-report'},
  {component: CommunityReportManagementComponent, path: 'community-report-management'},
  {component: ReportInformationComponent, path: 'report-information'},
  {component: EditAdminInformationComponent, path: 'edit-admin-information'},
  {component: EditUserProfileComponent, path: 'edit-user-profile'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
