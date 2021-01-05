import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NgZorroAntdModule, NzModalModule, NzUploadModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminBillComponent } from './admin-bill/admin-bill.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    AdminProductComponent,
    AdminUserComponent,
    AdminLoginComponent,
    AdminBillComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NzSpaceModule,
    FlexLayoutModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzUploadModule,
    ColorPickerModule,
  ]
})
export class AdminModule { }
