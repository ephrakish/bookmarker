import { Component, OnInit } from '@angular/core';
import { BetService } from "../bet.service";

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {
  
  bets: any 

  constructor(private betService: BetService) { }

  ngOnInit() {
    this.betService.getBets().subscribe(
      data => this.bets = data
    )

  }
  selectedBet(data) {
    this.betService.updateBetSlip(data)
  }


}
