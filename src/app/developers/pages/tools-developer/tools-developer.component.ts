import { Component, OnInit } from '@angular/core';

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

  tools: Tool[] = [
    {value: 'project-0', viewValue: 'Project', route: 'project'},
    {value: 'certificate-1', viewValue: 'Certificate', route: 'certificate'},
    {value: 'database-2', viewValue: 'Database', route: 'database'},
    {value: 'programmingLanguage-3', viewValue: 'Programming Language', route: 'programmingLanguage'},
    {value: 'framework-4', viewValue: 'Framework', route: 'framework'},
    {value: 'database-5', viewValue: 'Database', route: 'database'},
    {value: 'studyCenter-6', viewValue: 'Study Center', route: 'studyCenter'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
