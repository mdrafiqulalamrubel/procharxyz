import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
}

export default function SeoHead({
  title = 'Prochar.xyz - Email Marketing Platform for Bangladesh',
  description = 'Send powerful email campaigns to thousands of customers. Easy-to-use platform with templates, automation, analytics, and high-deliverability infrastructure.',
  image = 'https://prochar.xyz/og-image.png',
  url = 'https://prochar.xyz',
  canonicalUrl = 'https://prochar.xyz',
}: SeoHeadProps) {
  const siteTitle = title;
  const siteDescription = description;

  // Structured data - Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prochar',
    url: url,
    logo: 'https://prochar.xyz/logo.png',
    description: siteDescription,
    sameAs: [
      'https://www.facebook.com/prochar',
      'https://www.linkedin.com/company/prochar',
      'https://twitter.com/prochar',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@prochar.xyz',
      contactOption: 'TollFree',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      country: 'BD',
      region: 'Dhaka',
      locality: 'Dhaka',
    },
  };

  // Structured data - SoftwareApplication
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Prochar Email Marketing',
    description: siteDescription,
    applicationCategory: 'MarketingApplication',
    offers: [
      {
        '@type': 'Offer',
        priceCurrency: 'BDT',
        price: '0',
        pricingPattern: 'https://schema.org/FreePrice',
        name: 'Free Plan',
      },
      {
        '@type': 'Offer',
        priceCurrency: 'BDT',
        price: '3000',
        name: 'Starter Plan',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '250',
    },
    operatingSystem: 'Web',
    url: url,
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Features',
        item: `${url}#features`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pricing',
        item: `${url}#pricing`,
      },
    ],
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={siteDescription} />
      <meta name="theme-color" content="#0ea5e9" />

      {/* Geo Tags */}
      <meta name="geo.country" content="BD" />
      <meta name="geo.placename" content="Dhaka, Bangladesh" />
      <meta name="geo.position" content="23.8150;90.3563" />
      <meta name="ICBM" content="23.8150, 90.3563" />

      {/* Keywords & Robots */}
      <meta
        name="keywords"
        content="email marketing, email campaigns, email automation, email templates, marketing automation, email delivery, Bangladesh, email platform, newsletter software, CRM, marketing tools"
      />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Prochar" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="bn_BD" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@prochar" />
      <meta name="twitter:site" content="@prochar" />

      {/* LinkedIn Tags */}
      <meta property="article:publisher" content="https://www.linkedin.com/company/prochar" />

      {/* Document Title */}
      <title>{siteTitle}</title>

      {/* Favicon & Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Prefetch & Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      {/* Google Analytics (optional - add your GA ID) */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script> */}

      {/* Google Site Verification (optional - add your verification code) */}
      {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}

      {/* Alternative Language Links */}
      <link rel="alternate" href={url} hrefLang="en-US" />
      <link rel="alternate" href={url} hrefLang="en-BD" />
      <link rel="alternate" href={url} hrefLang="x-default" />

      {/* Security & Privacy Headers */}      
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </Head>
  );
}
