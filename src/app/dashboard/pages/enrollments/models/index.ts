import { Course } from "../../courses/models";
import { Student } from "../../students/models/student";

export interface Enrollment {
  id: string | number;
  studentId: string | number;
  courseId: string | number;
  createdByUser: string,
  createdAt: Date;
  student?: Student;
  course?: Course;
}

export interface CreateEnrollData {
  studentId: string | number | null;
  courseId: string | number | null;
}