import { ChangeDetectorRef, Component, OnInit, reflectComponentType } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { student, teacher } from '../../Service/Models/model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, NgIf],
  providers: [TeacherProfileService]

})
export class TeacherProfileComponent {


}