import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimetableEntry, TimetableService } from '../../Service/Timetable/timetable.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';

@Component({
  selector: 'app-teacher-timetable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-timetable.component.html',
  styleUrl: './teacher-timetable.component.css'
})
export class TeacherTimetableComponent implements OnInit {
  timetables: TimetableEntry[] = [];
  loading = false;

  constructor(
    private timetableService: TimetableService,
    private teacherProfileService: TeacherProfileService
  ) {}

  ngOnInit(): void {
    this.getTeacherIdAndTimetables();
  }

  getTeacherIdAndTimetables(): void {
    const userId = localStorage.getItem('UserId');  // Retrieve userId from local storage

    if (userId) {
      console.log('Retrieved UserId from localStorage:', userId);
      this.teacherProfileService.getTeacher(userId).subscribe({
        next: (teacherData) => {
          console.log('Teacher Data:', teacherData);  // Log the full teacher data
          this.getTimetables(teacherData.id);  // Pass the teacher ID to get specific timetables
        },
        error: (error) => {
          console.error('Error fetching teacher profile:', error);
        }
      });
    } else {
      console.error('UserId is not found in local storage');
    }
  }

  getTimetables(teacherId: string): void {
    this.loading = true;

    // Fetch timetables for the specific teacher
    this.timetableService.getTimetableByTeacherId(teacherId).subscribe({
      next: (data) => {
        console.log('Fetched Timetables for Teacher:', data);  // Log fetched timetable data

        if (data && data.length > 0) {
          this.resolveClassNames(data);  // Resolve class names for the fetched timetables
        } else {
          console.log('No timetables found for this teacher.');
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching timetables:', error);
        this.loading = false;
      }
    });
  }

  resolveClassNames(timetables: TimetableEntry[]): void {
    const classIds = Array.from(new Set(timetables.map(t => t.classID))); // Extract unique class IDs
    console.log('Class IDs:', classIds);  // Log class IDs being fetched

    const classNameObservables = classIds.map(classId =>
      this.timetableService.getClassNameById(classId).pipe(
        map(response => ({ classId, className: response.className }))
      )
    );

    forkJoin(classNameObservables).subscribe(classNameData => {
      console.log('Fetched Class Names:', classNameData);  // Log class names fetched

      const classMap = classNameData.reduce((map, item) => {
        map[item.classId] = item.className;
        return map;
      }, {} as Record<string, string>);

      this.timetables = timetables.map(t => ({
        ...t,
        className: classMap[t.classID] || t.classID // Fallback to classID if name can't be resolved
      }));

      // Sort the timetables by date in ascending order
      this.timetables.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      console.log('Resolved Timetables with Class Names (Sorted):', this.timetables); // Log the sorted timetable entries
      this.loading = false;
    });
  }
}
