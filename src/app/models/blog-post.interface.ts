export interface BlogPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  draft: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPostCreateDto {
  title: string;
  content: string;
  draft: boolean;
}

export interface BlogPostUpdateDto {
  title?: string;
  content?: string;
  draft?: boolean;
}
