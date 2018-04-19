
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import {MatSnackBarModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DialogComponent } from './dialog/dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { DataControlService } from './data-control.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DeleteComponent } from './delete/delete.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgetComponent } from './forget/forget.component';
import { PassworddisplayComponent } from './passworddisplay/passworddisplay.component';
import { PassresetComponent } from './passreset/passreset.component';  
import { UpdateComponent } from './update/update.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { DeleteproductComponent } from './deleteproduct/deleteproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material'


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
    ForgetComponent,
    PassworddisplayComponent,
    PassresetComponent ,
    UpdateComponent,
    ProductComponent,
    AddproductComponent,
    DeleteproductComponent,
    ViewproductComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule,
    NoopAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatButtonModule, FormsModule, ReactiveFormsModule, MatGridListModule, MatToolbarModule,
    MatCardModule, MatSortModule, MatProgressSpinnerModule, BrowserAnimationsModule, MatTabsModule,
    MatDatepickerModule,HttpModule,MatDatepickerModule,MatMomentDateModule, 
    RouterModule.forRoot([
      { path: "update", redirectTo: "update", pathMatch: "full" },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },

      {path: "home", component: HomeComponent, children: [
        // { path: '', redirectTo: 'user', pathMatch: 'full' },
          { path: "user", component: UserComponent },
          { path: "profile", component: ProfileComponent },
          { path: "product", component: ProductComponent},
        ]
      },
      { path: 'forget', component: ForgetComponent},
      { path:'passworddisplay', component:PassworddisplayComponent  },
      { path:'reset' , component:PassresetComponent},

      { path: 'home/user/add', component: DialogDataExampleDialogComponent },
      { path: 'home/user/edit', component: EditDialogComponent },
      { path: 'home/user/view', component: DialogComponent },
      { path: 'home/user/delete', component: DeleteComponent },
      { path: 'User/edit/:abc/:xyz', component: EditDialogComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'register', component: RegistrationComponent },
      {path:'home/product',component:ProductComponent},
      {path: 'home/addproduct',component: AddproductComponent},
      { path: 'home/product/edit', component: EditproductComponent },
      { path: 'home/product/view', component: ViewproductComponent },
      { path: 'home/product/delete', component: DeleteproductComponent },
    ])
  ],
  entryComponents: [UserComponent,
    DialogDataExampleDialogComponent, EditDialogComponent, DialogComponent, DeleteComponent,AddproductComponent
  ],
  providers: [DataControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
