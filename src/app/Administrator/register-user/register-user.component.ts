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
  userForm: FormGroup;
  roles: string[] = ['Staff', 'Teacher'];
  subjects: string[] = ['Math', 'Science', 'History', 'English'];
  classes: string[] = ['Class A', 'Class B', 'Class C', 'Class D']; // List of classes for teachers
  showSubjectField: boolean = false;
  showClassField: boolean = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['', [Validators.required]],
      subject: [''],
      class: [''] // Add class field
    });

    // Listen for role changes and show subject and class fields when needed
    this.userForm.get('role')?.valueChanges.subscribe((role) => {
      if (role === 'Teacher') {
        this.showSubjectField = true;
        this.showClassField = true;
        this.userForm.get('subject')?.setValidators([Validators.required]);
        this.userForm.get('class')?.setValidators([Validators.required]);
      } else {
        this.showSubjectField = false;
        this.showClassField = false;
        this.userForm.get('subject')?.clearValidators();
        this.userForm.get('class')?.clearValidators();
        this.userForm.get('subject')?.setValue('');
        this.userForm.get('class')?.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
