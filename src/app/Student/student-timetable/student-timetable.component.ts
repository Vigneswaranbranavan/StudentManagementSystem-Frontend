import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TimetableEntry, TimetableService } from '../../Service/Timetable/timetable.service';

@Component({
  selector: 'app-student-timetable',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css'],
  providers: [TimetableService]
})
export class StudentTimetableComponent implements OnInit {
  timetable: any[] = [];
  classId: string = '';

  constructor(private timetableService: TimetableService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('classId')!;

    this.timetableService.getTimetableByClassId(this.classId).subscribe(data => {
      this.timetable = data;
    });
  }
}
