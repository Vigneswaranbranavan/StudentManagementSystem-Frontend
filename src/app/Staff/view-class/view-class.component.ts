import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-class',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule,ToastrModule],
  templateUrl: './view-class.component.html',
  styleUrl: './view-class.component.css',
  providers: [ViewclassService]
})
export class ViewClassComponent implements OnInit {
  Classes: any[] = [];
  selectedClass: any = '';

  constructor(
    private service: ViewclassService, 
    private router: Router,
    private toastr: ToastrService

    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getClasses().subscribe(data => {
      this.Classes = data;
    });
  }


  newClassName: string = ''; 


  AddClass() {
    if (this.newClassName) {
      const newClass = { className: this.newClassName };

      this.service.AddClass(newClass).subscribe(
        response => {
          console.log('Class added successfully:', response);
          this.toastr.success('Class added successfully');
          this.loadData();
          this.newClassName = '';
        },
        error => {
          console.error('Error adding class:', error);
        }
      );
    }
  }



  DeleteClass(classId: any) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.service.deleteClass(classId).subscribe({
        next: () => {
          this.toastr.success('Class deleted successfully!');
          this.loadData(); 
        },
        error: (error) => {
          console.error('Error deleting class:', error);
          this.toastr.error('Failed to delete the class. Please try again.');
        }
      });
    }
  }


}
