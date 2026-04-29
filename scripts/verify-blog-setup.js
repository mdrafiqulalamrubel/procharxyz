/**
 * Blog Feature Verification Script
 * Run this after setting up the blog feature to verify all components are in place
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  // Type definitions
  'lib/blog.types.ts',
  
  // API routes - Public
  'pages/api/blogs/index.ts',
  'pages/api/blogs/[slug].ts',
  
  // API routes - Admin
  'pages/api/admin/blogs/index.ts',
  'pages/api/admin/blogs/[id].ts',
  
  // Categories API
  'pages/api/blog-categories.ts',
  
  // Admin pages
  'pages/admin/blogs/index.tsx',
  'pages/admin/blogs/[id].tsx',
  
  // Frontend pages
  'pages/blog/index.tsx',
  'pages/blog/[slug].tsx',
  
  // Components
  'src/components/Blog.tsx',
  'src/components/Navbar.tsx',
  
  // Documentation
  'BLOG_SETUP.md',
  'scripts/seed-blog-categories.cjs',
];

const pkgJsonDeps = [
  '@blocknote/core',
  '@blocknote/react',
  'slug',
];

console.log('\n🔍 Blog Feature Verification\n');
console.log('=' .repeat(50));

// Check files
console.log('\n📁 Checking required files...\n');
let fileMissing = false;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(fullPath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) fileMissing = true;
});

// Check package.json dependencies
console.log('\n📦 Checking dependencies in package.json...\n');
try {
  const pkgJsonPath = path.join(__dirname, '..', 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const deps = pkgJson.dependencies || {};
  
  const depsMissing = [];
  pkgJsonDeps.forEach(dep => {
    if (deps[dep]) {
      console.log(`✅ ${dep} (${deps[dep]})`);
    } else {
      console.log(`❌ ${dep}`);
      depsMissing.push(dep);
    }
  });
  
  if (depsMissing.length > 0) {
    console.log(`\n⚠️  Missing dependencies. Install with:\nnpm install ${depsMissing.join(' ')}`);
  }
} catch (err) {
  console.log('❌ Error reading package.json:', err.message);
}

// Summary
console.log('\n' + '='.repeat(50));
if (!fileMissing) {
  console.log('\n✅ All blog feature files are in place!\n');
  console.log('Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: node scripts/seed-blog-categories.cjs');
  console.log('3. Visit: http://localhost:3000/admin/blogs');
  console.log('4. Start creating blog posts!\n');
} else {
  console.log('\n⚠️  Some files are missing. Please check the setup documentation.\n');
}
