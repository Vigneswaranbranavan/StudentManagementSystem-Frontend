import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StaffRegisterService } from '../../Service/Register/staff-register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, RouterModule],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css',
  providers: [StaffRegisterService]
})
export class ViewStaffComponent {
  staffs: any[] = [];
  


  constructor(private service: StaffRegisterService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }


  

  loadData() {
    this.service.getstaffs().subscribe(data => {
      this.staffs = data;

    });
  }
  


  

 

  EditStaff(id: string)
  {
    this.router.navigate(['admin/staffupdate' , id]);
  }

  DeleteStaff(deleteId: any) {
    if (confirm('Are you sure you want to delete this Staff?')) {
      this.service.deletestaff(deleteId).subscribe(
        () => {
          // alert('Staff deleted successfully!');
          this.toastr.success('Staff deleted successfully!');
          this.loadData(); 
        },
        (error) => {
          console.error('Error deleting Staff:', error);
          // alert('Failed to delete the Staff. Please try again.');
          this.toastr.error('Failed to delete the Staff. Please try again.');
        }
      );
    }
  }
}
