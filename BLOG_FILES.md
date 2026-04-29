# Blog Feature - Complete File Structure

## 📂 New Files Created

```
prochar-email-marketing-website/
├── lib/
│   └── blog.types.ts                                    # TypeScript interfaces
│
├── pages/
│   ├── api/
│   │   ├── blogs/
│   │   │   ├── index.ts                                # GET/POST published blogs
│   │   │   └── [slug].ts                               # GET/PUT/DELETE single blog
│   │   ├── admin/
│   │   │   └── blogs/
│   │   │       ├── index.ts                            # GET/POST all blogs (admin)
│   │   │       └── [id].ts                             # GET/PUT/DELETE by ID (admin)
│   │   └── blog-categories.ts                          # GET/POST categories
│   │
│   ├── admin/
│   │   └── blogs/
│   │       ├── index.tsx                               # Admin dashboard
│   │       └── [id].tsx                                # Blog editor with BlockNote
│   │
│   └── blog/
│       ├── index.tsx                                   # Blog listing page
│       └── [slug].tsx                                  # Single blog post page
│
├── scripts/
│   ├── seed-blog-categories.cjs                        # Initialize default categories
│   └── verify-blog-setup.js                            # Verify installation
│
├── src/
│   └── components/
│       ├── Blog.tsx                                    # UPDATED: Dynamic blog fetch
│       └── Navbar.tsx                                  # UPDATED: Added /blog link
│
├── BLOG_SETUP.md                                        # Detailed setup guide
├── BLOG_QUICKSTART.md                                   # Quick start (5 minutes)
└── package.json                                         # UPDATED: Added dependencies

```

## 📊 Database Collections

### Collection: `blog_categories`
```javascript
{
  _id: ObjectId,
  name: String,                    // e.g., "Tips & Tricks"
  slug: String,                    // e.g., "tips-tricks"
  description: String,
  createdAt: Date
}
```

### Collection: `blogs`
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,                    // Auto-generated from title
  excerpt: String,
  content: Array,                  // BlockNote JSON format
  category: String,                // References category name
  tags: [String],
  author: String,
  image: String,                   // Optional: featured image URL
  published: Boolean,
  views: Number,
  createdAt: Date,
  updatedAt: Date,
  seoTitle: String,                // Custom SEO title
  seoDescription: String,          // Custom SEO description
  seoKeywords: [String],           // Array of keywords
  canonicalUrl: String             // Optional canonical URL
}
```

## 🔌 API References

### Public APIs (No Auth Required)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/blogs` | Fetch published blogs with filters, pagination |
| GET | `/api/blogs/[slug]` | Get single blog, increment views |
| GET | `/api/blog-categories` | Get all categories |

**Query Parameters for `/api/blogs`:**
- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 9)
- `category`: Filter by category slug
- `tag`: Filter by tag name

---

### Admin APIs (Requires Bearer Token in Header)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/blogs` | Get all blogs including drafts |
| POST | `/api/admin/blogs` | Create new blog post |
| GET | `/api/admin/blogs/[id]` | Get blog by MongoDB ID |
| PUT | `/api/admin/blogs/[id]` | Update blog post |
| DELETE | `/api/admin/blogs/[id]` | Delete blog post |
| POST | `/api/blog-categories` | Create new category |

**Required Header for Admin Routes:**
```
Authorization: Bearer {admin_token}
```

The token is stored in localStorage as `admin_token` and retrieved on each admin API call.

## 🧩 Component Integration

### Homepage (src/App.tsx or pages/index.tsx)
Blog section now dynamically fetches latest 6 posts from `/api/blogs?limit=6`

### Navbar Navigation
Added link: `href="/blog"` → Blog listing page

### Single Blog Post
- URL: `/blog/slug-name`
- Contains full article, metadata, related posts
- Includes SEO meta tags using SeoHead component

## 🔐 Authentication Flow

**Admin Login** → `localStorage.admin_token` → Attached to all admin API requests

```javascript
// Example: Creating a blog post
const token = localStorage.getItem('admin_token');
fetch('/api/admin/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({...blogData})
})
```

## 📈 Import Dependencies

These were added to `package.json`:

```json
{
  "@blocknote/core": "0.12.0",
  "@blocknote/react": "0.12.0",
  "slug": "6.1.0"
}
```

Run `npm install` to install these.

## 🚀 Deployment Checklist

- [ ] MongoDB URI configured in environment
- [ ] Dependencies installed: `npm install`
- [ ] Dependencies verified: `node scripts/verify-blog-setup.js`
- [ ] Categories seeded: `node scripts/seed-blog-categories.cjs`
- [ ] Admin login works: `/admin/login`
- [ ] Can create blog post: `/admin/blogs` → "New Blog Post"
- [ ] Blog appears on listing: `/blog`
- [ ] Can view single post: `/blog/post-slug`
- [ ] Homepage blog section shows latest posts
- [ ] Navbar blog link works
- [ ] SEO meta tags appear in page source

## 📝 Usage Examples

### Create Blog Post (Frontend)
```javascript
const title = "Email Marketing Tips";
const blogData = {
  title,
  excerpt: "7 essential tips for better email campaigns",
  content: [],  // BlockNote JSON from editor
  category: "Tips & Tricks",
  tags: ["email", "marketing", "tips"],
  author: "John Doe",
  published: true,
  seoTitle: "7 Email Marketing Tips | Prochar",
  seoDescription: "Learn essential email marketing tips to improve your campaigns",
  seoKeywords: ["email marketing", "tips", "campaigns"]
};

fetch('/api/admin/blogs', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(blogData)
});
```

### Fetch Blogs with Filters
```javascript
// Get page 2, 15 posts per page, filter by category
fetch('/api/blogs?page=2&limit=15&category=automation')
  .then(r => r.json())
  .then(({blogs, total, pages}) => console.log(blogs))
```

### Get Single Blog
```javascript
fetch('/api/blogs/my-blog-post-slug')
  .then(r => r.json())
  .then(blog => console.log(blog))
```

## 🎯 Next Steps

1. Run `npm install` to get dependencies
2. Run `node scripts/verify-blog-setup.js` to verify setup
3. Run `node scripts/seed-blog-categories.cjs` to create default categories
4. Start dev server: `npm run dev`
5. Go to `/admin/blogs` and create first post
6. View blog at `/blog`

---

**All blog files are created and ready to use!** 🎉

For questions, see [BLOG_SETUP.md](./BLOG_SETUP.md) or [BLOG_QUICKSTART.md](./BLOG_QUICKSTART.md)
