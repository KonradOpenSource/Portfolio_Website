export type ProjectCategory =
  | "Full-Stack & Systemy"
  | "Fintech & E-Commerce"
  | "Zaawansowane UI & Creative";

export type ProjectLayoutType = "featured-hero" | "interactive-preview" | "compact-card";

export interface ProjectPreview {
  badge: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  visualType: "kanban" | "ticket" | "chart" | "shop" | "ai" | "desktop" | "audio" | "pill" | "medical";
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  showInCategoryFilters?: boolean;
  shortDescription: string;
  description: string;
  goal: string;
  problemSolved: string;
  architecture: string;
  technicalSolutions: string;
  category: ProjectCategory;
  featured: boolean;
  layoutType: ProjectLayoutType;
  technologies: string[];
  features: string[];
  myRole: string;
  challenges: string;
  repoUrl: string;
  demoUrl: string | null;
  preview: ProjectPreview;
}
