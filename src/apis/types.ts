export interface Image {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  rank: number;
  image: Image;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface CategoriesResponse {
  data: Category[];
  meta: {
    pagination: Pagination;
  };
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

export type QuestionsResponse = Question[];
