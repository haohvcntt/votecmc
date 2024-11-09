import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
    <abp-internet-status></abp-internet-status>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkAuthentication();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  private checkAuthentication(): void {
    if (!this.authService.isAuthenticated) {
      // this.router.navigate(['/account/login']); // Redirect to login if not authenticated
      this.authService.navigateToLogin();
    }
  }
}
