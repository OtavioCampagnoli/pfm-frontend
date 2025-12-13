import { TransactionFormComponent } from './pages/transaction-form/transaction-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './core/components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'transaction-form', component: TransactionFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:
    [
      RouterModule,
      HttpClientModule
    ]
})
export class AppRoutingModule { }
