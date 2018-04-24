import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

import { UserComponent } from './user/user.component';

import { DialogDataExampleDialogComponent } from './user/addUser/dialog-data-example-dialog.component';
import { DialogComponent } from './user/viewUser/dialog.component';
import { EditDialogComponent } from './user/editUser/edit-dialog.component';
import { DeleteComponent } from './user/deleteUser/delete.component';

import { ProductComponent } from './product/product.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { DeleteproductComponent } from './product/deleteproduct/deleteproduct.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { ViewproductComponent } from './product/viewproduct/viewproduct.component';

import { DepartmentComponent } from './department/department.component';

import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { ForgetComponent } from './forget/forget.component';
import { PassresetComponent } from './passreset/passreset.component';
import { PassworddisplayComponent } from './passworddisplay/passworddisplay.component';

import { DataControlService } from './user/_services/data-control.service';
import { ProductService } from './product/_services/product.service';
import { UserHomeComponent } from './user-home/user-home.component';

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
    UpdateComponent,
    ForgetComponent,
    PassresetComponent,
    PassworddisplayComponent,
    DepartmentComponent,
    ProductComponent,
    AddproductComponent,
    EditproductComponent,
    ViewproductComponent,
    DeleteproductComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule, MatSelectModule,
    HttpClientModule, MatIconModule, MatTableModule, MatPaginatorModule,
    MatMenuModule, NoopAnimationsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule, MatNativeDateModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatGridListModule, MatToolbarModule,
    MatDatepickerModule, MatCardModule, MatSortModule, MatProgressSpinnerModule,
    BrowserAnimationsModule, MatTabsModule,

    RouterModule.forRoot([
      { path: "update", redirectTo: "update", pathMatch: "full" },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },

      { path: 'forget', component: ForgetComponent },
      { path: 'passworddisplay', component: PassworddisplayComponent },
      { path: 'reset', component: PassresetComponent },

      {
        path: "home", component: HomeComponent, children: [
          { path: '', redirectTo: 'User', pathMatch: 'full' },
          {
            path: "User", component: UserComponent, 
            data: { breadcrumb: "User" }
            ,children: [
              {path: "view", component: DialogComponent,data: {breadcrumb: "view"}},
              
            ]
          },
          {
            path: "Profile", component: ProfileComponent, data: { breadcrumb: "Profile" }
          },
          {
            path: "Department", component: DepartmentComponent,
            data: {breadcrumb: "Department"}
          },
          {
            path: "Product", component: ProductComponent,
            data: {breadcrumb: "Product"}
          }
        ]
      },

      { path: "home/User/add", component: DialogDataExampleDialogComponent,
      data: {breadcrumb: ["user","add"]} },
      
      { path: "home/User/edit", component: EditDialogComponent ,
      data: {breadcrumb: "edit"}},
      
      {path: "home/User/view", component: DialogComponent,
        data: {breadcrumb: "view"}
      },
      
      { path: "home/User/delete", component: DeleteComponent,
      data: {breadcrumb: "view"} 
      },
      
      // { path: "User/edit/:abc/:xyz", component: EditDialogComponent },

      { path: "home/Product/addproduct", component: AddproductComponent },
      { path: "home/Product/viewproduct", component: ViewproductComponent },
      { path: "home/Product/deleteproduct", component: DeleteproductComponent },
      { path: "home/Product/editproduct", component: EditproductComponent },
      { path: "update", component: UpdateComponent },
      { path: 'register', component: RegistrationComponent },
    ])
  ],
  
  entryComponents: [UserComponent,
    DialogDataExampleDialogComponent, EditDialogComponent,
    DialogComponent, DeleteComponent, DeleteproductComponent
  ],
  providers: [DataControlService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
