import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-class',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-class.component.html',
  styleUrl: './view-class.component.css',
  providers: [ViewclassService]
})
export class ViewClassComponent implements OnInit {
  Classes: any[] = [];
  selectedClass: any = '';

  constructor(private service: ViewclassService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getClasses().subscribe(data => {
      this.Classes = data;
    });
  }


  newClassName: string = ''; // Variable to bind the input field


  AddClass() {
    if (this.newClassName) {
      const newClass = { className: this.newClassName }; // Create object to send to the API

      this.service.AddClass(newClass).subscribe(
        response => {
          console.log('Class added successfully:', response);
          this.loadData(); // Reload classes after adding a new one
          this.newClassName = ''; // Clear input field
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
          alert('Class deleted successfully!');
          this.loadData(); // Reload updated data
        },
        error: (error) => {
          console.error('Error deleting class:', error);
          alert('Failed to delete the class. Please try again.');
        }
      });
    }
  }


}
