import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../Service/Models/models';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,HttpClientModule,ReactiveFormsModule,NgIf],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css',
  providers: [TeacherProfileService]
})
export class TeacherProfileComponent {
  
}