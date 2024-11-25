import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { student } from '../../Service/Models/models';



@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [NgClass,  ReactiveFormsModule,RouterModule,HttpClientModule],

  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css',
  providers:[StudentProfileService]
})
export class StudentSidebarComponent  {
  isOpen = true;
  userName: string = '';

  // studentid: string;
  





  // student: student = {
  //   name: '',
  // };


  // constructor
  // (  
  //   private studentProfileService: StudentProfileService,
  //   private route: ActivatedRoute
  // )
  // { }

  // ngOnInit() {
  //   // Subscribe to the userName observable from AuthService
  //   this.authService.userName.subscribe(name => {
  //     this.userName = name; // Update userName dynamically
  //   this.studentId = "34E74FB6-D4CF-41FF-5CE9-08DD0D1A5065"; // Example static value or dynamic fetch

  //   });
  // }

  // toggleSidebar() {
  //   this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  // }
}














// export class EditProfileComponent implements OnInit {

//   studentid: string;
  





//   student: student = {
//     id: '',
//     name: '',
//     phone: '',
//     enrollmentDate: '',
//     classID: ''
//   };

//   constructor(
//     private studentProfileService: StudentProfileService,
//     private route: ActivatedRoute
//   ) {
//     const tid = this.route.snapshot.paramMap.get('id');
//     this.studentid = String(tid);
//   }

//   ngOnInit(): void {
//     if (this.studentid) {
//       this.getStudentInfo(this.studentid);  // Fetch student data using studentid
//     }
//   }

//   getStudentInfo(studentid: string) {
//     this.studentProfileService.getStudent(studentid).subscribe(
//       (data) => {
//         this.student = data;
//       },
//       (error) => {
//         console.error('Error fetching student:', error);
//         // Optionally, show user-friendly error messages (e.g., using toastr)
//       }
//     );
//   }
// }
