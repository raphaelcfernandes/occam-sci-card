import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-out'))
    ])
  ]
})

export class AppComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  private fileList: any = [];
  private invalidFiles: any = [];
  private flip = 'inactive';
  private res: any;
  private btnStyle = 'flip-card-inner';
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  title = 'occam-sci-card';
  readonly url = 'https://occam-dev.cs.pitt.edu/QmcHkCwYQsLVdj1jZYKHKc2rfLGnaRxwcRwCMyoqU3L9dr/5drdakP3p7FoWiSNEQQMTY6s65Zuxa/0/output?link=73&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFkT25seSI6IlFtY2F0Q0p4MnFTeEhockJWdVhySkt2ODg0VGpwNTVGMjhEcHFleFNBaG82enUifQ.R1EV7GdJqc-JEkOE7EAPCwLw1SJSqfBHG0G3T1J7vyc';
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.httpClient.get(this.url).subscribe(res => {
      this.res = res;
      console.log(this.res);
    });
  }
  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }

  onFilesChange(fileList: Array<File>){
    this.fileList = fileList;
    console.log(this.fileList)
  }

  onFileInvalids(fileList: Array<File>){
    this.invalidFiles = fileList;
  }
}