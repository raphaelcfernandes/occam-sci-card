import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  res: any;
  private token: string;
  private id: string;
  private revision: string;
  private config: any;
  readonly occamUrl = 'https://occam-dev.cs.pitt.edu/';
  readonly url = 'https://occam-dev.cs.pitt.edu/QmcHkCwYQsLVdj1jZYKHKc2rfLGnaRxwcRwCMyoqU3L9dr/' +
    '5drdakP3p7FoWiSNEQQMTY6s65Zuxa/0?' +
    'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkT25seSI6IlFtY2F0Q0p4MnFTeEhockJWd' +
    'VhySkt2ODg0VGpwNTVGMjhEcHFleFNBaG82enUifQ.R1EV7GdJqc-JEkOE7EAPCwLw1SJSqfBHG0G3T1J7vyc&link=73';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { }

  onSubmit(form) {
    // Needs to validate before redirecting to next page
    // this.setToken(form.value.URL);
    this.setToken(this.url);
    this.setId(this.url);
    this.setRevision(this.url);
    this.teste2();
  }

  private findWorkflow(obj, func) {
    for (const i in obj.contains) {
      if (obj.contains[i].type === 'workflow') {
        this.httpClient.get(this.url.split('?')[0] + '/' + i + '?token=' + this.token).subscribe((configs: any) => {
          func(configs);
        });
      }
    }
  }

  private findConfigByName(obj, name, func) {
    for (const i in obj.contains) {
      if (!obj.contains[i].name.includes(name)) {
        this.httpClient.get(this.occamUrl + obj.contains[i].id + '/' + obj.contains[i].revision + '/raw/data.json?token=' + this.token)
          .subscribe((config: any) => {
            func(config);
          });
      }
    }
  }


  private teste2() {
    this.httpClient.get(this.url).subscribe((c: any) => {
      this.findWorkflow(c, (configs) => {
        this.findConfigByName(configs, 'plotter', (config) => {
          this.config = config;
          console.log(this.config);
        });
        console.log(this.url.split('?')[0] + '/' + '?token=' + this.token);
      });
    });
  }

  private teste() {
    this.httpClient.get(this.url).subscribe((c: any) => {
      for (const i in c.contains) {
        if (c.contains[i].type === 'workflow') {
          this.httpClient.get(this.url.split('?')[0] + '/' + i + '?token=' + this.token).subscribe((configs: any) => {
            for (const k in configs.contains) {
              if (!configs.contains[k].name.includes('plotter')) {
                this.httpClient.get(this.occamUrl + configs.contains[k].id + '/' + configs.contains[k].revision + '/raw/data.json?token=' + this.token)
                  .subscribe((config: any) => {
                    this.config = config;
                    console.log(this.config);
                  });
              }
            }
          });
          console.log(this.url.split('?')[0] + '/' + i + '?token=' + this.token);
        }
      }
    });
  }

  private getIdRevisionFromURL(URL: string) {
    return URL.split('?')[0].slice(this.occamUrl.length);
  }

  private setId(URL: string) {
    this.id = this.getIdRevisionFromURL(URL).split('/')[0];
  }

  private setRevision(URL: string) {
    this.revision = this.getIdRevisionFromURL(URL).split('/')[1];
  }

  private setToken(URL: string) {
    const token = URL.split('?')[1];
    this.token = token.slice(6, token.length);
  }

}
