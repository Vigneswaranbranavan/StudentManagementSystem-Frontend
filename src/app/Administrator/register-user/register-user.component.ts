import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  studentForm: FormGroup;
  classes: string[] = ['Class A', 'Class B', 'Class C', 'Class D']; // List of classes for students

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      class: ['', [Validators.required]] // Class field for students
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value); // Handle form submission
    } else {
      console.log('Form is not valid');
    }
  }
}
