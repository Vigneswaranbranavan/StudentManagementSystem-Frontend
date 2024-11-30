import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../Service/Timetable/timetable.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-timetable',
  standalone: true,

  imports: [NgIf,NgFor,CommonModule],

  templateUrl: './teacher-timetable.component.html',
  styleUrl: './teacher-timetable.component.css'
})
export class TeacherTimetableComponent implements OnInit {
  timetable: any[] = [];
  teacherId: string = '';
  teacherName: string = '';
  filteredTimetable: any[] = []; 

  constructor(private timetableService: TimetableService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.teacherId = this.route.snapshot.paramMap.get('teacherId')!;
    this.teacherName = this.route.snapshot.paramMap.get('teacherName')!;


    this.timetableService.getTimetableByTeacherId(this.teacherId).subscribe(data => {
      this.timetable = data;

      this.filterTimetable();
    });
  }

  filterTimetable() {
    this.filteredTimetable = this.timetable.map(day => {
      const filteredClasses = day.classes.filter((classInfo: { teacherID: string }) => classInfo.teacherID === this.teacherId);

      return filteredClasses.length > 0 ? { day: day.day, classes: filteredClasses } : null;
    }).filter(day => day !== null);
  }
}