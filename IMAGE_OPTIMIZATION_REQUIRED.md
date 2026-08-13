# Image Optimization - ACTION REQUIRED

## Critical: Hero Background Images

The website infrastructure has been updated to serve optimized responsive hero images. You must convert your current `hero-bg.png` (2.19MB) to AVIF and WebP formats and create responsive versions.

### Images Required

Place these optimized images in `/public/` directory:

1. **Desktop AVIF**: `hero-bg-desktop.avif` (~300-400KB)
   - Resolution: 1920x1080px (or your original dimensions)
   - Quality: High (maintain visual fidelity)
   - Format: AVIF with quality ~65-75

2. **Desktop WebP**: `hero-bg-desktop.webp` (~400-500KB)
   - Resolution: 1920x1080px
   - Quality: High
   - Format: WebP with quality ~80

3. **Desktop PNG**: `hero-bg-desktop.png` (~600-800KB)
   - Resolution: 1920x1080px
   - Fallback for older browsers
   - Optimized PNG (use TinyPNG or similar)

4. **Tablet AVIF**: `hero-bg-tablet.avif` (~150-200KB)
   - Resolution: 1024x768px
   - Format: AVIF with quality ~65

5. **Tablet WebP**: `hero-bg-tablet.webp` (~200-300KB)
   - Resolution: 1024x768px
   - Format: WebP with quality ~75

6. **Tablet PNG**: `hero-bg-tablet.png` (~300-400KB)
   - Resolution: 1024x768px
   - Optimized PNG

7. **Mobile AVIF**: `hero-bg-mobile.avif` (~100-150KB)
   - Resolution: 640x480px
   - Mobile-optimized composition
   - Format: AVIF with quality ~60

8. **Mobile WebP**: `hero-bg-mobile.webp` (~150-200KB)
   - Resolution: 640x480px
   - Format: WebP with quality ~70

9. **Mobile PNG**: `hero-bg-mobile.png` (~200-300KB)
   - Resolution: 640x480px
   - Optimized PNG fallback

### Tools to Convert Images

1. **Squoosh** (Online, Free): https://squoosh.app/
   - Supports AVIF, WebP, PNG
   - Visual quality preview
   - Batch conversion available

2. **ImageOptim** (Mac) or **XnConvert** (Windows/Linux): Free desktop apps
   - Batch processing
   - Multiple format support

3. **Sharp CLI** (Node.js):
   ```bash
   npm install -g sharp-cli
   sharp -i hero-bg.png -o hero-bg-desktop.avif --format avif --quality 70
   ```

4. **FFmpeg**:
   ```bash
   ffmpeg -i hero-bg.png -c:v libaom-av1 -crf 30 hero-bg-desktop.avif
   ```

### Conversion Guidelines

- **AVIF Quality**: 60-75 (lower = smaller file, more compression artifacts)
- **WebP Quality**: 70-80 (balance between size and quality)
- **PNG**: Use TinyPNG or PNGQuant for optimization
- **Dimensions**: 
  - Desktop: 1920x1200 (adjust to match current)
  - Tablet: 1024x768
  - Mobile: 640x480

### Expected Performance Impact

After adding optimized images:
- **Mobile LCP**: 14.9s → ~2.0-2.5s
- **Desktop LCP**: 2.6s → ~1.5-2.0s
- **File size reduction**: 2.19MB → ~300KB total for all formats on average

### Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16+, Edge 85+ (~95% of modern browsers)
- **WebP**: Chrome 23+, Edge 18+, Firefox 65+, Safari 14+, Opera 11+ (~95% of browsers)
- **PNG**: All browsers (fallback)

### Verification

1. After uploading images, open DevTools → Network tab
2. Reload website
3. Verify hero image is served in AVIF or WebP format (not PNG)
4. Check file sizes match targets above
5. Run PageSpeed Insights again to verify LCP improvement

## Other Images to Optimize

The following product images should also be optimized (lower priority than hero):

- Category cards: `/spices-card.png`, `/dehydrated-card.png`, `/textile-card.png`
- About images: `/about-hero.png`, `/about-us.png`
- Product images in `/public/spices/`, `/public/dehydrated/`, `/public/textile/`

These can be converted using the same process above and uploaded to replace current PNG files.

## Next Steps

1. Convert hero background to AVIF/WebP/PNG formats
2. Upload images to `/public/` directory
3. Test on mobile and desktop
4. Run PageSpeed Insights again
5. Verify LCP < 2.5s on both devices
