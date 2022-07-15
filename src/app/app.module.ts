import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { OverviewComponent } from './overview/overview.component';

import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NgxEchartsModule } from 'ngx-echarts';


//import { User } from './_models';

/* NG ZORRO: https://ng.ant.design/components/select/zh */
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ManualComponent } from './manual/manual.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { OrdersComponent } from './orders/orders.component';

registerLocaleData(en);

/* import * as AllIcons from '@ant-design/icons-angular/icons';
const antDesignIcons = AllIcons as {
   [key: string]: IconDefinition;
 };
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
 */

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    ProductsComponent,
    ManualComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    ReactiveFormsModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzStatisticModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzDropDownModule,
    //NzIconModule.forRoot(icons),
    NzAvatarModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzTableModule,
    NzSpinModule,
    NzAlertModule,
    NzModalModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzTagModule,
    NzStepsModule,
    NzSelectModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    authInterceptorProviders

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
