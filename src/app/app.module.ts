import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComplaintComponent } from './new-complaint/new-complaint.component';
import { FollowComplaintUserComponent } from './follow-complaint-user/follow-complaint-user.component';
import { FollowComplaintAdminComponent } from './follow-complaint-admin/follow-complaint-admin.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ComplaintsComponent } from './complaints/complaints.component';
import { EventServiceCatalog } from './Services/EventServiceCatalog.service';
import { EventServicePersonalInfo } from './Services/EventServicePersonalInfo.service';

@NgModule({
  declarations: [
    AppComponent,
    NewComplaintComponent,
    FollowComplaintUserComponent,
    FollowComplaintAdminComponent,
    HomeComponent,
    ComplaintsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    EventServiceCatalog, 
    EventServicePersonalInfo
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
