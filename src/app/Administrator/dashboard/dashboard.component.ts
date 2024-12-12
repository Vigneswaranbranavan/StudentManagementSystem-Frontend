import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';
import { StaffRegisterService } from '../../Service/Register/staff-register.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  // providers: [TeacherRegisterService, StudentRegisterService, ViewclassService, ViewSubjectService, StaffRegisterService]
})

export class DashboardComponent implements OnInit {
  // Data for the dashboard
  totalStudents = 0;
  totalTeachers = 0;
  totalClasses = 0;
  totalSubjects = 0;
  totalStaffs = 0;

  chartData: { name: string; value: number }[] = []; 
  pieChartData: { name: string; value: number }[] = []; 

  view: [number, number] = [700, 400]; 
  colorScheme: Color = {
    domain: ['#5D9CEC', '#FFB6C1', '#8E44AD', '#F39C12', '#1ABC9C'],
    name: 'custom',
    selectable: true, 
    group: ScaleType.Ordinal
  };
  constructor(
    private teacherService: TeacherRegisterService,
    private studentService: StudentRegisterService,
    private classService: ViewclassService,
    private subjectservice: ViewSubjectService,
    private staffService: StaffRegisterService
  ) {}


  ngOnInit(): void {
    this.loadTeachers();
    this.loadStudents();
    this.loadClasses();
    this.loadSubjects();
    this.loadStaffs();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        this.totalTeachers = teachers.length;
        this.updateChartData();
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
        this.updateChartData();
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
        this.updateChartData();
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
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error fetching subjects:', err);
      },
    });
  }

  loadStaffs(): void {
    this.staffService.getstaffs().subscribe({
      next: (staffs) => {
        this.totalStaffs = staffs.length;
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error fetching staffs:', err);
      },
    });
  }

  // Update chart data
  updateChartData() {
    this.chartData = [
      { name: 'Students', value: this.totalStudents },
      { name: 'Teachers', value: this.totalTeachers },
      { name: 'Staffs', value: this.totalStaffs },
      { name: 'Classes', value: this.totalClasses },
      { name: 'Subjects', value: this.totalSubjects },
    ];
    this.pieChartData = [
      { name: 'Students', value: this.totalStudents },
      { name: 'Teachers', value: this.totalTeachers },
      { name: 'Staffs', value: this.totalStaffs },
      { name: 'Classes', value: this.totalClasses },
      { name: 'Subjects', value: this.totalSubjects },
    ];
  }

  
}
