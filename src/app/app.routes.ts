import { Routes } from '@angular/router';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
//   {
//     path: '',
//     // This guard handles the "Is authenticated?" check 
//     // and automatically triggers login if the answer is "No"
//     canActivate: [AutoLoginPartialRoutesGuard],
//     children: [
//     //   {
//     //     path: 'dashboard',
//     //     loadComponent: () => import('./features/dashboard.component').then(m => m.DashboardComponent)
//     //   },
//     //   {
//     //     path: 'profile',
//     //     loadComponent: () => import('./features/profile.component').then(m => m.ProfileComponent)
//     //   },
//       // If path is empty, redirect to a default protected page
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
//     ]
//   },
//   // The callback route MUST be outside the guard to avoid an infinite loop
//   { path: 'callback', redirectTo: '' }
];