import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewComplaintComponent } from './new-complaint/new-complaint.component';
import { FollowComplaintUserComponent } from './follow-complaint-user/follow-complaint-user.component';
import { FollowComplaintAdminComponent } from './follow-complaint-admin/follow-complaint-admin.component';
import { HomeComponent } from './home/home.component';
import { ComplaintsComponent } from './complaints/complaints.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new-complaint',
    component: NewComplaintComponent
  },
  {
    path:'follow-complaint-user',
    component: FollowComplaintUserComponent
  },
  {
    path:'follow-complaint-admin',
    component: FollowComplaintAdminComponent
  },
  {
    path:'complaints',
    component: ComplaintsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
