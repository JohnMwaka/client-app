import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Spring Auth Connection</h1>
    
    <div *ngIf="authInfo$ | async as info">
      
      <div *ngIf="!info.isAuthenticated">
        <p>Status: Not Logged In</p>
        <button (click)="login()">Login with Spring</button>
      </div>

      <div *ngIf="info.isAuthenticated">
        <p>Welcome! You are logged in.</p>
        <p>User Details:</p>
        <pre>{{ info.userData | json }}</pre>
        <button (click)="logout()">Logout</button>
      </div>
      
    </div>
  `
})
export class AppComponent implements OnInit {
  // Define a custom observable that holds both status and data
  authInfo$!: Observable<{ isAuthenticated: boolean; userData: any }>;

  constructor(public oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((result) => {
      console.log('Auth Check Finished:', result);
    });

    this.oidcSecurityService.getAccessToken().subscribe((token) => {
      console.log('My JWT Token:', token);
    });

    // Combine both observables into one easy-to-use object
    this.authInfo$ = combineLatest([
      this.oidcSecurityService.isAuthenticated$,
      this.oidcSecurityService.userData$
    ]).pipe(
      map(([authResult, user]) => ({
        isAuthenticated: authResult.isAuthenticated,
        userData: user.userData // This contains the claims from the ID token
      }))
    );
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe();
  }
}