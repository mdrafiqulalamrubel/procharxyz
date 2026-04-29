# Blog Feature Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Verify Setup
```bash
node scripts/verify-blog-setup.js
```

This checks that all blog files are properly installed.

### Step 3: Seed Categories (Optional)
```bash
node scripts/seed-blog-categories.cjs
```

Creates default blog categories so you can start writing immediately.

### Step 4: Start Your Dev Server
```bash
npm run dev
```

### Step 5: Create Your First Blog Post
1. Go to http://localhost:3000/admin/login
2. Login with admin credentials
3. Navigate to Blog section
4. Click "New Blog Post"
5. Fill in title, excerpt, content
6. Select a category
7. Add tags (optional)
8. Check "Publish" box
9. Click "Save"

Your blog post will be live at http://localhost:3000/blog/[slug]

---

## 📋 Blog Management

### Creating Posts
- **Title**: Auto-generates slug for URL
- **Excerpt**: 1-2 sentence summary shown in listings
- **Content**: Use BlockNote editor for rich formatting
- **Category**: Organize posts by topic
- **Tags**: Add multiple tags for better discoverability
- **SEO**: Add custom title, description, keywords (optional)
- **Publish**: Check to make live, uncheck for drafts

### Edit Existing Posts
1. Go to `/admin/blogs`
2. Click edit icon on any post
3. Make changes
4. Click "Save"

### Delete Posts
1. Go to `/admin/blogs`
2. Click delete button
3. Confirm deletion

---

## 👥 Frontend Views

### Blog Listing Page
- **URL**: `/blog`
- **Features**:
  - Browse all published posts
  - Search by title/content
  - Filter by category
  - Pagination (9 posts per page)
  - View counts displayed

### Single Post View
- **URL**: `/blog/[slug]`
- **Features**:
  - Full article content
  - Author, date, view count
  - Category and tags
  - Related posts (same category)
  - CTA to start free trial

### Homepage Blog Section
- Shows latest 6 blog posts
- "View All Articles" link to `/blog`
- Automatically updated when posts are published

---

## 🔌 API Endpoints

### Public Endpoints
```bash
# Get all published blogs
GET /api/blogs?page=1&limit=9&category=tips

# Get single blog
GET /api/blogs/my-blog-post

# Get categories
GET /api/blog-categories
```

### Admin Endpoints (Requires Auth Token)
```bash
# Get all blogs (including drafts)
GET /api/admin/blogs

# Create new blog
POST /api/admin/blogs

# Update blog
PUT /api/admin/blogs/[mongodbId]

# Delete blog
DELETE /api/admin/blogs/[mongodbId]

# Create category
POST /api/blog-categories
```

---

## 🗄️ Database

### Collections in MongoDB
- **blogs**: All blog posts
- **blog_categories**: Category definitions

### Auto-Created Fields
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- `views`: View counter (starts at 0)
- `slug`: URL-friendly identifier (auto-generated)

---

## 🎨 Customization

### Change Blog Colors
Edit components at:
- `pages/blog/index.tsx` - Blog listing page
- `pages/blog/[slug].tsx` - Single post page

### Customize Blog Card Layout
Modify the blog card component in:
- `pages/blog/index.tsx` (line ~180)

### Change Category Colors
Update category badge colors in:
- `pages/blog/[slug].tsx` (line ~200)

### Adjust Posts Per Page
In `pages/blog/index.tsx`, change `limit: 9` to your preferred number.

### Customize Related Posts
In `pages/blog/[slug].tsx`, change `limit: 3` to show more/fewer related posts.

---

## 🐛 Troubleshooting

### Blog Posts Not Showing
1. Check MongoDB connection: `echo $MONGODB_URI`
2. Verify post is published (check "Publish" box)
3. Check page in admin: `/admin/blogs`
4. Open browser console (F12) for API errors

### Can't Login to Admin
- Check admin token is valid
- Clear localStorage: `localStorage.clear()`
- Re-login at `/admin/login`

### BlockNote Editor Not Working
- Ensure `@blocknote/react` is installed: `npm list @blocknote/react`
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check console for errors

### Slug Generation Issues
- Ensure `slug` package installed: `npm list slug`
- Title must not be empty
- Special characters are automatically converted

---

## 📊 Advanced Features

### Categories Management
Create new categories:
```bash
curl -X POST http://localhost:3000/api/blog-categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token" \
  -d '{"name":"New Category","description":"Description"}'
```

### Filter by Tag
```
/blog?tag=email
/blog?tag=automation
```

### Search Posts
```
/blog?search=email+marketing
```

### Pagination
```
/api/blogs?page=2&limit=15
```

---

## ✨ Next Steps After Setup

1. ✅ Create 3-5 initial blog posts
2. ✅ Set up categories for your content pillars
3. ✅ Customize homepage blog section colors
4. ✅ Add blog to site navigation menu
5. ✅ Submit blog sitemap to Google Search Console
6. ✅ Set up email notifications for new posts (future feature)

---

## 📚 Complete Documentation

For detailed information, see [BLOG_SETUP.md](./BLOG_SETUP.md)

---

**Happy blogging! 🎉**
