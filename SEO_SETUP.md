# SEO & Meta Tags Configuration

This document describes the comprehensive SEO setup for Prochar.xyz with full SSR support.

## Files Added & Updated

### 1. `src/components/SeoHead.tsx` (NEW)
**Purpose:** Centralized SEO component for managing all meta tags, structured data, and SEO elements.

**Features:**
- Meta tags: title, description, keywords, theme color
- Geo-tags for Bangladesh (geo.country, geo.placename, ICBM coordinates: Dhaka)
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tags (summary_large_image format)
- JSON-LD Structured Data:
  - Organization schema
  - SoftwareApplication schema
  - BreadcrumbList schema
- Mobile optimization (viewport, apple-mobile-web-app)
- Security headers (CSP, referrer policy)
- Canonical URL support
- Alternates for multiple language versions

**Usage:**
```tsx
import SeoHead from '../src/components/SeoHead';

export default function YourPage() {
  return (
    <>
      <SeoHead 
        title="Your Page Title"
        description="Your page description"
        url="https://prochar.xyz/page"
        canonicalUrl="https://prochar.xyz/page"
      />
      {/* Your page content */}
    </>
  );
}
```

### 2. `pages/_document.tsx` (NEW)
**Purpose:** Next.js document wrapper for SSR-compatible global head management.

**Features:**
- Preconnect & DNS prefetch for performance
- PWA manifest link
- Favicon & icon configuration
- Mobile web app meta tags
- Global security meta tags
- Enhanced SEO & structured data support

### 3. `pages/index.tsx` (UPDATED)
**Purpose:** Home page with full SEO integration.

**Updated to:**
- Import and use `SeoHead` component
- Include optimized title, description, and canonical URL
- Support SSR rendering of all meta tags

### 4. `pages/admin/login.tsx` (UPDATED)
**Purpose:** Admin login page with noindex directive.

**Updated to:**
- Add `<Head>` with `<meta name="robots" content="noindex, nofollow" />`
- Prevents search engines from indexing admin pages
- Maintains security of admin area

### 5. `public/manifest.json` (NEW)
**Purpose:** Progressive Web App (PWA) manifest for improved mobile experience and SEO.

