# Arc Luxury

A premium luxury experiences website built with Next.js 14, featuring sophisticated design and modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom luxury theme
- **Animation**: Framer Motion
- **SEO**: next-seo + next-sitemap
- **Forms**: react-hook-form + zod validation
- **Maps**: @googlemaps/react-wrapper (configured for future integration)
- **Fonts**: Playfair Display (headings), Inter (body text)

## 🎨 Design System

### Color Palette
- **Deep Navy**: `#0a1929` - Primary brand color
- **Charcoal**: `#1a1a1a` - Secondary dark tones
- **Off-White**: `#fafafa` - Clean backgrounds
- **Gold Accent**: `#d4a605` - Premium highlights

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)

## 📁 Project Structure

```
src/
├── app/
│   ├── (site)/
│   │   └── page.tsx          # Main homepage
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles
├── components/
│   ├── ui/
│   │   └── Button.tsx        # Reusable button component
│   ├── forms/
│   │   └── ContactForm.tsx   # Contact form with validation
│   └── maps/
│       └── GoogleMapWrapper.tsx # Google Maps integration stub
├── lib/
│   ├── utils.ts              # Utility functions
│   └── validations.ts        # Zod schemas for form validation
├── styles/                   # Additional style files
└── public/
    └── media/                # Static assets
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd arc-luxury
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## ⚙️ Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configurations:

```env
# Site URL for SEO and sitemap generation
SITE_URL=https://arc-luxury.com

# Google Maps API Key (when ready to integrate)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### SEO Configuration
- **next-seo.config.js**: Default SEO settings
- **next-sitemap.config.js**: Sitemap generation configuration

### Google Maps Integration
The Google Maps component is currently a stub. To activate:
1. Get a Google Maps API key
2. Add it to your environment variables
3. The `GoogleMapWrapper` component will automatically use the real Google Maps

## 🎯 Key Features

### Custom Tailwind Theme
- Extended color palette with luxury brand colors
- Custom font family configurations
- Utility classes for common luxury design patterns

### Form Validation
- **react-hook-form** for performant form handling
- **Zod** schemas for type-safe validation
- Custom error handling and styling

### Animation System
- **Framer Motion** for smooth page transitions
- Hover effects and micro-interactions
- Performance-optimized animations

### SEO Optimization
- Automatic sitemap generation
- Open Graph and Twitter Card support
- Structured metadata for search engines

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sitemap` - Generate sitemap manually

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Component-based architecture

## 📱 Responsive Design
- Mobile-first approach
- Breakpoint: 768px for desktop layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment
The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any platform supporting Node.js

## 🔮 Future Enhancements
- Google Maps integration with API key
- Content Management System (CMS) integration
- E-commerce functionality
- Multi-language support
- Advanced analytics integration

---

Built with ❤️ for luxury experiences.
