import { NgModule } from '@angular/core';


import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';



  
export const routes: Routes = [
    {
      path: 'login',component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    {
      path: '', component: LoginComponent
    },
    {path: 'profile', component: ProfileComponent},
    {path: 'home', component: HomeComponent},
  ];
