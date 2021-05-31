import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  date: any;

  // setTimeout(() => {
  //   this.date = Date.now()
  // }, 1000);

  ngOnInit() {
    this.date = Date.now()
  }

}
