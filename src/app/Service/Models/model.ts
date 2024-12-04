import { JwtPayload } from "jwt-decode";

export interface staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  userRes: {
    id: string;
    email:string;

}}

// teacher.ts (Model)
export interface teacher {
  id: string;
  name: string;
  phone: string;
  subjectID: string;
  subject: {
    id: string;
    subjectName: string;
  };
  userRes: {
    id: string;
    email: string
  };
}

export interface student {
  id: string;
  name: string;
  phone: string;
  enrollmentDate: string;
  classID: string;
  class: {
    id: string;
    className: string;
  };
  userRes: {
    id: string;
    email: string
  };
}


export interface feedback {
  id: string;
  userID: string;
  feedbackType: string;
  comments: string;
}

export interface CustomJwtPayload extends JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}

export interface Attendance {
  id? : string;
  studentID: string;
  date: string;
  status: number;
}

export class AttendanceComponent {
  attendanceRecords = [
    { date: new Date(), status: 1 },
    { date: new Date(), status: 2 },
    { date: new Date(), status: 3 },
    // Add more records as needed
  ]};