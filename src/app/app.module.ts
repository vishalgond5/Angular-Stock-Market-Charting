import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { CreateCompanyComponent } from './components/manage-company/create-company/create-company.component';
import { UpdateCompanyComponent } from './components/manage-company/update-company/update-company.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewCompaniesComponent } from './components/manage-company/view-companies/view-companies.component';
import { CreateStockExchangeComponent } from './components/manage-stock-exchange/create-stock-exchange/create-stock-exchange.component';
import { ViewStockExchangesComponent } from './components/manage-stock-exchange/view-stock-exchanges/view-stock-exchanges.component';
import { TokenInterceptor } from './token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CreateCompanyComponent,
    UpdateCompanyComponent,
    UserComponent,
    AdminComponent,
    ViewCompaniesComponent,
    CreateStockExchangeComponent,
    ViewStockExchangesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    {    
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
