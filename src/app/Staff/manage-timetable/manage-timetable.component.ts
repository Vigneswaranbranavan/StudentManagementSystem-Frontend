import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TimetableService } from '../../Service/Timetable/timetable.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-timetable',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterModule,CommonModule],
  templateUrl: './manage-timetable.component.html',
  styleUrl: './manage-timetable.component.css',
  providers: [TimetableService]
})
export class ManageTimetableComponent {
  teachers = [{ id: 't1', name: 'John Doe' }, { id: 't2', name: 'Jane Smith' }];

  constructor(private timetableservice: TimetableService, private router: Router) {}

  onSubmit(form: NgForm) {
    const timetableData = form.value;

    this.timetableservice.addTimetable(timetableData).subscribe(response => {
      console.log('Timetable saved:', response);
      form.reset();

      (error: any) => {
        console.error('Error saving timetable:', error);
      }
    });
  }
}
