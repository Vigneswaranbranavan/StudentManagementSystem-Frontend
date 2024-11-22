import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css',
  providers: [StudentRegisterService]
})
export class RegisterStudentComponent {
  studentForm: FormGroup;
  classes: string[] = ['Class A', 'Class B', 'Class C', 'Class D']; // List of classes for students

  constructor(private fb: FormBuilder, private service :  StudentRegisterService) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      enrollmentDate : [''],
      classID: ['', [Validators.required]] // Class field for students
    });
  }

  // onSubmit() {
  //   if (this.studentForm.valid) {
  //     console.log(this.studentForm.value); // Handle form submission
  //   } else {
  //     console.log('Form is not valid');
  //   }
  // }

  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value;
      this.service.AddStudent(student).subscribe(
        () => {
          alert('Student added successfully');
          this.studentForm.reset();
        },
        (error) => {
          console.error('Error adding student:', error);
          alert('Failed to add student. Please try again.');
        }
      );
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
