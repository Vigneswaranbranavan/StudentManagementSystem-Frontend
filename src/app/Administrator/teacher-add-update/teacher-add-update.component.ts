import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';

@Component({
  selector: 'app-teacher-add-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './teacher-add-update.component.html',
  styleUrl: './teacher-add-update.component.css',
  providers: [TeacherRegisterService, ViewSubjectService]
})
export class TeacherAddUpdateComponent {
  TeacherForm: FormGroup;
  isEditMode: boolean = false;

  teachers: any[] = [];

  subjects: any[] = [];

  teacherid: string;


  constructor(private fb: FormBuilder, private service:TeacherRegisterService , private router: Router, private subsservice: ViewSubjectService, private route: ActivatedRoute) {


    const tid = this.route.snapshot.paramMap.get("id");
    console.log(tid)
    this.teacherid = String(tid);

    if (tid) {
      this.teacherid = tid;
      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }





    if (this.isEditMode == true) {
      this.TeacherForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        subjectID: ['', [Validators.required]] 
      });
    } else {
      this.TeacherForm = this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        subjectID: ['', [Validators.required]],
        userReq: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]]
        })

      });
    }




  }





  ngOnInit(): void {


    if (this.isEditMode == true) {
      this.service.getTeacher(this.teacherid).subscribe((data: any) => {
        this.TeacherForm.patchValue(data);



      })
    }
    this.subsservice.getSubjects().subscribe(data => {
      this.subjects = data
    })


  }





  onSubmit() {
    if (this.TeacherForm.valid) {
      const teacher = this.TeacherForm.value; // Get form data

      const teacherData = {
        name: teacher.name,
        phone: teacher.phone,
        subjectID: teacher.subjectID,
        userReq: teacher.userReq // userReq is the object with email and password
      };
      
      const teacherUpdateData = {
        name: teacher.name,
        phone: teacher.phone,
        subjectID: teacher.subjectID
      };





      if (this.isEditMode) {

        
        this.service.editTeacher(this.teacherid, teacherUpdateData).subscribe(data => {
          alert("Teacher updated successfully!");
          this.TeacherForm.reset();
          this.router.navigate(["/admin/viewTeacher"]); // Reset the form after successful update
        },
          (error) => {
            console.error("Error updating teacher:", error);
            alert("Failed to update teacher. Please try again.");
          }
        );
      } else {
        // If adding, add a new student
        this.service.AddTeacher(teacherData).subscribe(
          (data) => {
            alert("teacher added successfully!");
            this.TeacherForm.reset();
            this.router.navigate(["/admin/viewTeacher"]);  // Reset the form after successful addition
          },
          (error) => {
            console.error("Error adding teacher:", error);
            alert("Failed to add teacher. Please try again.");
          }
        );
      }
    } else {
      alert("Please fill all required fields correctly.");
    }
  }



  cancel() {
    this.TeacherForm.reset()
    this.router.navigate(['/admin/viewTeacher'])
  }

}
