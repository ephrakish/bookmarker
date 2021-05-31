import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetsContComponent } from '../app/bets-cont/bets-cont.component';
import { SettingsComponent } from "../app/settings/settings.component";
import { DetailsComponent } from "../app/details/details.component";
import { HistoryComponent } from "../app/history/history.component";
import { HelpComponent } from "../app/help/help.component";
import { BillingComponent } from "../app/billing/billing.component";
import { DashboardComponent } from '../app/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'sports', pathMatch: "full"
  },
  {
    path: 'sports',
    component: BetsContComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'game/:id',
    component: DetailsComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
