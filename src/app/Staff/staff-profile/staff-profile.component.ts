import { Component } from '@angular/core';
import { StaffProfileService } from '../../Service/Profile/staff-profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { staff, student } from '../../Service/Models/model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-profile',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,FormsModule,RouterModule,CommonModule],
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.css'
})
export class StaffProfileComponent {
  userId: string = '';  // User ID will be fetched from localStorage
date=''
  
  staff: staff = {
    id: '',
  name: '',
  email:'',
  phone: '',

  userRes: {
    id:'',
    email: ''
  }
  };

  constructor(
    private staffProfileservice: StaffProfileService,
    private route: ActivatedRoute
  ) {
   
  }

  ngOnInit(): void {

    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);
    if (this.userId) {
      this.getStaffInfo(this.userId);  // Fetch student data using studentid
    }
  }

  getStaffInfo(staffid: string) {
    this.staffProfileservice.getStaff(staffid).subscribe(
      (data) => {
        this.staff = data;
      },
      (error) => {
        console.error('Error fetching student:', error);
        // Optionally, show user-friendly error messages (e.g., using toastr)
      }
    );
  }
}
