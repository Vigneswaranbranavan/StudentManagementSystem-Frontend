import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css',
  providers: [StudentRegisterService]
})
export class RegisterStudentComponent implements OnInit{
  studentForm: FormGroup;

  students: any[] = [];

  classes: string[] = ['Class A', 'Class B', 'Class C', 'Class D']; // List of classes for students

  constructor(private fb: FormBuilder, private service :  StudentRegisterService, private router: Router) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      classID: ['', [Validators.required]] // Class field for students
    });
  }

  ngOnInit() {
    this.service.getStudents().subscribe(data => {
      this.students = data
    })
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value;


      let obj : any = {
        name : student.name,
        email : student.email,
        phone : student.phone,
        classID : parseInt(student.classID),
      
       }





      this.service.AddStudent(obj).subscribe(
        () => {
          alert('Student added successfully');
          this.studentForm.reset();
          this.router.navigate(["/viewStudents"]);
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
