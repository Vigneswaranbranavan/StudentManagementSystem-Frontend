import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffRegisterService } from '../../Service/Register/staff-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-staff-add-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './staff-add-update.component.html',
  styleUrl: './staff-add-update.component.css',
  providers: [StaffRegisterService]
})
export class StaffAddUpdateComponent {
  StaffForm: FormGroup;
  isEditMode: boolean = false;

  staffs: any[] = [];



  staffid: string;


  constructor(private fb: FormBuilder, private service:StaffRegisterService , private router: Router, private route: ActivatedRoute) {


    const sid = this.route.snapshot.paramMap.get("id");
    console.log(sid)
    this.staffid = String(sid);

    if (sid) {
      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }





    if (this.isEditMode == true) {
      this.StaffForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
        
      });
    } else {
      this.StaffForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
       
      });
    }




  }





  ngOnInit(): void {


    if (this.isEditMode == true) {
      this.service.getstaff(this.staffid).subscribe((data: any) => {
        this.StaffForm.patchValue(data);



      })
    }



  }





  onSubmit() {
    if (this.StaffForm.valid) {
      const staff = this.StaffForm.value; // Get form data

      if (this.isEditMode) {

        this.staffid = staff.id
        this.service.editstaff(this.staffid, staff).subscribe(data => {
          alert("Staff updated successfully!");
          this.StaffForm.reset();
          this.router.navigate(["/ViewStaff"]); // Reset the form after successful update
        },
          (error) => {
            console.error("Error updating Staff:", error);
            alert("Failed to update Staff. Please try again.");
          }
        );
      } else {
        // If adding, add a new student
        this.service.Addstaff(staff).subscribe(
          (data) => {
            alert("Staff added successfully!");
            this.StaffForm.reset();
            this.router.navigate(["/ViewStaff"]);  // Reset the form after successful addition
          },
          (error) => {
            console.error("Error adding Staff:", error);
            alert("Failed to add Staff. Please try again.");
          }
        );
      }
    } else {
      alert("Please fill all required fields correctly.");
    }
  }



  cancel() {
    this.StaffForm.reset()
    this.router.navigate(['/ViewStaff'])
  }
}
