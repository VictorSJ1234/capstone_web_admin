import { NgModule } from '@angular/core';
import { AdminGuard } from './auth.guard';
import { DengueTaskForceGuard } from './dengue-guard.guard';
import { BarangayAdminGuard } from './barangay-guard.guard';
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
import { MosquitopediaComponent } from './mosquitopedia/mosquitopedia.component';
import { CommunityProjectsManagementComponent } from './community-projects-management/community-projects-management.component';
import { CreateCommunityProjectComponent } from './create-community-project/create-community-project.component';
import { EditCommunityProjectComponent } from './edit-community-project/edit-community-project.component';
import { DengueCasesPostComponent } from './dengue-cases-post/dengue-cases-post.component';
import { BarangayDashboardComponent } from './barangay-dashboard/barangay-dashboard.component';
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
import { SuperAdminAccountManagementComponent } from './super-admin-account-management/super-admin-account-management.component';
import { EditTaskforceProfileComponent } from './edit-taskforce-profile/edit-taskforce-profile.component';
import { InquiriesManagementComponent } from './inquiries-management/inquiries-management.component';
import { InquiryInformationComponent } from './inquiry-information/inquiry-information.component';
import { TaskForceAccountComponent } from './task-force-account/task-force-account.component';
import { SuperAdminAccountInformationComponent } from './super-admin-account-information/super-admin-account-information.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { BarangayNotificationPageComponent } from './barangay-notification-page/barangay-notification-page.component';
import { AdminNotificationPageComponent } from './admin-notification-page/admin-notification-page.component';

const routes: Routes = [
  {component: AccountLoginComponent, path: ''},
  {component: AccountRegistrationComponent, path: 'account-registration'},
  {component: AdminDashboardComponent, path: 'admin-dashboard', canActivate: [DengueTaskForceGuard] },
  {component: AdminDashboardComponent, path: 'admin-dashboard', canActivate: [DengueTaskForceGuard] },
  {component: AccountManagementComponent, path: 'account-management', canActivate: [AdminGuard] },
  {component: MobileUsersComponent, path: 'mobile-users', canActivate: [AdminGuard] },
  {component: AdminsComponent, path: 'admins', canActivate: [AdminGuard] },
  {component: UserReportComponent, path: 'user-report', canActivate: [DengueTaskForceGuard] },
  {component: CommunityReportManagementComponent, path: 'community-report-management', canActivate: [DengueTaskForceGuard] },
  {component: ReportInformationComponent, path: 'report-information', canActivate: [DengueTaskForceGuard] },
  {component: EditAdminInformationComponent, path: 'edit-admin-information', canActivate: [AdminGuard] },
  {component: EditUserProfileComponent, path: 'edit-user-profile', canActivate: [AdminGuard] },
  {component: MosquitopediaComponent, path: 'mosquitopedia', canActivate: [DengueTaskForceGuard] },
  {component: CommunityProjectsManagementComponent, path: 'community-projects-management', canActivate: [DengueTaskForceGuard] },
  {component: CreateCommunityProjectComponent, path: 'create-community-project', canActivate: [DengueTaskForceGuard] },
  {component: EditCommunityProjectComponent, path: 'edit-community-project', canActivate: [DengueTaskForceGuard] },
   {component: DengueCasesPostComponent, path: 'dengue-post-component', canActivate: [DengueTaskForceGuard] },
   {component: BarangayDashboardComponent, path: 'barangay-dashboard', canActivate: [BarangayAdminGuard] },
   {component: BarangayConcernManagementComponent, path: 'barangay-concern-management', canActivate: [BarangayAdminGuard] },
   {component: ManageDengueCasesComponent, path: 'manage-dengue-cases', canActivate: [DengueTaskForceGuard] },
   {component: EditDengueCasesComponent, path: 'edit-dengue-cases', canActivate: [DengueTaskForceGuard] },
   {component: AdminReportsForBarangayManagementComponent, path:'admin-reports-for-barangay-management', canActivate: [DengueTaskForceGuard] },
   {component: CreateReportForBarangayComponent, path:'create-report-for-barangay', canActivate: [DengueTaskForceGuard] },
   {component: AdminReportToBarangayInformationComponent, path:'admin-report-to-barangay-information', canActivate: [DengueTaskForceGuard] },
   {component: AdminReportBarangayViewComponent, path:'admin-report-barangay-view', canActivate: [BarangayAdminGuard] },
   {component: BarangayResponseViewComponent, path:'barangay-response-view', canActivate: [BarangayAdminGuard] },
   {component: BarangayAdminProfileEditComponent, path:'barangay-admin-profile-edit', canActivate: [BarangayAdminGuard] },
   {component: SuperAdminDashboardComponent, path:'super-admin-dashboard', canActivate: [AdminGuard] },
   {component: SuperAdminAccountManagementComponent, path:'super-admin-account-management', canActivate: [AdminGuard] },
   {component: EditTaskforceProfileComponent, path:'edit-taskforce-profile', canActivate: [AdminGuard] },
   {component: InquiriesManagementComponent, path:'inquiries-management', canActivate: [DengueTaskForceGuard] },
   {component: InquiryInformationComponent, path:'inquiry-information', canActivate: [DengueTaskForceGuard] },
   {component: TaskForceAccountComponent, path:'task-force-account', canActivate: [DengueTaskForceGuard] },
   {component: SuperAdminAccountInformationComponent, path:'super-admin-account-information', canActivate: [AdminGuard] },
   {component: NotificationPageComponent, path:'notification-page', canActivate: [DengueTaskForceGuard]},
   {component: AdminNotificationPageComponent, path:'admin-notification-page', canActivate: [AdminGuard] },
   {component: BarangayNotificationPageComponent, path:'barangay-notification-page', canActivate: [BarangayAdminGuard] },
   {component: ForgotPasswordComponent, path:'forgot-password'},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
