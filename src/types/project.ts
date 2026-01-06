export type ProjectCategory = "all" | "junk-removal" | "bathroom" | "kitchen" | "flooring";

export type ProjectMedia = {
  type: "image" | "video";
  url: string;
  thumbnail?: string; // For videos
};

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  media: ProjectMedia[];
  description?: string;
};
