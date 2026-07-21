export interface Education {
  id?: string;
  institution: string;
  institutionUrl?: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate?: string; // ISO date string or undefined if currently studying
  isCurrent: boolean;
  grade?: string; // e.g. "GPA 3.8/4.0", "First Class"
  activities?: string[]; // Extracurriculars
  description?: string;
  order?: number;
}
