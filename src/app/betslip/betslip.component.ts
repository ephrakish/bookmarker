import { Component, OnInit } from '@angular/core';
import { BetService } from "../bet.service";

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  bets: any = [
  ];
  odds: any = []
  totalodds: number = 1
  stake:number = 50
  possiblewin:any

  constructor(private betServ: BetService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.betServ.currentSelect.subscribe((message) => {
      // console.log(message)
      this.addOrReplace(this.bets, message)
      this.updateTotalOdds();
      this.changePossibleWin();
      console.log(this.bets)
    });
    
  }

  placeBet() {
    this.betServ.postBet(this.bets).subscribe((response) => {
      console.log(response)
    })
  }

  changePossibleWin() {
    this.possiblewin = this.stake * this.totalodds;
    let possiblewin1 = this.totalodds * this.stake;
    this.possiblewin = Number(possiblewin1.toFixed(2));
  }
  
  updateTotalOdds() {
    const odds = this.bets;
    this.totalodds = 1
    let i;
    for (i = 0; i < odds.length; i += 1) 
      {
        this.totalodds *= odds[i].bet;
        let oddsToBeProcessed = Number(this.totalodds.toFixed(3))
        let totalOddsString = oddsToBeProcessed.toLocaleString();
        let splitTotalOddsString = totalOddsString.split('.');
        let split1 = splitTotalOddsString[1][0];
        let split2 = splitTotalOddsString[1][1];
        if(typeof split2 === 'undefined') {
          split2 = '0';
        }
        if(typeof split1 === 'undefined') {
          split1 = '0';
        }

        let secondValue = split1 + split2;
        let firstValue = splitTotalOddsString[0];
        let thirdValue = firstValue + "." + secondValue;
        this.totalodds = Number(thirdValue);
        // console.log(this.totalodds);
        }
    this.changePossibleWin(); 

  }

  clearBet(i) {
    let ind = this.bets.indexOf(i)
    this.bets.splice(ind, 1)
    this.odds.splice(ind, 1)
    this.updateTotalOdds();
  }

  validateBet(name) {
    for (let bet of this.bets) 
    {
      if(this.bets != []) {
        if(bet.teams === name) {
          let b = this.bets.indexOf(name)
          this.bets.splice(b, 1);
          this.odds.splice(b, 1)
          this.updateTotalOdds();
          //console.log(this.bets)
        }
      }
    }  
  }
  
  addOrReplace(data, obj) {
    var i = data.findIndex(function(e) {
      return e.teams == obj.teams;
    });
  
    i != -1 ? data[i] = obj : data.push(obj);
    return data;
  }

  incTotal(item, index) {
    console.log(item)
  }
  
  decTotal(odd) {
    this.totalodds = this.totalodds - odd
  }

    // updateTotalOdds() {
  //   this.totalodds = 1
  //   for(let bet of this.bets){
  //     let totalodds1 = this.totalodds * bet.bet
  //     this.totalodds = Number(totalodds1.toFixed(2));
  //     //console.log(this.totalodds)
  //   }
  // }

  // valBet(message) {
  //   let bt = Number(message.bet)
  //   let name = message.teams
  //   if(this.bets.length === 0) {
  //     this.bets.push(message)
  //     this.odds.push(bt)
  //     console.log(this.bets)
  //   } else {
  //     for (let bet of this.bets) {
  //       if(bet.teams === name) {
  //         let b = this.bets.indexOf(name)
  //         //console.log(b)
  //         this.bets.splice(b, 1);
  //         this.odds.splice(b, 1)
  //         this.bets.push(message)
  //         this.odds.push(bt)
  //         this.updateTotalOdd();
  //       } else{
  //         this.bets.push(message)
  //         this.odds.push(bt)
  //       }
  //     }
  //   }
  // }

  // valdBet(message) {
  //   let bt = Number(message.bet)
  //   let name = message.teams
  //   console.log(this.bets.indexOf(message))
  //   if(this.bets.length === 0) {
  //     this.bets.push(message)
  //     this.odds.push(bt)
  //     //console.log(this.bets)
  //   } else {
  //     let b = this.bets.indexOf(message)
  //     //console.log(b)
  //     this.bets.splice(b, 1);
  //     this.odds.splice(b, 1)
  //     this.bets.push(message)
  //   }
  // }

  // valiBet(message) {
  //   let name = message.teams
  //   if(this.bets.length === 0) {
  //     this.bets.push(message)
  //     //this.odds.push(bt)
  //     //console.log(this.bets)
  //   } else {
  //     this.bets.forEach(element => {
  //       console.log(element.teams === name)
  //       if (element.teams === name) {
  //         this.bets.splice(element, 1);
  //       }
  //     });
  //     this.bets.push(message);
  //   }
  // }

  // validBet(message) {
  //   let bt = Number(message.bet)
  //   if(this.bets.length === 0) {
  //     this.bets.push(message)
  //     this.odds.push(bt)
  //     //console.log(this.bets)
  //   } else {
  //     this.bets.map(
  //       (bet) => {
  //         if(bet.teams === message.teams) {
  //           let b = this.bets.indexOf(bet)
  //           console.log(b)
  //           this.bets.splice(b, 1);
  //         } else {
  //           this.bets.push(message);
  //         }
  //       }
  //     )
  //   }
  // }
  


}
