import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css',
  providers: [StudentRegisterService, ViewclassService]
})
export class RegisterStudentComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode: boolean = false;

  students: any[] = [];

  classes: any[] = [];

  studentid: string;


  constructor(private fb: FormBuilder, private service: StudentRegisterService, private router: Router, private classService: ViewclassService, private route: ActivatedRoute) {


    const sid = this.route.snapshot.paramMap.get("id");
    this.studentid = String(sid);

    if (sid) {
      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }





    if (this.isEditMode == true) {
      this.studentForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        classID: ['', [Validators.required]] // Class field for students
      });
    } else {
      this.studentForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        classID: ['', [Validators.required]] // Class field for students
      });
    }




  }

  ngOnInit(): void {


    if (this.isEditMode == true) {
      this.service.getStudent(this.studentid).subscribe((data: any) => {
        this.studentForm.patchValue(data);



      })
    }
    this.classService.getClasses().subscribe(data => {
      this.classes = data
    })


  }





  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value; // Get form data

      if (this.isEditMode) {

        this.studentid = student.id
        this.service.editStudent(this.studentid, student).subscribe(data => {
          alert("Student updated successfully!");
          this.studentForm.reset();
          this.router.navigate(["/viewStudents"]); // Reset the form after successful update
        },
          (error) => {
            console.error("Error updating student:", error);
            alert("Failed to update student. Please try again.");
          }
        );
      } else {
        // If adding, add a new student
        this.service.AddStudent(student).subscribe(
          (data) => {
            alert("Student added successfully!");
            this.studentForm.reset();
            this.router.navigate(["/viewStudents"]);  // Reset the form after successful addition
          },
          (error) => {
            console.error("Error adding student:", error);
            alert("Failed to add student. Please try again.");
          }
        );
      }
    } else {
      alert("Please fill all required fields correctly.");
    }
  }



  cancel() {
    this.studentForm.reset()
    this.router.navigate(['/viewStudents'])
  }


































  //   this.studentForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  //     classID: ['', [Validators.required]] // Class field for students
  //   });
  // }


  //  ngOnInit() {
  //     this.classService.getClasses().subscribe(data => {
  //       this.classes = data
  //     })
  //   }


  //   onSubmit() {
  //     if (this.studentForm.valid) {
  //       const student = this.studentForm.value;


  //       // let obj : any = {
  //       //   name : student.name,
  //       //   email : student.email,
  //       //   phone : student.phone,
  //       //   classID : parseInt(student.classID),

  //       //  }





  //       this.service.AddStudent(student).subscribe(
  //         () => {
  //           alert('Student added successfully');
  //           this.studentForm.reset();
  //           this.router.navigate(["/viewStudents"]);
  //         },
  //         (error) => {
  //           console.error('Error adding student:', error);
  //           alert('Failed to add student. Please try again.');
  //         }
  //       );
  //     } else {
  //       alert('Please fill all required fields correctly.');
  //     }
  //   }
}
