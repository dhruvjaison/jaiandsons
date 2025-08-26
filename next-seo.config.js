/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Arc Luxury',
  titleTemplate: '%s | Arc Luxury',
  description: 'Premium luxury experiences redefined with sophisticated elegance. Discover the pinnacle of luxury through our commitment to exclusivity, craftsmanship, and innovation.',
  canonical: 'https://arc-luxury.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arc-luxury.com',
    siteName: 'Arc Luxury',
    title: 'Arc Luxury - Premium Luxury Experiences',
    description: 'Premium luxury experiences redefined with sophisticated elegance. Discover the pinnacle of luxury through our commitment to exclusivity, craftsmanship, and innovation.',
    images: [
      {
        url: 'https://arc-luxury.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arc Luxury - Premium Luxury Experiences',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@arcluxury',
    site: '@arcluxury',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0a1929', // Deep navy
    },
    {
      name: 'msapplication-TileColor',
      content: '#0a1929',
    },
    {
      name: 'keywords',
      content: 'luxury, premium, exclusive, high-end, sophisticated, elegant, craftsmanship, bespoke, elite, prestige',
    },
    {
      name: 'author',
      content: 'Arc Luxury',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

export default defaultSEOConfig; 