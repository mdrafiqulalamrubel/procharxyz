// Blog Post model and types
export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // BlockNote JSON structure
  category: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
}

export interface BlogCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
}
