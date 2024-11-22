import { Component, OnInit } from '@angular/core';
import { teacher } from '../../Service/Models/models';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css',
  providers: [TeacherProfileService]
})
export class TeacherProfileComponent implements OnInit{
  teacher: teacher | null = null;
  teacherForm: FormGroup;

  constructor(
    private teacherProfileService: TeacherProfileService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder // Inject FormBuilder to create the form
  ) {
    // Initialize the form group
    this.teacherForm = this.formBuilder.group({
      name: ['', Validators.required],  // Name field is required
      email: ['', [Validators.required, Validators.email]],  // Email must be valid
      phone: ['', Validators.required]   // Phone field is required
    });
  }

  ngOnInit(): void {
    const teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    if (teacherId) {
      this.loadTeacherProfile(+teacherId);  // Passing teacherId as number
    } else {
      console.error('Teacher ID not found in the URL');
    }
  }

  loadTeacherProfile(teacherId: number): void {
    this.teacherProfileService.getTeacher(teacherId).subscribe(
      (data: teacher) => {
        this.teacher = data;
        // Populate the form with the current teacher's data
        this.teacherForm.patchValue({
          name: this.teacher.name,
          email: this.teacher.email,
          phone: this.teacher.phone
        });
      },
      (error) => {
        console.error('Error loading teacher profile', error);
      }
    );
  }

  updateProfile(): void {
    if (this.teacherForm.valid && this.teacher) {
      const updatedTeacher = { ...this.teacher, ...this.teacherForm.value };  // Merge the form data with existing teacher data
      this.teacherProfileService.updateTeacher(updatedTeacher, this.teacher.id).subscribe(
        () => {
          alert('Profile updated successfully!');
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
