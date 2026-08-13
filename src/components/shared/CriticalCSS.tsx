/**
 * Critical CSS Inline Component
 * Inlines critical above-the-fold CSS to reduce render-blocking
 */

export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical above-the-fold styles */
          html {
            scroll-behavior: smooth;
          }
          
          body {
            font-feature-settings: "rlig" 1, "calt" 1;
            background-color: #fbfaf7;
            color: #123247;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          }
          
          /* Hero section critical styles */
          .hero-section {
            position: relative;
            overflow: hidden;
            background-color: #062b43;
            min-height: 650px;
          }
          
          .hero-section picture {
            position: absolute;
            inset: 0;
            z-index: 1;
          }
          
          .hero-section img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            display: block;
          }
          
          /* Prevent CLS from images */
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          /* Optimize font loading */
          @font-face {
            font-family: 'Inter';
            font-display: swap;
          }
        `,
      }}
    />
  );
}
