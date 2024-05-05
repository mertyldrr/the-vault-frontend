export interface BlogPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  draft: boolean;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string | null;
}

export interface BlogPostCreateDto {
  title: string;
  content: string;
  draft: boolean;
  thumbnailUrl?: string | null;
}

export interface BlogPostUpdateDto {
  title?: string;
  content?: string;
  draft?: boolean;
  thumbnailUrl?: string | null;
}
