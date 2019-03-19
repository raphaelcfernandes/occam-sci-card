import { Component, OnInit } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations';

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

  private fileList: any = [];
  private invalidFiles: any = [];
  private flip = 'inactive';
  private res: any;

  constructor() { }

  ngOnInit() { }

  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }

  onFilesChange(fileList: Array<File>) {
    this.fileList = fileList;
    console.log(this.fileList)
  }

  onFileInvalids(fileList: Array<File>) {
    this.invalidFiles = fileList;
  }
}
