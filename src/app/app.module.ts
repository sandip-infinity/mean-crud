
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { DialogComponent } from './dialog/dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataControlService } from './data-control.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DeleteComponent } from './delete/delete.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
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
    ProfileComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,MatSelectModule,
     HttpClientModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule,
    NoopAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,MatNativeDateModule,
    MatButtonModule, FormsModule, ReactiveFormsModule, MatGridListModule, MatToolbarModule,MatDatepickerModule,
    MatCardModule, MatSortModule, MatProgressSpinnerModule, BrowserAnimationsModule, MatTabsModule,
    RouterModule.forRoot([
      { path: "update", redirectTo: "update", pathMatch: "full" },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },

      {path: "home", component: HomeComponent, children: [
        { path: '', redirectTo: 'User', pathMatch: 'full' },
          { path: "User", component: UserComponent },
          { path: "Profile", component: ProfileComponent }
        ]
      },

      { path: "home/User/add", component: DialogDataExampleDialogComponent },
      { path: "home/User/edit", component: EditDialogComponent },
      { path: "home/User/view", component: DialogComponent },
      { path: "home/User/delete", component: DeleteComponent },
      { path: "User/edit/:abc/:xyz", component: EditDialogComponent },
      { path: "update", component: UpdateComponent },
      { path: 'register', component: RegistrationComponent },
    ])
  ],
  entryComponents: [UserComponent,
    DialogDataExampleDialogComponent, EditDialogComponent, DialogComponent, DeleteComponent
  ],
  providers: [DataControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
