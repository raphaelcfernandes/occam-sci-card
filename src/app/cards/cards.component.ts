import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OccamRequesterService } from '../providers/occam-requester.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [flipCard()],
  providers: [OccamRequesterService]
})

export class CardsComponent implements OnInit {
  private teste = 'https://occam-dev.cs.pitt.edu/QmRSysRBiKQahrxXsHG127aqXVfkY6TmJtF2vE3vttXgKE/5dtEv2F3CkreRjGUjoYdJsDXS9Wxgh?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkT25seSI6IlFtY2F0Q0p4MnFTeEhockJWdVhySkt2ODg0VGpwNTVGMjhEcHFleFNBaG82enUifQ.R1EV7GdJqc-JEkOE7EAPCwLw1SJSqfBHG0G3T1J7vyc&embed';
  private readonly url = 'https://occam-dev.cs.pitt.edu/QmcHkCwYQsLVdj1jZYKHKc2rfLGnaRxwcRwCMyoqU3L9dr/5drdakP3p7FoWiSNEQQMTY6s65Zuxa?link=73&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkT25seSI6IlFtY2F0Q0p4MnFTeEhockJWdVhySkt2ODg0VGpwNTVGMjhEcHFleFNBaG82enUifQ.R1EV7GdJqc-JEkOE7EAPCwLw1SJSqfBHG0G3T1J7vyc';
  private flip = 'inactive';
  private sub: any;
  private id: string;
  private token: string;
  private revision: string;
  private config: any;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private occamRS: OccamRequesterService) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(data => {
      this.setId(data.id);
      this.setRevision(data.revision);
      this.setToken(data.token);
      const url = this.reconstructURL();
      this.occamRS.getDataFromExperiment(url).then(result => {
        this.config = result;
      });
      this.httpClient.get(this.url).toPromise().then(result => {
        console.log(result);
      })
    });
  }

  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }

  private reconstructURL(): string {
    return this.occamRS.occamUrl + this.id + '/' + this.revision + '/0?token=' + this.token;
  }

  private setId(id: string) {
    this.id = id;
  }

  private setRevision(revision: string) {
    this.revision = revision;
  }

  private setToken(token: string) {
    this.token = token;
  }

}
function flipCard() {
  return trigger('flipState', [
    state('active', style({ transform: 'rotateY(180deg)' })),
    state('inactive', style({ transform: 'rotateY(0deg)' })),
    transition('active => inactive', [animate('500ms ease-in')]),
    transition('inactive => active', [animate('500ms ease-out')])
  ]);
}