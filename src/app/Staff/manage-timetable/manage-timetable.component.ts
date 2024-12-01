import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimetableService } from '../../Service/Timetable/timetable.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-timetable',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterModule,CommonModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './manage-timetable.component.html',
  styleUrl: './manage-timetable.component.css',
  providers: [TimetableService, ViewclassService, TeacherRegisterService]
})
export class ManageTimetableComponent implements OnInit {


  timeTableForm: FormGroup;
  isEditMode: boolean = false;


  classes: any[] = [];

  subjects: any[] = [];

  teachers: any[] = [];



  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private classService: ViewclassService, 
    private timetableService: TimetableService,
    private teacherservice: TeacherRegisterService, 
    private route: ActivatedRoute,
    private toastr: ToastrService

     ) {
    this.timeTableForm = this.fb.group(
      {
        classID: ['', [Validators.required]],
        teacherID: ['', [Validators.required]],
        date: ['', [Validators.required]],
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
      }
    );
    
  }


  ngOnInit(): void {
    this.loadClasses();
    this.loadTeachers();
  }

  private loadClasses(): void {
    this.classService.getClasses().subscribe(
      (data) => {
        this.classes = data;
      },
      (error) => {
        console.error('Error fetching classes:', error);
        alert('Failed to load classes. Please try again later.');
      }
    );
  }

  private loadTeachers(): void {
    this.teacherservice.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error('Error fetching teachers:', error);
        alert('Failed to load teachers. Please try again later.');
      }
    );
  }

  onSubmit(): void {
    if (this.timeTableForm.invalid) {
      this.toastr.error('Please fill in all required fields.');
      return;
    }

    this.timetableService.addTimetable(this.timeTableForm.value).subscribe(
      () => {
        this.toastr.success('Timetable saved successfully!');
        this.router.navigate(['/staff/viewTimetable']);
      },
      (error) => {
        console.error('Error saving timetable:', error);
        this.toastr.error('Failed to save timetable. Please try again later.');
      }
    );
  }
}



























  // teachers = [{ id: 't1', name: 'John Doe' }, { id: 't2', name: 'Jane Smith' }];

  // constructor(private timetableservice: TimetableService, private router: Router) {}


  // onSubmit(form: NgForm) {
  //   const timetableData = form.value;

  //   this.timetableservice.addTimetable(timetableData).subscribe(response => {
  //     console.log('Timetable saved:', response);
  //     form.reset();

  //     (error: any) => {
  //       console.error('Error saving timetable:', error);
  //     }
  //   });
  // }

