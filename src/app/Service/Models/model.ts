import { JwtPayload } from "jwt-decode";

export interface staff {
  id: number;
  name: string;
  email: string;
  phone: string;

}

// teacher.ts (Model)
export interface teacher {
  id: string;
  name: string;
  phone: string;
  subjectID: string;
}


export interface student {
  id: string;
  name: string;
  phone: string;
  enrollmentDate: string;
  classID: string;
}



export interface feedback {
  id: string; 
  userID:string;
  feedbackType:string;
  comments:string; 
}

export interface CustomJwtPayload extends JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}
