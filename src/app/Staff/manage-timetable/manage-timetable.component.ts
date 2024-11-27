import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { TimetableService } from '../../Service/Timetable/timetable.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
  subject = [{ id: 's1', name: 'Maths' }, { id: 's2', name: 'Tamil' }];

  constructor(private timetableservice: TimetableService){}

  onSubmit(form: { value: any; }){
    this.timetableservice.addTimetable(form.value).subscribe(Response => 
      console.log('Timetable saved')
    )
  }
}
