export interface staff {
    id: number;
    name: string;
    email: string;
    phone: string;

}

// teacher.ts (Model)
export interface Teacher {
    id: string; // Use string for UUID
    name: string;
    email: string;
    phone: string;
    subjectID: string;
  }
  

  export interface student {
    id: string;
    name: string;
    phone: string;
    enrollmentDate: string; // You can later format it if you need a more readable format
    classID: string;
  }
  