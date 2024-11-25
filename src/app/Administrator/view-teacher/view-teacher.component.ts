import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';

@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, RouterModule],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css',
  providers: [TeacherRegisterService]
})
export class ViewTeacherComponent {
  teachers: any[] = [];
  


  constructor(private service: TeacherRegisterService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }


  

  loadData() {
    this.service.getTeachers().subscribe(data => {
      this.teachers = data;

    });
  }
  
  

 

  EditTeacher(id: string)
  {
    this.router.navigate(['teacherupdate' , id]);
  }

  DeleteTeacher(deleteId: any) {
    if (confirm('Are you sure you want to delete this Teacher?')) {
      this.service.deleteTeacher(deleteId).subscribe(
        () => {
          alert('Teacher deleted successfully!');
          this.loadData(); 
        },
        (error) => {
          console.error('Error deleting Teacher:', error);
          alert('Failed to delete the Teacher. Please try again.');
        }
      );
    }
  }
}
