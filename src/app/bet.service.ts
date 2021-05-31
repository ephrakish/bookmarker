import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import axios from 'axios';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  //https://widgets.fn.sportradar.com/common/en/Etc:UTC/gismo/match_info/23058749
  //https://www.betway.co.ke/sport/soccer/pol/ii_liga/lkp_motor_lublin-v-garbarnia_krakow/0?datefilter=202009252030
  
  private socket: any;
  bets:any
  private selects = new Subject<any>();
  currentSelect = this.selects.asObservable();

  updateBetSlip(b) {
    this.selects.next(b)
  }

  getBetSlip() {
    return this.selects
  }

  getBetSl() {
    return this.selects
  }

  //deleteBetSlip(i) {
  //  this.selects.splice(i)
  //} new Mongo.ObjectID(freelancerId)

  

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000/');
   }

   listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

  getBets() {
    return this.http.get('http://localhost:5000/bets')
  }

  getBet(betId, gameDate, team1, team2) {
    return this.http.get(`http://localhost:5000/bet/${betId}`)
  }

  url = 'http://localhost:5000/bets'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  createBet(data: any) {
    console.log(data)
    return this.http.post<any>('http://localhost:5000/bets', data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
    // axios.post('http://localhost:5000/bets', data)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  postBet(data: any) {
    const payload = {
      "userId": "601fad76baf7c206ec2ee27c",
      "bets": data
    }
    return this.http.post<any>('http://localhost:5000/placebet', payload, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
    // axios.post('http://localhost:5000/bets', data)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
}
