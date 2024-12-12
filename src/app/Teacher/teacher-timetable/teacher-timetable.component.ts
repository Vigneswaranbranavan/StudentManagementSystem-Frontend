import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimetableEntry, TimetableService } from '../../Service/Timetable/timetable.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-timetable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-timetable.component.html',
  styleUrl: './teacher-timetable.component.css'
})
export class TeacherTimetableComponent implements OnInit {
  timetables: TimetableEntry[] = [];
  loading = false;

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.getTimetables();
  }

  getTimetables(): void {
    this.loading = true;
    this.timetableService.getTimetables().subscribe({
      next: (data) => {
        this.timetables = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching timetables:', error);
        this.loading = false;
      }
    });
  }
}
