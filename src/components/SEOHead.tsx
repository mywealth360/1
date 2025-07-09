import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPageSEO, generateStructuredData } from '../lib/seo';

export function SEOHead() {
  const location = useLocation();
  const seo = getPageSEO(location.pathname);
  const structuredData = generateStructuredData();
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://profitestrategista.com.br${location.pathname}`} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content="https://imagizer.imageshack.com/img924/1237/wUQU9Z.png" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://profitestrategista.com.br${location.pathname}`} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content="https://imagizer.imageshack.com/img924/1237/wUQU9Z.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{structuredData}</script>
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://profitestrategista.com.br${location.pathname}`} />
    </Helmet>
  );
}