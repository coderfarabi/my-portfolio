export interface BlogPost {
  id?: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
  order?: number;
}
