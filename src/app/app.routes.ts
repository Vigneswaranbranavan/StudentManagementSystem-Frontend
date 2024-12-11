import { Routes } from '@angular/router';
import { StudentAttendanceComponent } from './Student/student-attendance/student-attendance.component';
import { StudentFeedbackComponent } from './Student/student-feedback/student-feedback.component';
import { StudentNotificationComponent } from './Student/student-notification/student-notification.component';
import { StudentTimetableComponent } from './Student/student-timetable/student-timetable.component';
import { StudentHomeComponent } from './Student/student-home/student-home.component';
import { RegisterStudentComponent } from './Staff/register-student/register-student.component';
import { MarkAttendanceComponent } from './Staff/mark-attendance/mark-attendance.component';
import { ManageTimetableComponent } from './Staff/manage-timetable/manage-timetable.component';
import { LoginComponent } from './Auth/login/login.component';
import { EditProfileComponent } from './Student/edit-profile/edit-profile.component';

import { DashboardComponent } from './Administrator/dashboard/dashboard.component';
import { AdminViewAttendanceComponent } from './Administrator/admin-view-attendance/admin-view-attendance.component';
import { AdminViewFeedbackComponent } from './Administrator/admin-view-feedback/admin-view-feedback.component';
import { AdminViewTimetablesComponent } from './Administrator/admin-view-timetables/admin-view-timetables.component';
import { TeacherNotificationComponent } from './Teacher/teacher-notification/teacher-notification.component';
import { TeacherFeedbackComponent } from './Teacher/teacher-feedback/teacher-feedback.component';
import { TeacherProfileComponent } from './Teacher/teacher-profile/teacher-profile.component';
import { TeacherTimetableComponent } from './Teacher/teacher-timetable/teacher-timetable.component';
import { ViewStudentsComponent } from './Staff/view-students/view-students.component';
import { ViewClassComponent } from './Staff/view-class/view-class.component';
import { TeacherAddUpdateComponent } from './Administrator/teacher-add-update/teacher-add-update.component';
import { StaffAddUpdateComponent } from './Administrator/staff-add-update/staff-add-update.component';
import { ViewTeacherComponent } from './Administrator/view-teacher/view-teacher.component';
import { ViewStaffComponent } from './Administrator/view-staff/view-staff.component';
import { HomeComponent } from './Home/home/home.component';
import { StudentSidebarComponent } from './Student/student-sidebar/student-sidebar.component';

import { StaffSidebarComponent } from './Staff/staff-sidebar/staff-sidebar.component';
import { AdminSidebarComponent } from './Administrator/admin-sidebar/admin-sidebar.component';
import { TeacherSidebarComponent } from './Teacher/teacher-sidebar/teacher-sidebar.component';
import { ViewtimetableComponent } from './Staff/viewtimetable/viewtimetable.component';
import { StaffdashboardComponent } from './Staff/staffdashboard/staffdashboard.component';
import { StaffProfileComponent } from './Staff/staff-profile/staff-profile.component';
import { OtpComponent } from './Auth/otp/otp.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgotPassword',component: OtpComponent},

    // for student
    {
        path: 'student', component:StudentSidebarComponent,
        children: [
            { path: 'home', component: StudentHomeComponent },
            { path: 'attendance', component: StudentAttendanceComponent },
            { path: 'feedback', component: StudentFeedbackComponent },
            { path: 'notification', component: StudentNotificationComponent },
            { path: 'timetable', component: StudentTimetableComponent },
            { path: 'edit-profile', component: EditProfileComponent },

        ],
    },


    //for staff
    {
        path: 'staff',component:StaffSidebarComponent,
        children: [
            { path: '', component: StaffdashboardComponent },
            { path: 'student-register', component: RegisterStudentComponent },
            { path: 'studentupdate', component: RegisterStudentComponent },
            { path: 'mark-attendance', component: MarkAttendanceComponent },
            { path: 'manage-timetable', component: ManageTimetableComponent },
            { path: 'viewTimetable', component: ViewtimetableComponent },
            { path: 'viewStudents', component: ViewStudentsComponent },
            { path: 'viewClassSubject', component: ViewClassComponent },
            { path: 'profile', component: StaffProfileComponent },

            
        ],
    },

    //for admin
    {
        path: 'admin',component:AdminSidebarComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'viewAttendance', component: AdminViewAttendanceComponent },
            { path: 'viewFeedback', component: AdminViewFeedbackComponent },
            { path: 'viewTimetable', component: ViewtimetableComponent },
            { path: 'viewTeacher', component: ViewTeacherComponent },
            { path: 'viewStudents', component: ViewStudentsComponent },
            { path: 'viewStaff', component: ViewStaffComponent },
            { path: 'addStaff', component: StaffAddUpdateComponent },
            { path: 'staffupdate', component: StaffAddUpdateComponent },
            { path: 'addTeacher', component: TeacherAddUpdateComponent },
            { path: 'teacherupdate', component: TeacherAddUpdateComponent },

        ],
    },


    //for teachers
    {
        path: 'teacher',component:TeacherSidebarComponent,
        children: [
            { path: '', component: TeacherTimetableComponent },
            { path: 'notification', component: TeacherNotificationComponent },
            { path: 'feedback', component: TeacherFeedbackComponent },
            { path: 'profile', component: TeacherProfileComponent },
            { path: 'home', component: EditProfileComponent },
        ],
    },

    { path: '**', redirectTo: '/home' },





];
