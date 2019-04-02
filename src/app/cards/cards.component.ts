import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class CardsComponent implements OnInit, OnDestroy {
  private flip = 'inactive';
  private sub: any;
  private id: string;
  private token: string;
  private revision: string;
  private config: any;
  private plotsUrlArrays = [];
  private XSIMConfig: any;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private occamRS: OccamRequesterService) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(data => {
      this.setId(data.id);
      this.setRevision(data.revision);
      this.setToken(data.token);
      const t = 'https://occam-dev.cs.pitt.edu/QmcHkCwYQsLVdj1jZYKHKc2rfLGnaRxwcRwCMyoqU3L9dr/5drdakP3p7FoWiSNEQQMTY6s65Zuxa/0?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkT25seSI6IlFtY2F0Q0p4MnFTeEhockJWdVhySkt2ODg0VGpwNTVGMjhEcHFleFNBaG82enUifQ.R1EV7GdJqc-JEkOE7EAPCwLw1SJSqfBHG0G3T1J7vyc&link=73';
      const url = this.reconstructExperimentURL();
      const arr = url.split('?');
      arr.splice(1, 0, '/output?');
      const outputURL = arr.join('');
      this.occamRS.getBuildFromExperiment(t).then(result => {
        
        console.log(result);
        this.XSIMConfig = result;
      });
      this.httpClient.get("https://occam-dev.cs.pitt.edu/QmQ1i5VjdxdU7dWCkhpM7ccVDCBNPX2swTLQSHRiCW8sK1").toPromise().then(result => {
        console.log(result)
      })
      // this.occamRS.getConfigurationFromExperiment(url).then(result => {
      //   this.config = result;
      // });
      // this.occamRS.getOutputFromExperiment(outputURL).then(result => {
      //   for (const data of result) {
      //     if (data.type === 'plot') {
      //       const plotURL = this.occamRS.occamUrl + data.id + '/' + data.revision + '?token=' + this.token + '&embed';
      //       this.plotsUrlArrays.push({ url: plotURL, state: 'inactive' });
      //     }
      //   }
      // });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleFlip(element) {
    element.state = (element.state === 'inactive') ? 'active' : 'inactive';
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