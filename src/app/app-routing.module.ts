import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ManualComponent } from './manual/manual.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  { path: '', component: OverviewComponent},
  { path: 'overview', component: OverviewComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrdersComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }