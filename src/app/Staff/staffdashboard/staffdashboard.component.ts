import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-staffdashboard',
  standalone: true,
  imports: [CommonModule,NgxChartsModule],
  templateUrl: './staffdashboard.component.html',
  styleUrl: './staffdashboard.component.css',
  // providers:[TeacherRegisterService, StudentRegisterService, ViewclassService, ViewSubjectService]
})
export class StaffdashboardComponent implements OnInit{
  // Data for the dashboard
  totalStudents = 0;
  totalTeachers = 0;
  totalClasses = 0;
  totalSubjects = 0;
  
  view: [number,number] = [300, 200];

  colorScheme: Color = {
    name: 'customColorScheme',  // Name of the color scheme
    selectable: true,           // Make it selectable
    group: ScaleType.Ordinal,           // Group for ordinal colors
    domain: ['#5D9CEC', '#FFB6C1', '#8E44AD', '#F39C12']  // Color domain
  };

  pieChartData = [
    { name: 'Students', value: 10 },
    { name: 'Teachers', value: 5 },
    { name: 'Classes', value: 8 },
    { name: 'Subjects', value: 7 }
  ];

   constructor(
    private teacherService : TeacherRegisterService,
    private studentService: StudentRegisterService, 
    private classService: ViewclassService, 
    private subjectservice: ViewSubjectService
  ){}
 

 
 
  ngOnInit(): void {
   this.loadTeachers();
   this.loadStudents();
   this.loadClasses();
   this.loadSubjects();
   
 
 }
 
 loadTeachers(): void {
   this.teacherService.getTeachers().subscribe({
     next: (teachers) => {
       this.totalTeachers = teachers.length;
       this.updatePieChartData();
     },
     error: (err) => {
       console.error('Error fetching teachers:', err);
     },
   });
 }
 
 
 loadStudents(): void {
   this.studentService.getStudents().subscribe({
     next: (students) => {
       this.totalStudents = students.length;
       this.updatePieChartData();
     },
     error: (err) => {
       console.error('Error fetching students:', err);
     },
   });
 }
 
 
 loadClasses(): void {
   this.classService.getClasses().subscribe({
     next: (classes) => {
       this.totalClasses = classes.length;
       this.updatePieChartData();
     },
     error: (err) => {
       console.error('Error fetching classes:', err);
     },
   });
 }
 
 loadSubjects(): void {
   this.subjectservice.getSubjects().subscribe({
     next: (subjects) => {
       this.totalSubjects = subjects.length;
       this.updatePieChartData();
     },
     error: (err) => {
       console.error('Error fetching subjects:', err);
     },
   });
 }
 

 updatePieChartData() {
  this.pieChartData = [
    { name: 'Students', value: this.totalStudents },
    { name: 'Teachers', value: this.totalTeachers },
    { name: 'Classes', value: this.totalClasses },
    { name: 'Subjects', value: this.totalSubjects }
  ];
}
 
 
 }
 