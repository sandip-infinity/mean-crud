
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { RouterModule, Routes } from '@angular/router';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule,MatTabsModule} from '@angular/material';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { DialogComponent } from './dialog/dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DataControlService } from './data-control.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DeleteComponent } from './delete/delete.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialogComponent,
    DialogComponent,
    EditDialogComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    DeleteComponent,
    RegistrationComponent,
    ProfileComponent
  ],
  imports: [
  BrowserModule,HttpClientModule,MatIconModule,MatTableModule,MatPaginatorModule,
    NoopAnimationsModule,MatDialogModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,FormsModule,ReactiveFormsModule,MatGridListModule,MatToolbarModule,
    MatCardModule,MatSortModule,MatProgressSpinnerModule,BrowserAnimationsModule,MatTabsModule,
    RouterModule.forRoot([
      
      {path:"home",component:HomeComponent, children: [
        {
          path:"user",component:UserComponent
        },
        {
          path:"profile",component:ProfileComponent
        }]},
      { path: 'register',  component: RegistrationComponent  },
      { path: 'login',  component: LoginComponent },
  ])
  ],
  entryComponents: [
    DialogDataExampleDialogComponent,EditDialogComponent,DialogComponent,DeleteComponent
],
  providers: [DataControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
