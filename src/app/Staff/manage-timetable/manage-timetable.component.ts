import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimetableService } from '../../Service/Timetable/timetable.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TeacherNotificationService } from '../../Service/Notification/teacher-notification.service';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';

@Component({
  selector: 'app-manage-timetable',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule, ToastrModule],
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
  userId: string = '';  // To store the userId fetched from the API

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ViewclassService,
    private timetableService: TimetableService,
    private teacherservice: TeacherRegisterService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private TeacherProfileService: TeacherProfileService,
    private teacherNotificationService: TeacherNotificationService // Correctly inject the TeacherNotificationService
  ) {
    this.timeTableForm = this.fb.group({
      classID: ['', [Validators.required]],
      teacherID: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadTeachers();

    // const teacherId = 'some-teacher-id';  // Replace this with the actual teacher ID you have (if not in localStorage)
    // if (teacherId) {
    //   this.getTeacherUserId(teacherId);  // Fetch teacher data and extract userId
    // }
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
  getTeacherUserId(teacherId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.TeacherProfileService.teacherbyteacherid(teacherId).subscribe(
        (data) => {
          this.userId = data.userRes.id;  // Extract userId from the response and store it
          console.log('User ID from userRes:', this.userId);
          this.toastr.success('User ID fetched successfully!', 'Success');
          resolve();  // Resolve the promise after userId is fetched
        },
        (error) => {
          console.error('Error fetching Teacher data:', error);  // Log the full error response
          if (error.status === 404) {
            this.toastr.error('Teacher not found. Please check the user ID.', 'Error');
          } else {
            this.toastr.error('An error occurred. Please try again later.', 'Error');
          }
          reject(error);  // Reject the promise in case of an error
        }
      );
    });
  }
  
  


  async onSubmit(): Promise<void> {
    if (this.timeTableForm.invalid) {
      this.toastr.error('Please fill in all required fields.');
      return;
    }
  
    // Log teacherId selected from the form
    const teacherId = this.timeTableForm.get('teacherID')?.value;
    console.log('Selected Teacher ID:', teacherId);  // Print selected teacherId
    
    // Get the teacher userId for notification
    try {
      await this.getTeacherUserId(teacherId);  // Wait for the userId to be fetched
      
      // Create a notification message
      const className = this.timeTableForm.get('classID')?.value;
      const message = `Your timetable has been updated for class ${className} on ${this.timeTableForm.get('date')?.value}.`;
  
      // Send notification
      if (this.userId) {
        this.sendNotification(this.userId, 'Timetable Update', message);
      }
  
      // Save the timetable
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
    } catch (error) {
      console.error('Error fetching userId or sending notification:', error);
    }
  }
  



  private sendNotification(userId: string, notificationType: string, message: string): void {
    this.teacherNotificationService.sendNotification(userId, notificationType, message).subscribe(
      (response) => {
        console.log('Notification sent:', response);
        this.toastr.success('Notification sent successfully!');
      },
      (error: any) => {
        console.error('Error sending notification:', error);
        this.toastr.error('Failed to send notification.');
      }
    );
  }
  


}
