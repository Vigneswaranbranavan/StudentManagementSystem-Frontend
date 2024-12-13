import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimetableEntry, TimetableService } from '../../Service/Timetable/timetable.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';

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

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.getTimetables();
  }

  getTimetables(): void {
    this.loading = true;
    this.timetableService.getTimetables().subscribe({
      next: (data) => {
        this.loading = false;
        this.resolveClassNames(data);
      },
      error: (error) => {
        console.error('Error fetching timetables:', error);
        this.loading = false;
      }
    });
  }
  resolveClassNames(timetables: TimetableEntry[]): void {
    const classIds = Array.from(new Set(timetables.map(t => t.classID))); // Extract unique class IDs
    const classNameObservables = classIds.map(classId =>
      this.timetableService.getClassNameById(classId).pipe(
        map(response => ({ classId, className: response.className }))
      )
    );
  
    forkJoin(classNameObservables).subscribe(classNameData => {
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
    });
  }
}
