export interface Experience {
  id?: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  locationType: "remote" | "hybrid" | "on-site";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate?: string; // ISO date string or undefined if current job
  isCurrent: boolean;
  description: string[]; // Bullet points
  technologies: string[];
  order?: number;
}
