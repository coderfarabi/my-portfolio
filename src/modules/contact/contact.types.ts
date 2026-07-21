export interface ContactInfo {
  id?: string;
  email: string;
  phone?: string;
  location: string;
  availabilityStatus: "available" | "busy" | "not-available";
  preferredContactMethod: "email" | "phone";
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  isRead?: boolean;
}
