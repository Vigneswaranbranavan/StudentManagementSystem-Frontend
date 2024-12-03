import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffRegisterService } from '../../Service/Register/staff-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-add-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './staff-add-update.component.html',
  styleUrl: './staff-add-update.component.css',
  providers: [StaffRegisterService]
})
export class StaffAddUpdateComponent implements OnInit{
  StaffForm: FormGroup;
  isEditMode: boolean = false;

  staffs: any[] = [];
  staffid: string;


  constructor(private fb: FormBuilder, private service: StaffRegisterService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {


    const sid = this.route.snapshot.paramMap.get("id");
    console.log(sid)
    this.staffid = String(sid);

    if (sid) {
      this.staffid = sid;
      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }

    if (this.isEditMode == true) {
      this.StaffForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]

      });
    } else {
      this.StaffForm = this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        userReq: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]]
        })

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
      

      const staffData = {
        name: staff.name,
        phone: staff.phone,
        userReq: staff.userReq // userReq is the object with email and password
      };

      const staffUpdateData = {
        name: staff.name,
        phone: staff.phone
      };

      if (this.isEditMode) {
        this.service.editstaff(this.staffid, staffUpdateData).subscribe(data => {
          // alert("Staff updated successfully!");
          this.toastr.success('Staff updated successfully!');
          this.StaffForm.reset();
          this.router.navigate(["/admin/viewStaff"]); // Reset the form after successful update
        },
          (error) => {
            console.error("Error updating Staff:", error);
            // alert("Failed to update Staff. Please try again.");
            this.toastr.error('Failed to update Staff. Please try again.');
          }
        );
      } else {
        // If adding, add a new student
        this.service.Addstaff(staffData).subscribe(
          (data) => {
            // alert("Staff added successfully!");
            this.toastr.success('Staff added successfully!');
            this.StaffForm.reset();
            this.router.navigate(["/admin/viewStaff"]);  // Reset the form after successful addition
          },
          (error) => {
            console.error("Error adding Staff:", error);
            // alert("Failed to add Staff. Please try again.");
            this.toastr.error('Failed to add Staff. Please try again.');
          }
        );
      }
    } else {
      // alert("Please fill all required fields correctly.");
      this.toastr.error('Please fill all required fields correctly.');
    }
  }



  cancel() {
    this.StaffForm.reset()
    this.router.navigate(['/admin/viewStaff'])
  }
}







