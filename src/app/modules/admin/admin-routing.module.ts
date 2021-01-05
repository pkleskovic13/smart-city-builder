import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminBillComponent } from './admin-bill/admin-bill.component';
import { PageNotFoundComponent } from '../customer/views/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent, pathMatch: 'full' },
  {
    path: '', canActivateChild: [AdminGuard], component: AdminLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: AdminProductComponent },
      { path: 'users', component: AdminUserComponent },
      { path: 'bills', component: AdminBillComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
