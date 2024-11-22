import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TimetableEntry, TimetableService } from '../../Service/Timetable/timetable.service';

interface ProcessedTimetableEntry {
  time: string;
  subject: string;
  location: string;
}

interface TimetableDay {
  day: string;
  classes: ProcessedTimetableEntry[];
}

@Component({
  selector: 'app-student-timetable',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css'],
  providers: [TimetableService]
})
export class StudentTimetableComponent implements OnInit {
  timetable: TimetableDay[] = [];

  constructor(private route: ActivatedRoute, private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.timetableService.getTimetableByClassGrade(params['grade']).subscribe((data: TimetableEntry[]) => {
        this.processTimetableData(data);
      });
    });
  }

  processTimetableData(data: TimetableEntry[]): void {
    const groupedData = data.reduce((acc, curr) => {
      const day = new Date(curr.date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push({
        time: `${curr.startTime} - ${curr.endTime}`,
        subject: curr.subject.name,
        location: curr.room
      });
      return acc;
    }, {} as { [key: string]: ProcessedTimetableEntry[] });

    this.timetable = Object.entries(groupedData).map(([day, classes]) => ({ day, classes }));
  }
}
