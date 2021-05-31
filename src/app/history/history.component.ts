import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  histories:any = [
    {
      games: [
        {
          "time": "06/Jun/2020",
          "teams": "Inter vs Lazio",
          "halftime": "1:0",
          "fulltime": "2:1",
          "pick": "Inter",
          "status": "completed",
          "type": "1 OR X",
          "odds": "2.10",
          "result": true
        },
        {
          "time": "06/Jun/2020",
          "teams": "Inter vs Lazio",
          "halftime": "1:0",
          "fulltime": "2:1",
          "pick": "Lazio",
          "status": "ongoing",
          "type": "win",
          "odds": "1.09",
          "result": false
        }
      ],
      "betslip": "542378",
      "stake": "100",
      "expectedoutcome": "319",
      "totalodds": "3.19",
      "result": false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
