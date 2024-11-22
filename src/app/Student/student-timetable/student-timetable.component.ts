import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TimetableService } from '../../Service/Timetable/timetable.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-timetable',
  standalone: true,
  imports: [RouterModule,HttpClientModule,CommonModule],
  templateUrl: './student-timetable.component.html',
  styleUrl: './student-timetable.component.css'
})
export class StudentTimetableComponent {
  timetable: any[] = [];

  constructor(private route: ActivatedRoute, private timetableService: TimetableService){
    this.route.params.subscribe(params => {
      this.timetableService.getTimetableByClassGrade(params['grade']).subscribe(data => {
        this.timetable = data;
      });
    });
  }


}

