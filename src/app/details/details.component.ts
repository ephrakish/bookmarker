import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BetService } from "../bet.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  betss: any

  constructor(private betService: BetService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.betService.getBets().subscribe(
      data => this.betss = data
    )
    let id = this.route.snapshot.paramMap.get('id');
    let gameDate = this.route.snapshot.paramMap.get('gameDate');
    let team1 = this.route.snapshot.paramMap.get('team1');
    let team2 = this.route.snapshot.paramMap.get('team2');

    this.betService.getBet(id, gameDate, team1, team2).subscribe(
      bet => this.betss = bet
    );
  }

  selectedBet(data) {
    this.betService.updateBetSlip(data)
  }

}
