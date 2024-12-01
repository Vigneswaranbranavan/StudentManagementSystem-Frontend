import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { student } from '../../Service/Models/model'; 



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
studentid: any|string;


  toggleSidebar() {
    this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  }

  constructor
  (  
    private studentProfileService: StudentProfileService,
    private route: ActivatedRoute
  )
  {
    
  }

}










