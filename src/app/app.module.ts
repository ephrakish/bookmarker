import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BetService } from "./bet.service";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SportslistComponent } from './sportslist/sportslist.component';
import { BetslipComponent } from './betslip/betslip.component';
import { BetsComponent } from './bets/bets.component';
import { BetBarComponent } from './bet-bar/bet-bar.component';
import { BetsContComponent } from './bets-cont/bets-cont.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { BillingComponent } from './billing/billing.component';
import { DetailsComponent } from './details/details.component';
import { HelpComponent } from './help/help.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    SportslistComponent,
    BetslipComponent,
    BetsComponent,
    BetBarComponent,
    BetsContComponent,
    HistoryComponent,
    SettingsComponent,
    BillingComponent,
    DetailsComponent,
    HelpComponent,
    WithdrawComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
