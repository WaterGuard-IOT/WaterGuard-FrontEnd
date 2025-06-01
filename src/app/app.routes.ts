import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
 import { HomeComponent } from './pages/home/home.component';
// import { SettingComponent } from './pages/setting/setting.component';
import { ReportsComponent } from './pages/reports/reports.component';
// import { DeviceComponent } from './pages/device/device.component';
// import { authGuard } from './shared/auth-guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
   {
     path: 'profile',
     component: ProfileComponent,
  //   canActivate: [authGuard]
   },
   {
     path: 'home',
     component: HomeComponent,
    // canActivate: [authGuard]
   },
  // {
  //   path: 'settings',
  //   component: SettingComponent,
  //   canActivate: [authGuard]
  // },
   {
     path: 'reports',
     component: ReportsComponent,
  //   canActivate: [authGuard]
   },
  // {
  //   path: 'device',
  //   component: DeviceComponent,
  //   canActivate: [authGuard],
  // }
];
