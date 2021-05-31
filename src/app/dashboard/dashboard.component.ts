import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

import { BetService } from "../bet.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private socket: any;

  bets: Object = {
    "id": "51286",
    "date": "17/09/2020",
    "time": "14:00",
    "team_1": "LKP Motor Liblin",
    "team_2": "Garbarnia Krakow",
    "three": [
      { "cat": "home",
        "id": "1",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin",
        "bet": "1.96",
        "type": "soccer"
      },
      {
        "cat": "draw",
        "id": "2",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin or Garbarnia Krakow",
        "bet": "3.33",
        "type": "soccer"
      },
      {
        "cat": "away",
        "id": "3",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow",
        "bet": "3.46",
        "type": "soccer"
        }
    ],
    "doublechance": [
      {
        "cat": "x1",
        "id": "4",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1/X",
        "bet": "1.25",
        "type": "soccer"
      },
      {
        "cat": "x2",
        "id": "5",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "X/2",
        "bet": "1.64",
        "type": "soccer"
      },
      {
        "cat": "x12",
        "id": "6",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1/2",
        "bet": "1.26",
        "type": "soccer"
      }
    ],
    "overunder05": [
      {
        "cat": "over05",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "over 0.5",
        "bet": "1.03",
        "type": "soccer"
      },
      {
        "cat": "under05",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "under 0.5",
        "bet": "7.67",
        "type": "soccer"
      }
    ],
    "overunder15": [
      {
        "cat": "over15",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "over 1.5",
        "bet": "1.21",
        "type": "soccer"
      },
      {
        "cat": "under15",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "under 1.5",
        "bet": "3.63",
        "type": "soccer"
      }
    ],
    "overunder25": [
      {
        "cat": "over25",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "over 2.5",
        "bet": "1.71",
        "type": "soccer"
      },
      {
        "cat": "under25",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "under 2.5",
        "bet": "1.94",
        "type": "soccer"
      }
    ],
    "overunder35": [
      {
        "cat": "over35",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "over 3.5",
        "bet": "2.68",
        "type": "soccer"
      },
      {
        "cat": "under35",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "under 3.5",
        "bet": "1.38",
        "type": "soccer"
      }
    ],
    "overunder45": [
      {
        "cat": "over45",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "over 4.5",
        "bet": "4.66",
        "type": "soccer"
      },
      {
        "cat": "under45",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "under 4.5",
        "bet": "1.13",
        "type": "soccer"
      }
    ],
    "bothtoscore": [
      {
        "cat": "yes",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "yes",
        "bet": "1.61",
        "type": "soccer"
      },
      {
        "cat": "no",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "no",
        "bet": "2.09",
        "type": "soccer"
      }
    ],
    "drawnobet": [
      {
        "cat": "draw no bet",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin",
        "bet": "1.44",
        "type": "soccer"
      },
      {
        "cat": "draw no bet",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow",
        "bet": "2.47",
        "type": "soccer"
      }
    ],
    "Handicap05": [
      {
        "cat": "Handicap -05",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin (-0.5)",
        "bet": "1.83",
        "type": "soccer"
      },
      {
        "cat": "Handicap -05",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow (+0.5)",
        "bet": "1.66",
        "type": "soccer"
      }
    ],
    "onetimestwoandoverunder15": [
      {
        "cat": "1X2 and Overs/Unders (Total 1.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Under 1.5",
        "bet": "9.44",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 1.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Over 1.5",
        "bet": "2.40",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 1.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Under 1.5",
        "bet": "13.61",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 1.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Over 1.5",
        "bet": "4.32",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 1.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Under 1.5",
        "bet": "13.37",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 1.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Over 1.5",
        "bet": "4.58",
        "type": "soccer"
      }
    ],
    "onetimestwoandoverunder25": [
      {
        "cat": "1X2 and Overs/Unders (Total 2.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Under 2.5",
        "bet": "5.23",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 2.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Over 2.5",
        "bet": "3.00",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 2.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Under 2.5",
        "bet": "4.68",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 2.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Over 2.5",
        "bet": "11.13",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 2.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Under 2.5",
        "bet": "8.52",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 2.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Over 2.5",
        "bet": "5.72",
        "type": "soccer"
      }
    ],
    "onetimestwoandoverunder35": [
      {
        "cat": "1X2 and Overs/Unders (Total 3.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Under 3.5",
        "bet": "2.97",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 3.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Over 3.5",
        "bet": "5.32",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 3.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Under 3.5",
        "bet": "4.68",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 3.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Over 3.5",
        "bet": "11.12",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 3.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Under 3.5",
        "bet": "4.87",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 3.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Over 3.5",
        "bet": "11.60",
        "type": "soccer"
      }
    ],
    "onetimestwoandoverunder45": [
      {
        "cat": "1X2 and Overs/Unders (Total 4.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Under 4.5",
        "bet": "2.42",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 4.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Over 4.5",
        "bet": "8.96",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 4.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Under 4.5",
        "bet": "3.52",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 4.5)",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Over 4.5",
        "bet": "54.30",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 4.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Under 4.5",
        "bet": "4.16",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Overs/Unders (Total 4.5)",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Over 4.5",
        "bet": "18.90",
        "type": "soccer"
      }
    ],
    "onetimestwoandbothteamstoscore": [
      {
        "cat": "1X2 and Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & Yes",
        "bet": "3.87",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin  & No",
        "bet": "3.74",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & Yes",
        "bet": "4.35",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw  & No",
        "bet": "13.73",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Both Teams To Score",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & Yes",
        "bet": "6.60",
        "type": "soccer"
      },
      {
        "cat": "1X2 and Both Teams To Score",
        "id": "8",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow & No",
        "bet": "7.12",
        "type": "soccer"
      }
    ],
    "whichteamtoscore": [
      {
        "cat": "Which Team To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "None",
        "bet": "13.46",
        "type": "soccer"
      },
      {
        "cat": "Which Team To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Only LKP Motor Liblin",
        "bet": "3.69",
        "type": "soccer"
      },
      {
        "cat": "Which Team To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Only Garbarnia Krakow",
        "bet": "6.99",
        "type": "soccer"
      },
      {
        "cat": "Which Team To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Both teams",
        "bet": "1.64",
        "type": "soccer"
      }
    ],
    "oddoreven": [
      {
        "cat": "Odd/Even",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Odd",
        "bet": "1.89",
        "type": "soccer"
      },
      {
        "cat": "Odd/Even",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Even",
        "bet": "1.75",
        "type": "soccer"
      }
    ],
    "exactgoals": [
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0",
        "bet": "12.72",
        "type": "soccer"
      },
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1",
        "bet": "5.28",
        "type": "soccer"
      },
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2",
        "bet": "3.49",
        "type": "soccer"
      },
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3",
        "bet": "3.92",
        "type": "soccer"
      },
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4",
        "bet": "5.11",
        "type": "soccer"
      },
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "5",
        "bet": "9.26",
        "type": "soccer"
      },
      {
        "cat": "Exact Goals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "6+",
        "bet": "11.56",
        "type": "soccer"
      }
    ],
    "halftimefulltime": [
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow / Garbarnia Krakow",
        "bet": "6.16",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow / LKP Motor Liblin",
        "bet": "28.13",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin / Garbarnia Krakow",
        "bet": "41.64",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin / LKP Motor Liblin",
        "bet": "3.14",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw / Draw",
        "bet": "5.59",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw / Garbarnia Krakow",
        "bet": "8.79",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw / LKP Motor Liblin",
        "bet": "5.46",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow / Draw",
        "bet": "15.21",
        "type": "soccer"
      },
      {
        "cat": "Halftime/Fulltime",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin / Draw",
        "bet": "14.68",
        "type": "soccer"
      }
    ],
    "winningmargin": [
      {
        "cat": "Winning Margin",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin By 1",
        "bet": "4.08",
        "type": "soccer"
      },
      {
        "cat": "Winning Margin",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin By 2",
        "bet": "6.18",
        "type": "soccer"
      },
      {
        "cat": "Winning Margin",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin By 3+",
        "bet": "8.16",
        "type": "soccer"
      },
      {
        "cat": "Winning Margin",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow By 1",
        "bet": "5.75",
        "type": "soccer"
      },
      {
        "cat": "Winning Margin",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow By 2",
        "bet": "12.36",
        "type": "soccer"
      },
      {
        "cat": "Winning Margin",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow By 3+",
        "bet": "26.73",
        "type": "soccer"
      }
    ],
    "goalsrange": [
      {
        "cat": "Goals Range",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0-1",
        "bet": "4.03",
        "type": "soccer"
      },
      {
        "cat": "Goals Range",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2-3",
        "bet": "2.02",
        "type": "soccer"
      },
      {
        "cat": "Goals Range",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4-6",
        "bet": "3.06",
        "type": "soccer"
      },
      {
        "cat": "Goals Range",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "7+",
        "bet": "32.86",
        "type": "soccer"
      }
    ],
    "correctscore": [
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0",
        "bet": "10.44",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1",
        "bet": "10.26",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:2",
        "bet": "17.12",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:3",
        "bet": "42.89",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:4",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0",
        "bet": "7.32",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:1",
        "bet": "5.43",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:2",
        "bet": "10.32",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:3",
        "bet": "25.66",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:4",
        "bet": "86.00",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:0",
        "bet": "8.64",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:1",
        "bet": "7.36",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:2",
        "bet": "10.57",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:3",
        "bet": "30.45",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:4",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:0",
        "bet": "15.14",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:1",
        "bet": "12.86",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:2",
        "bet": "21.51",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:3",
        "bet": "46.59",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:4",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4:0",
        "bet": "35.52",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4:1",
        "bet": "30.11",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4:2",
        "bet": "50.70",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4:3",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4:4",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Other",
        "bet": "19.16",
        "type": "soccer"
      }
    ],
    "highestscoringhalf": [
      {
        "cat": "Highest Scoring Half",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1st half",
        "bet": "3.10",
        "type": "soccer"
      },
      {
        "cat": "Highest Scoring Half",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2nd half",
        "bet": "1.99",
        "type": "soccer"
      },
      {
        "cat": "Highest Scoring Half",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Equal",
        "bet": "3.40",
        "type": "soccer"
      }
    ],
    "totalandbothteamstoscore": [
      {
        "cat": "Total & Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Over 2.5 & yes",
        "bet": "2.05",
        "type": "soccer"
      },
      {
        "cat": "Total & Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Under 2.5 & yes",
        "bet": "6.78",
        "type": "soccer"
      },
      {
        "cat": "Total & Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Over 2.5 & no",
        "bet": "9.37",
        "type": "soccer"
      },
      {
        "cat": "Total & Both Teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Under 2.5 & no",
        "bet": "2.65",
        "type": "soccer"
      }
    ],
    "halffullcorrectscore": [
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 0:0",
        "bet": "10.62",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 0:1",
        "bet": "17.13",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 0:2",
        "bet": "50.80",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 0:3",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 1:0",
        "bet": "12.41",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 1:1",
        "bet": "16.57",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 1:2",
        "bet": "60.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 2:0",
        "bet": "25.48",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 2:1",
        "bet": "42.47",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 3:0",
        "bet": "82.90",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:0 4+",
        "bet": "33.09",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 0:1",
        "bet": "25.69",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 0:2",
        "bet": "35.66",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 0:3",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 1:1",
        "bet": "21.82",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 1:2",
        "bet": "37.90",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 2:1",
        "bet": "47.36",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:1 4+",
        "bet": "19.92",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:2 0:2",
        "bet": "96.40",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:2 0:3",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:2 1:2",
        "bet": "98.20",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:2 4+",
        "bet": "34.24",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:3 0:3",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:3 4+",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 1:0",
        "bet": "17.59",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 1:1",
        "bet": "20.90",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 1:2",
        "bet": "63.30",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 2:0",
        "bet": "17.57",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 2:1",
        "bet": "26.17",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 3:0",
        "bet": "36.52",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0 4+",
        "bet": "14.60",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:1 1:1",
        "bet": "27.67",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:1 1:2",
        "bet": "47.61",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:1 2:1",
        "bet": "33.87",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:1 4+",
        "bet": "13.44",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:2 1:2",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:2 4+",
        "bet": "29.37",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:0 2:0",
        "bet": "48.88",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:0 2:1",
        "bet": "68.40",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:0 3:0",
        "bet": "47.23",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:0 4+",
        "bet": "17.04",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:1 2:1",
        "bet": "85.50",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:1 4+",
        "bet": "20.98",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:0 3:0",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:0 4+",
        "bet": "43.35",
        "type": "soccer"
      },
      {
        "cat": "Half/Full Correct Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4+ 4+",
        "bet": "17.60",
        "type": "soccer"
      }
    ],
    "bothhalvesover15": [
      {
        "cat": "Both Halves Over 1.5",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "yes",
        "bet": "4.18",
        "type": "soccer"
      },
      {
        "cat": "Both Halves Over 1.5",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "no",
        "bet": "1.14",
        "type": "soccer"
      }
    ],
    "bothhalvesunder15": [
      {
        "cat": "Both Halves Under 1.5",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "yes",
        "bet": "2.48",
        "type": "soccer"
      },
      {
        "cat": "Both Halves Under 1.5",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "no",
        "bet": "1.39",
        "type": "soccer"
      }
    ],
    "firstsecondhalfbothtoscore": [
      {
        "cat": "1st/2nd Half Both teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "No/no",
        "bet": "1.57",
        "type": "soccer"
      },
      {
        "cat": "1st/2nd Half Both teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Yes/no",
        "bet": "5.19",
        "type": "soccer"
      },
      {
        "cat": "1st/2nd Half Both teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Yes/yes",
        "bet": "12.14",
        "type": "soccer"
      },
      {
        "cat": "1st/2nd Half Both teams To Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "No/yes",
        "bet": "3.34",
        "type": "soccer"
      }
    ],
    "multigoals": [
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1-2",
        "bet": "1.87",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1-3",
        "bet": "1.36",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1-4",
        "bet": "1.17",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1-5",
        "bet": "1.09",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1-6",
        "bet": "1.06",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2-3",
        "bet": "1.68",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2-4",
        "bet": "1.35",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2-5",
        "bet": "1.24",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2-6",
        "bet": "1.19",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3-4",
        "bet": "1.95",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3-5",
        "bet": "1.66",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3-6",
        "bet": "1.56",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4-5",
        "bet": "2.73",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4-6",
        "bet": "2.38",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "5-6",
        "bet": "4.80",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "7+",
        "bet": "22.37",
        "type": "soccer"
      },
      {
        "cat": "Multigoals",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "No goal",
        "bet": "9.48",
        "type": "soccer"
      }
    ],
    "multiscores": [
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0, 2:0 or 3:0",
        "bet": "3.41",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:0, 2:0 or 0:3",
        "bet": "5.88",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "4:0, 5:0 or 6:0",
        "bet": "25.39",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "0:4, 0:5 or 0:6",
        "bet": "100.00",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:1, 3:1 or 4:1",
        "bet": "4.32",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "1:2, 1:3 or 1:4",
        "bet": "7.07",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "3:2, 4:2, 4:3 or 5:1",
        "bet": "12.16",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "2:3, 2:4, 3:4 or 1:5",
        "bet": "20.20",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Other homewin",
        "bet": "54.60",
        "type": "soccer"
      },
      {
        "cat": "Multiscores",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Other awaywin",
        "bet": "100.00",
        "type": "soccer"
      }
    ],
    "doublechanceandbothscore": [
      {
        "cat": "Double Chance & Both Teams to Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin/Draw & Yes",
        "bet": "2.07",
        "type": "soccer"
      },
      {
        "cat": "Double Chance & Both Teams to Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin/Draw & No",
        "bet": "2.91",
        "type": "soccer"
      },
      {
        "cat": "Double Chance & Both Teams to Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin/Garbarnia Krakow & Yes",
        "bet": "2.45",
        "type": "soccer"
      },
      {
        "cat": "Double Chance & Both Teams to Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin/Garbarnia Krakow & No",
        "bet": "2.4",
        "type": "soccer"
      },
      {
        "cat": "Double Chance & Both Teams to Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw/Garbarnia Krakow & Yes",
        "bet": "2.62",
        "type": "soccer"
      },
      {
        "cat": "Double Chance & Both Teams to Score",
        "id": "7",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Draw/Garbarnia Krakow & No",
        "bet": "4.61",
        "type": "soccer"
      }
    ]
  }

  bet: any = {
    "id": "51286",
    "date": "17/09/2020",
    "time": "14:00",
    "team_1": "LKP Motor Liblin",
    "team_2": "Garbarnia Krakow",
    "three": [
      { "cat": "home",
        "id": "",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin",
        "bet": "1.96",
        "type": "soccer"
      },
      {
        "cat": "draw",
        "id": "",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "LKP Motor Liblin or Garbarnia Krakow",
        "bet": "3.33",
        "type": "soccer"
      },
      {
        "cat": "away",
        "id": "",
        "teams": "LKP Motor Liblin vs Garbarnia Krakow",
        "team": "Garbarnia Krakow",
        "bet": "3.46",
        "type": "soccer"
        }
    ]
  }

  constructor(private betService: BetService) { }

  ngOnInit() {
    this.socket = io('http://localhost:5000/');
  }

  // url = 'http://localhost:5000/bets'

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json'
  //   })
  // }

  creatBet(){
    //this.betService.createBet(this.bet)
    //this.socket.emit("addbet", this.bet)
    this.betService.emit("addbet", this.bets);
    this.betService.listen("betadded").subscribe((data) => {
      console.log(data)
    })
  }

}
