import { Component, OnInit } from '@angular/core';
import { teacher } from '../../Service/Models/models';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,HttpClientModule,ReactiveFormsModule,NgIf],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css',
  providers: [TeacherProfileService]
})
export class TeacherProfileComponent {
  teacherForm: FormGroup;
  teacherId!: number;  // Assert that teacherId will be assigned before use


  constructor(
    private fb: FormBuilder,
    private teacherProfileService: TeacherProfileService,
    private route: ActivatedRoute
  ) {
    // Initialize the form with validation
    this.teacherForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required]
    });
  }

  // ngOnInit(): void {
  //   // Get teacher ID from route or session (you can replace it with actual logged-in user ID)
  //   this.teacherId = 1; // This is just a placeholder for the teacher's ID

  //   // Fetch the teacher's data when the component loads
  //   this.teacherProfileService.getTeacher(this.teacherId).subscribe(
  //     (teacherData: teacher) => {
  //       // Populate the form with the fetched data
  //       this.teacherForm.patchValue({
  //         Name: teacherData.Name,
  //         Email: teacherData.Email,
  //         Phone: teacherData.Phone
  //       });
  //     },
  //     error => {
  //       console.error('Error fetching teacher data:', error);
  //     }
  //   );
  // }
  // updateProfile(): void {
  //   if (this.teacherId !== undefined && this.teacherForm.valid) {
  //     const updatedTeacher: teacher = this.teacherForm.value;
  
  //     // Update the teacher's profile via the service
  //     this.teacherProfileService.updateTeacher(updatedTeacher, this.teacherId).subscribe(
  //       response => {
  //         console.log('Profile updated successfully:', response);
  //         // Optionally, you can show a success message or navigate away
  //       },
  //       error => {
  //         console.error('Error updating profile:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Teacher ID is not valid');
  //   }
  // }
}  