**Features:**
- App name, short name, description
- Display mode (standalone)
- Theme colors (blue #0ea5e9)
- Icons (multiple sizes: 32x32, 192x192, 512x512)
- Shortcuts for quick actions ("Start Free Trial")
- Share target configuration
- Categories: productivity, business

**Requires:** Add icon files to `public/`:
- `favicon.ico` (32x32)
- `apple-touch-icon.png` (180x180)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `mstile-150x150.png` (Windows tiles)

### 6. `public/robots.txt` (NEW)
**Purpose:** Search engine crawler directives.

**Features:**
- Allows crawling of main content
- Blocks API routes (`/api/`, `/admin/`)
- Blocks internal Next.js files
- Specific rules for major bots (Googlebot, Bingbot)
- Social media crawler permissions (Facebook, Twitter, LinkedIn)
- Sitemap reference

### 7. `public/sitemap.xml` (NEW)
**Purpose:** XML sitemap for search engine indexing.

**Features:**
- Main homepage (priority 1.0)
- Feature section (priority 0.8)
- Pricing section (priority 0.8)
- How it Works section (priority 0.7)
- Testimonials section (priority 0.6)
- Mobile optimization hints
- Change frequency indicators
- Last modified dates

## Geo-Targeting Configuration

The site is configured for **Bangladesh** with the following geo-tags:
- `geo.country`: BD
- `geo.placename`: Dhaka, Bangladesh
- `geo.position`: 23.8150;90.3563 (Dhaka coordinates)
- `ICBM`: 23.8150, 90.3563 (Internet Cybernetic Map coordinates)

These tags help search engines understand the site's geographic relevance and local business context.

## Structured Data (JSON-LD)

Three structured data schemas are implemented:

### 1. Organization Schema
```json
{
  "@type": "Organization",
  "name": "Prochar",
  "url": "https://prochar.xyz",
  "areaServed": { "name": "Bangladesh" },
  "address": { "country": "BD", "region": "Dhaka" },
  "contactPoint": { "type": "Customer Support", "email": "support@prochar.xyz" }
}
```

### 2. SoftwareApplication Schema
```json
{
  "@type": "SoftwareApplication",
  "name": "Prochar Email Marketing",
  "applicationCategory": "MarketingApplication",
  "aggregateRating": { "ratingValue": "4.8", "ratingCount": "250" }
}
```

### 3. BreadcrumbList Schema
Navigation structure with links to main sections (Home, Features, Pricing).

## SSR & Performance Considerations

1. **Server-Side Rendering**: All meta tags are rendered on the server via `Head` component in Next.js.
2. **Preloading**: Critical fonts and resources are preloaded in `_document.tsx`.
3. **DNS Prefetch**: External domains are prefetched for faster loading.
4. **Image Optimization**: OG image should be optimized (1200x630px, <100KB).

## Next Steps & Recommendations

### Immediate (Required for Full SEO):

1. **Add Image Assets** to `public/`:
   - Create OG image: `og-image.png` (1200x630px)
   - Create favicon: `favicon.ico` (32x32)
   - Create touch icons: `apple-touch-icon.png` (180x180)
   - Create PWA icons: `icon-192.png`, `icon-512.png`

2. **Add Google Analytics** (optional):
   Uncomment in `SeoHead.tsx` and add your GA tracking ID:
   ```tsx
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   ```

3. **Add Google Site Verification**:
   In `SeoHead.tsx`, replace `YOUR_VERIFICATION_CODE`:
   ```tsx
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

4. **Update Social Media URLs**:
   In `SeoHead.tsx`, update the `sameAs` array with your actual social profiles.

### Medium Priority (Recommended):

1. **Test with Google Search Console**:
   - Submit sitemap
   - Check crawl errors
   - Monitor indexing status
   - Review search analytics

2. **Test with Bing Webmaster Tools**:
   - Similar steps as Google
   - Helps with Bing/Yahoo indexing

3. **Implement Structured Data Testing**:
   - Use Google's Rich Results Test
   - Use Schema.org validators
   - Fix any validation errors

4. **Mobile Testing**:
   - Use Google Mobile-Friendly Test
   - Ensure all icons load correctly
   - Test PWA installation on mobile

5. **Performance Testing**:
   - Run Google PageSpeed Insights
   - Check Core Web Vitals
   - Optimize images
   - Enable compression

### Long-Term (Ongoing):

1. **Regular Sitemap Updates**:
   - Update `public/sitemap.xml` when adding new pages
   - Update last modified dates

2. **Monitor Search Rankings**:
   - Track keyword positions
   - Monitor organic traffic
   - Adjust SEO strategy based on data

3. **Content Updates**:
   - Keep descriptions fresh
   - Update social proof (ratings, customer count)
   - Add new testimonials regularly

4. **Link Building**:
   - Guest posts targeting Bangladesh/South Asia
   - Local directory listings
   - Industry partnerships

5. **Local SEO**:
   - Add business schema with address
   - Get listed on Google My Business
   - Collect local reviews

## Testing Your SEO Setup

### 1. Meta Tags (Open Graph)
```bash
# Test with Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/
# Paste: https://prochar.xyz

# Or use Browser DevTools
# Inspect page source and verify <meta> tags are present
```

### 2. Structured Data
```bash
# Google Rich Results Test
https://search.google.com/test/rich-results
# Paste: https://prochar.xyz

# Schema.org Validator
https://validator.schema.org/
```

### 3. Mobile Friendly
```bash
# Google Mobile-Friendly Test
https://search.google.com/mobile-friendly
# Paste: https://prochar.xyz
```

### 4. Performance
```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/
# Paste: https://prochar.xyz

# Lighthouse (in Chrome DevTools)
# Press F12 > Lighthouse > Generate report
```

### 5. Robots & Sitemap
```bash
# Verify robots.txt
https://prochar.xyz/robots.txt

# Verify sitemap
https://prochar.xyz/sitemap.xml
```

## Key SEO Metrics

After implementation, monitor these:

1. **Crawl Stats** (Google Search Console)
   - Crawled pages
   - Crawl errors
   - Crawl requests per second

2. **Indexing** (Google Search Console)
   - Total indexed pages
   - Excluded pages (should be high for /admin)
   - Coverage issues

3. **Search Performance** (Google Search Console)
   - Impressions
   - Clicks
   - Average CTR
   - Average position

4. **Core Web Vitals**
   - Largest Contentful Paint (LCP) < 2.5s
   - First Input Delay (FID) < 100ms
   - Cumulative Layout Shift (CLS) < 0.1

## Keywords Targeted

Primary keywords for SEO:
- Email marketing platform
- Email campaigns Bangladesh
- Email automation
- Email delivery service
- CRM system Bangladesh
- Marketing automation tool
- Newsletter software
- Email template builder

Geographic keywords:
- Email marketing Dhaka
- Email platform Bangladesh
- Marketing tool for Bangladesh businesses
- Email service provider BD

## Troubleshooting

### Issue: Meta tags not showing in page source
**Solution**: Verify `Head` component is imported from `next/head`, not React.

### Issue: OG image not showing on social media
**Solution**: Ensure image is HTTPS and format is correct (1200x630px, JPEG/PNG).

### Issue: Sitemap not discovered by search engines
**Solution**: Verify `robots.txt` references correct sitemap URL and XML is valid.

### Issue: Admin pages showing in search results
**Solution**: Verify `noindex` meta tag is present in admin pages.

## References

- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
