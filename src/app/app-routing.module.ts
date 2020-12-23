import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCompanyComponent } from './components/manage-company/create-company/create-company.component';
import { UpdateCompanyComponent } from './components/manage-company/update-company/update-company.component';
import { ViewCompaniesComponent } from './components/manage-company/view-companies/view-companies.component';
import { CreateStockExchangeComponent } from './components/manage-stock-exchange/create-stock-exchange/create-stock-exchange.component';
import { ViewStockExchangesComponent } from './components/manage-stock-exchange/view-stock-exchanges/view-stock-exchanges.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent,
    children:[{path: 'manage-company/add', component: CreateCompanyComponent},
              {path: 'manage-company/update/:name', component: UpdateCompanyComponent},
              {path: 'manage-company/view', component: ViewCompaniesComponent},
              {path: 'manage-stock-exchange/add', component: CreateStockExchangeComponent},
              {path: 'manage-stock-exchange/view', component: ViewStockExchangesComponent},]
  },
  {path: 'user', component: UserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
