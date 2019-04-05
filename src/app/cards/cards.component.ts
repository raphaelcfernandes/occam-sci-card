import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OccamRequesterService } from '../providers/occam-requester.service';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';

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
  private dependencies = [];
  private buildDependencies = [];
  private runDependencies = [];
  private algName: string;

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
      //Move this to service while requesting getConfiguration or create new method for this
      this.occamRS.getDataFromURL(url).then((res: any) => {
        this.algName = res.name;
      });
      this.occamRS.getBuildFromExperiment(url).then(result => {
        this.XSIMConfig = result;
        for (data of this.XSIMConfig.dependencies) {
          this.occamRS.getBuildFromObject(data).subscribe(res => {
            //How to fix this?
            //Ask wilkie to return the version of the object
            if (res.dependencies) {
              this.dependencies.push({name: res.name, type: res.type, buildDependencies: res.build.dependencies, dependencies: res.dependencies})
            } else {
              this.dependencies.push({name: res.name, type: res.type, buildDependencies: res.build.dependencies})
            }
          });
        }
        for (data of this.XSIMConfig.build.dependencies) {
          this.occamRS.getBuildFromObject(data).subscribe(res => {
            let objectInit: any;
            let build: any;
            let myDependencies: any;
            if (res.init) {
              objectInit = res.init.dependencies;
            }
            if (res.build) {
              build = res.build.dependencies;
            }
            if (res.dependencies) {
              myDependencies = res.dependencies;
            }
            this.buildDependencies.push({name: res.name, type: res.type, buildDependencies: build, dependencies: myDependencies, init: objectInit})
          });
        }
        for (data of this.XSIMConfig.run.dependencies) {
          this.occamRS.getBuildFromObject(data).subscribe(res => {
            let objectInit: any;
            let build: any;
            let myDependencies: any;
            let myIncludes: any;
            if (res.init) {
              objectInit = res.init.dependencies;
            }
            if (res.build) {
              build = res.build.dependencies;
            }
            if (res.dependencies) {
              myDependencies = res.dependencies;
            }
            if (res.includes) {
              myIncludes = res.includes;
            }
            this.runDependencies.push({name: res.name, type: res.type, buildDependencies: build, dependencies: myDependencies, init: objectInit, includes: myIncludes})
          });
        }
        console.log(this.buildDependencies)
      });
      this.occamRS.getConfigurationFromExperiment(url).then(result => {
        this.config = result;
      });
      this.occamRS.getOutputFromExperiment(outputURL).then(result => {
        for (const data of result) {
          if (data.type === 'plot') {
            const plotURL = this.occamRS.occamUrl + data.id + '/' + data.revision + '?token=' + this.token + '&embed';
            this.plotsUrlArrays.push({ url: plotURL, state: 'inactive' });
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleFlip(element) {
    element.state = (element.state === 'inactive') ? 'active' : 'inactive';
  }

  download() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Algorithm: ' + this.algName, 10, 10);
    doc.text(10, 20, 'Environment: ' + this.XSIMConfig.environment[0].toUpperCase() + this.XSIMConfig.environment.substr(1).toLowerCase());
    doc.text(10, 30, 'Architecture: ' + this.XSIMConfig.architecture);
    let j = 30;
    let i = 20;
    doc.text(10, j += 10, 'Dependencies:');
    j += 10;
    for (let data of this.dependencies) {
      doc.text(data.name, i, j);
      j += 10;
    }
    for (let data of this.runDependencies) {
      doc.text(data.name, i, j);
      j += 10;
    }
    for (let data of this.buildDependencies) {
      doc.text(data.name, i, j);
      j += 10;
    }
    // Save the PDF
    doc.save('AE_Appendix.pdf');
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