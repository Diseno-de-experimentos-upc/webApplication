import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { delay } from 'rxjs';

interface Tool {
  value: string;
  viewValue: string;
  route: string;
}

@Component({
  selector: 'app-tools-developer',
  templateUrl: './tools-developer.component.html',
  styleUrls: ['./tools-developer.component.css']
})
export class ToolsDeveloperComponent implements OnInit {

  selectedValue!: string; 

  @ViewChild(MatGridList)
  gridList!: MatGridList;

  @ViewChild('first')
  firstGridTile!: MatGridTile;

  @ViewChild('second')
  secondGridTile!: MatGridTile;

  tools: Tool[] = [
    {value: 'project-0', viewValue: 'Project', route: 'project'},
    {value: 'certificate-1', viewValue: 'Certificate', route: 'certificate'},
    {value: 'database-2', viewValue: 'Database', route: 'database'},
    {value: 'programmingLanguage-3', viewValue: 'Programming Language', route: 'programming-language'},
    {value: 'framework-4', viewValue: 'Framework', route: 'framework'},
    {value: 'studyCenter-5', viewValue: 'Study Center', route: 'study-center'},
  ];

  constructor(private observer: BreakpointObserver,) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1215px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          //responsive
          this.gridList.rowHeight = '40vh';

          this.firstGridTile.colspan = 4;
          this.secondGridTile.colspan = 4;

          this.firstGridTile.rowspan = 1;
          this.secondGridTile.rowspan = 2;

        } else {
          //full -width
          this.gridList.rowHeight = '88vh';

          this.firstGridTile.colspan = 1;
          this.secondGridTile.colspan = 3;

          this.firstGridTile.rowspan = 1;
          this.secondGridTile.rowspan = 1;

        }
      });
  }

}
