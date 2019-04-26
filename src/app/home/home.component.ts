import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { OccamRequesterService } from '../providers/occam-requester.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private token: string;
  private id: string;
  private revision: string;
  readonly url = 'https://occam-dev.cs.pitt.edu/QmcHkCwYQsLVdj1jZYKHKc2rfLGnaRxwcRwCMyoqU3L9dr/' +
    '5drdakP3p7FoWiSNEQQMTY6s65Zuxa/0?' +
    'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkT25seSI6IlFtY2F0Q0p4MnFTeEhockJWd' +
    'VhySkt2ODg0VGpwNTVGMjhEcHFleFNBaG82enUifQ.R1EV7GdJqc-JEkOE7EAPCwLw1SJSqfBHG0G3T1J7vyc&link=73';

  constructor(
    private router: Router,
    private occamRS: OccamRequesterService) { }

  ngOnInit() { }

  onSubmit(form) {
    // Needs to validate before redirecting to next page
    form.value.URL = this.url;
    this.setToken(form.value.URL);
    this.setId(this.url);
    this.setRevision(this.url);
    this.router.navigate(['cards', this.id, this.revision, this.token]);
  }

  private getIdRevisionFromURL(URL: string) {
    return URL.split('?')[0].slice(this.occamRS.occamUrl.length);
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
