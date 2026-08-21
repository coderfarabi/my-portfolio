export interface SectionConfig {
  order?: number;
  enabled?: boolean;
}

export interface SectionsConfig {
  id?: string;
  sections: Record<string, boolean | SectionConfig>;
}
