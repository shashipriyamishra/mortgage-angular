import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { HomeComponent } from "./home/home.component";
import { MovieListComponent } from "./shared/components/movie-list/movie-list.component";
import { AccountSummaryComponent } from "./shared/components/account-summary/account-summary.component";



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account-summary', component: AccountSummaryComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
