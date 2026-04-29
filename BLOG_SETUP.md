# Blog Feature Implementation Guide

## Overview
A complete blog management system with MongoDB database, BlockNote rich text editor, admin dashboard, and dynamic frontend pages.

## Features

### Admin Panel (`/admin/blogs`)
- **Blog Management Dashboard**: View, create, edit, and delete blog posts
- **Rich Text Editor**: BlockNote editor for writing beautiful content
- **SEO Settings**: Configure SEO title, description, keywords, and canonical URLs
- **Categories & Tags**: Organize posts with categories and multiple tags
- **Publish Control**: Draft and publish posts with one click
- **View Tracking**: Monitor post views and engagement

### Frontend Pages

#### Blog List (`/blog`)
- **Search & Filter**: Search articles by title/content
- **Category Filtering**: Filter posts by category
- **Pagination**: 9 posts per page with navigation
- **Responsive Grid**: Beautiful card layout with metadata
- **SEO Optimized**: Full SEO support with meta tags

#### Single Post (`/blog/[slug]`)
- **Rich Content Display**: Render BlockNote content beautifully
- **Post Metadata**: Author, date, views, category, tags
- **Related Articles**: Show related posts from same category
- **Share Button**: Easy article sharing
- **SEO**: Custom SEO title, description, and keywords per post

### API Endpoints

#### Public Endpoints
- `GET /api/blogs` - Get all published blogs (paginated)
- `GET /api/blogs/[slug]` - Get single blog post
- `GET /api/blog-categories` - Get all categories

#### Admin Endpoints (Requires Auth Token)
- `GET /api/admin/blogs` - Get all blogs (including drafts)
- `POST /api/admin/blogs` - Create new blog
- `GET /api/admin/blogs/[id]` - Get blog for editing
- `PUT /api/admin/blogs/[id]` - Update blog post
- `DELETE /api/admin/blogs/[id]` - Delete blog post
- `POST /api/blog-categories` - Create category

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

BlockNote and slug packages are already included in package.json.

### 2. Database Collections
The system automatically creates these MongoDB collections:
- **blogs** - Blog posts with full content
- **blog_categories** - Blog categories

### 3. Seed Default Categories (Optional)
Pre-populate blog with suggested categories:
```bash
node scripts/seed-blog-categories.cjs
```

This creates default categories:
- Tips & Tricks
- Automation
- Analytics
- Strategy
- E-commerce
- Deliverability

You can add more categories later through the admin panel or API.

### 4. Admin Access
Blog management is available at `/admin/blogs`:
- Login at `/admin/login`
- Navigate to Blog section in admin dashboard
- Create/edit/delete blog posts

## Creating Your First Blog Post

1. **Login to Admin**: Go to `/admin/login`
2. **Navigate to Blogs**: Click "Blog Posts" in the sidebar
3. **Create New Post**: Click "New Blog Post" button
4. **Fill Details**:
   - Title
   - Excerpt (short summary)
   - Content (use BlockNote editor)
   - Category (select existing or leave blank)
   - Tags (add multiple tags)
   - Author name
5. **SEO Settings** (optional):
   - Custom SEO title
   - Custom description
   - Keywords
   - Canonical URL
6. **Publish**: Check "Publish" checkbox
7. **Save**: Click "Save" button

Post will be live immediately at `/blog/[slug-url]`

## Creating Categories

Categories must be created before assigning to posts. Options:
1. Through API: `POST /api/blog-categories`
2. Manual MongoDB entry with fields:
   - `name`: Category name
   - `slug`: URL-friendly slug
   - `description`: Optional description

## Frontend Integration

### Blog Component (Homepage)
The homepage shows latest 6 blog posts in "Email Marketing Insights" section with:
- Automatic data fetching
- "View All Articles" link to `/blog`
- Category badges
- Author info and dates

### Navigation
- Top navbar includes "Blog" link to `/blog`
- Blog menu seamlessly blends with main site

## Code Examples

### Fetch Blog Posts (Frontend)
```javascript
const res = await fetch('/api/blogs?page=1&limit=9&category=Tips');
const { blogs, total, pages } = await res.json();
```

### Fetch Single Post
```javascript
const res = await fetch('/api/blogs/slug-name');
const post = await res.json();
```

### Create Blog (Admin API)
```javascript
const token = localStorage.getItem('admin_token');
const res = await fetch('/api/admin/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My First Post',
    excerpt: 'Summary',
    content: [],
    category: 'Tips',
    tags: ['email', 'marketing'],
    published: true,
    seoTitle: 'SEO Title',
    seoDescription: 'SEO Description'
  })
});
```

## Database Schema

### Blog Post
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  excerpt: String,
  content: Array, // BlockNote JSON
  category: String,
  tags: [String],
  author: String,
  image: String (optional),
  published: Boolean,
  views: Number,
  createdAt: Date,
  updatedAt: Date,
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  canonicalUrl: String
}
```

### Category
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  createdAt: Date
}
```

## Features & Capabilities

### Rich Text Editing
- BlockNote provides modern block-based editing
- Supports text formatting, images, code blocks, etc.
- No learning curve for users
- Clean, semantic output

### SEO Optimization
- Custom titles and descriptions per post
- Meta keywords
- Canonical URLs
- Proper heading hierarchy
- Automatic slug generation from title

### Performance
- Pagination for large blog libraries
- View tracking without affecting page performance
- Efficient MongoDB queries
- Caching where appropriate

### Admin Dashboard
- Intuitive interface
- Quick actions (edit, delete, publish/unpublish)
- Search functionality
- Pagination for large blog lists
- Status indicators (Published/Draft)

## Troubleshooting

### Blog posts not showing
- Check if published is `true`
- Verify MongoDB connection
- Check browser console for API errors

### Admin page not loading
- Ensure admin token is in localStorage
- Verify authentication middleware
- Check backend logs

### BlockNote editor not rendering
- Component is dynamically loaded (SSR disabled)
- Check browser console for errors
- Ensure @blocknote dependencies installed

### Slug generation issues
- Install `slug` package if missing: `npm install slug`
- Ensure title field is not empty
- Slug auto-updates from title on edit

## Best Practices

1. **SEO**: Always fill in SEO title and description
2. **Categories**: Keep category count reasonable (5-10)
3. **Tags**: Use consistent tag names across posts
4. **Content**: Use meaningful headings (h2, h3) in BlockNote
5. **Images**: Compress images before uploading
6. **Publishing**: Publish on consistent schedule for SEO

## Future Enhancements

Potential additions:
- Author profiles and bios
- Comments system
- Related posts algorithm
- Reading time calculation
- Social media sharing
- Email newsletter integration
- Analytics dashboard
- Scheduled publishing
- Draft auto-save
- Content templates

## Support & Issues

For issues or bugs:
1. Check MongoDB connection
2. Verify API routes exist
3. Check browser console errors
4. Review page source in Next.js debug mode
5. Check admin authentication token

---

**Blog System Ready!** Start creating engaging content for your audience.
