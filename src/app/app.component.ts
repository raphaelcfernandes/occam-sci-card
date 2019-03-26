import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  private fileList: any = [];
  private invalidFiles: any = [];

  constructor() { }

  ngOnInit() { }

  onFilesChange(fileList: Array<File>) {
    this.fileList = fileList;
  }

  onFileInvalids(fileList: Array<File>) {
    this.invalidFiles = fileList;
  }
}
