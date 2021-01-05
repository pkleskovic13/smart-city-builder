import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageLayoutComponent } from './homepage-layout/homepage-layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserGuard } from 'src/app/guards/user.guard';

const routes: Routes = [
  {
    path: '', component: HomepageLayoutComponent, children: [
      { path: '', component: HomepageComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'login', component: LoginLayoutComponent, children: [
      { path: '', component: LoginScreenComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'app', canActivateChild: [UserGuard], component: CustomerLayoutComponent, children: [
      { path: '', component: MapScreenComponent, pathMatch: '' },
    ],
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
