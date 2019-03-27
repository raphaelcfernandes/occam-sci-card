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
  private flip = 'inactive';
  private sub: any;
  private id: string;
  private token: string;
  private revision: string;
  private config: any;
  private plotsUrlArrays = [];

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private occamRS: OccamRequesterService) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(data => {
      this.setId(data.id);
      this.setRevision(data.revision);
      this.setToken(data.token);
      const url = this.reconstructExperimentURL();
      const arr = url.split('?');
      arr.splice(1, 0, '/output?');
      const outputURL = arr.join('');
      this.occamRS.getConfigurationFromExperiment(url).then(result => {
        this.config = result;
      });
      this.plotsUrlArrays = this.occamRS.getOutputFromExperiment(outputURL);
    });
  }

  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }

  private reconstructExperimentURL(): string {
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