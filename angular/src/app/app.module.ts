import { provideAccountConfig } from '@abp/ng.account/config';
import { CoreModule, provideAbpCore, withOptions } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { provideIdentityConfig } from '@abp/ng.identity/config';
import { provideSettingManagementConfig } from '@abp/ng.setting-management/config';
import { provideTenantManagementConfig } from '@abp/ng.tenant-management/config';

import {
  InternetConnectionStatusComponent,
  ThemeSharedModule,
  provideAbpThemeShared,
} from '@abp/ng.theme.shared';
import { provideFeatureManagementConfig } from '@abp/ng.feature-management';
import { provideAbpOAuth } from '@abp/ng.oauth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    ThemeSharedModule,
    InternetConnectionStatusComponent,
    ThemeBasicModule.forRoot(),
    FormsModule,
    
    ButtonModule,
    TableModule,
    InputTextModule,
    FloatLabelModule
  ],
  declarations: [AppComponent],
  providers: [
    APP_ROUTE_PROVIDER,
    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: registerLocale(),
      })
    ),
    provideAbpOAuth(),
    provideAbpThemeShared(),
    provideSettingManagementConfig(),
    provideAccountConfig(),
    provideIdentityConfig(),
    provideTenantManagementConfig(),
    provideFeatureManagementConfig(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
