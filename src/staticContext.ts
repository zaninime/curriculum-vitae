import React from "react";

export interface WorkType {
  workplace: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface EducationType {
  university: string;
  course: string;
  projects: string[];
}

export interface LanguageType {
  name: string;
  level: string;
}

export interface StaticContextType {
  work: Array<WorkType>;
  freelance: Array<WorkType>;
  education: Array<EducationType>;
  languages: Array<LanguageType>;
  interests: string[];
  skills: string[];
}

export const StaticContext = React.createContext<StaticContextType>(
  (undefined as unknown) as StaticContextType
);
