# Google Search Console SEO Audit Framework for nineinternational.in

## Current Status
- **Website**: nineinternational.in
- **Access Issue**: Website currently inaccessible (connection timeout/error)
- **Required**: Wait for website to be accessible before performing technical audit

## Investigation Commands (Run when website is accessible)

### 1. Check HTTP Headers and Redirects
```bash
# Check main domain redirect status
curl -I https://nineinternational.in
curl -I https://www.nineinternational.in

# Check specific problematic URLs
curl -I https://www.nineinternational.in/products/psyllium-kernel-psyllium-gola
curl -I https://nineinternational.in/fr/blog
curl -I https://nineinternational.in/ar/about
curl -I https://nineinternational.in/es/blog
curl -I https://nineinternational.in/es/contact
curl -I https://nineinternational.in/ar/export-process
curl -I https://nineinternational.in/fr
```

### 2. Check HTML Source for Meta Tags
```bash
# Check for noindex tags
curl -s https://www.nineinternational.in/products/psyllium-kernel-psyllium-gola | grep -i "robots\|noindex"

# Check canonical tags on product pages
curl -s https://www.nineinternational.in/products/fortified-np | grep -i "canonical"
curl -s https://www.nineinternational.in/products/psyllium-lali | grep -i "canonical"
```

## ISSUE 1: Excluded by "noindex" tag

### URL to investigate:
- https://www.nineinternational.in/products/psyllium-kernel-psyllium-gola

### Investigation Steps:
1. **Check HTML `<head>` section** for:
   ```html
   <meta name="robots" content="noindex">
   <meta name="robots" content="noindex, nofollow">
   ```

2. **Check HTTP Response Headers** for:
   ```
   X-Robots-Tag: noindex
   ```

3. **Common Causes & Solutions**:
   - **CMS/Plugin Default**: Check if using WordPress, Shopify, etc. with SEO plugins
   - **Staging Environment**: Verify not accidentally using staging/dev settings
   - **Category/Product Status**: Check if product is marked as "draft" or "private"
   - **Template Issue**: Verify product template doesn't have hardcoded noindex

### Recommended Action:
```
If noindex found → Remove meta tag/header → Request reindexing in GSC
If no noindex found → Check for JavaScript-injected noindex → Review GSC for other exclusion reasons
```

## ISSUE 2: Page with redirect

### URLs to investigate:
- /fr/blog
- /ar/about  
- /es/blog
- /es/contact
- /ar/export-process
- /fr

### Investigation Steps:
1. **Trace Redirect Chain**:
   ```bash
   curl -L -I https://nineinternational.in/fr/blog
   ```

2. **Check for**:
   - Redirect loops (A→B→A)
   - Multi-hop redirects (A→B→C→D)
   - Wrong target destinations
   - Status codes (301 vs 302 vs 307)

3. **Verify hreflang Implementation**:
   ```html
   <link rel="alternate" hreflang="fr" href="https://nineinternational.in/fr/" />
   <link rel="alternate" hreflang="ar" href="https://nineinternational.in/ar/" />
   <link rel="alternate" hreflang="es" href="https://nineinternational.in/es/" />
   ```

4. **Check XML Sitemap** for redirect URLs

### Common Issues & Solutions:
- **Missing Language Pages**: Create actual localized content
- **Server Misconfiguration**: Fix .htaccess/nginx rules  
- **CMS Language Settings**: Configure multilingual plugin correctly
- **Sitemap Issues**: Remove redirecting URLs from sitemap

## ISSUE 3: Alternate page with proper canonical tag

### Product URLs to investigate:
- /products/fortified-np
- /products/psyllium-lali  
- /products/pcvs
- /products/aniline-25-disulphonic-acid
- /products/f-c-acid
- /products/beta-naphthol-series

### Investigation Steps:
1. **Extract Canonical Tags**:
   ```bash
   curl -s https://nineinternational.in/products/fortified-np | grep -i 'rel="canonical"'
   ```

2. **Check for**:
   - Self-referencing canonicals (product A → product A) ✓ Good
   - Cross-referencing canonicals (product A → product B) ❌ Investigate
   - Missing canonicals
   - Incorrect protocol/domain in canonical

3. **Common Canonical Issues**:
   - **Pagination Canonical**: Category pages pointing to page 1
   - **Duplicate Products**: Similar products canonicalizing to main variant
   - **Template Errors**: Hardcoded canonical URLs
   - **CMS Auto-Generation**: Plugin creating incorrect canonicals

### Investigation Questions:
- Are these truly duplicate products or should they rank independently?
- Do canonical targets make business sense?
- Are canonical URLs accessible and relevant?

## DELIVERABLE TABLE FORMAT

| URL | Issue Type | Current Status | Recommended Action | Priority |
|-----|------------|----------------|-------------------|----------|
| https://www.nineinternational.in/products/psyllium-kernel-psyllium-gola | Noindex | `<meta name="robots" content="noindex">` found in `<head>` | Remove noindex tag, request reindexing | High |
| https://nineinternational.in/fr/blog | Redirect | 301 → https://nineinternational.in/blog | Create French blog page or update sitemap | Medium |
| https://nineinternational.in/products/fortified-np | Wrong Canonical | Points to /products/fortified-np-main | Fix canonical or merge pages | Medium |

## TOOLS FOR DEEPER ANALYSIS

### 1. Technical SEO Tools:
- **Screaming Frog**: Crawl site for all meta robots, canonicals, redirects
- **Sitebulb**: Comprehensive technical audit
- **Google Search Console**: Coverage report for all indexing issues

### 2. Manual Verification:
```bash
# Check robots.txt
curl https://nineinternational.in/robots.txt

# Check XML sitemap
curl https://nineinternational.in/sitemap.xml

# Test specific URLs
curl -I -L https://nineinternational.in/products/[product-name]
```

### 3. GSC Actions:
- Submit URL for reindexing after fixes
- Update sitemap with corrected URLs
- Monitor indexing status over 2-4 weeks

## NEXT STEPS

1. **Wait for Website Access**: Currently unable to connect to nineinternational.in
2. **Run Investigation Commands**: Use curl/browser dev tools when site is accessible  
3. **Create Fix Implementation**: Based on findings from investigation
4. **Update XML Sitemaps**: Remove problematic URLs, add corrected ones
5. **Submit for Reindexing**: Use GSC's URL inspection tool
6. **Monitor Results**: Track indexing changes over 2-4 week period

## PRIORITY ORDER

1. **High Priority**: Fix noindex issues (immediate traffic impact)
2. **Medium Priority**: Resolve redirect chains (user experience + crawl budget)
3. **Low Priority**: Correct canonical tags (duplicate content prevention)

---

**Note**: This framework requires website accessibility to execute. Once nineinternational.in is accessible, follow the investigation commands to populate the deliverable table with actual findings.