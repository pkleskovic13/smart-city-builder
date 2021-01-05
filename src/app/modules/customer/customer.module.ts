import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageLayoutComponent } from './homepage-layout/homepage-layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomepageLayoutComponent,
    HomepageComponent,
    LoginLayoutComponent,
    LoginScreenComponent,
    CustomerLayoutComponent,
    MapScreenComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    GoogleMapsModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
