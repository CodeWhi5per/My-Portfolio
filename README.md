# Alex Johnson - Full Stack Developer Portfolio

A modern, fully-animated single-page portfolio website built with Next.js, GSAP, Three.js, and Framer Motion.

## 🚀 Features

### Animations
- **GSAP Timeline-based Loading Screen** - Animated logo entrance with particle burst effect and counter
- **GSAP SplitText Animations** - Character and word-by-word text reveals
- **GSAP ScrollTrigger** - Scroll-triggered animations throughout all sections
- **GSAP Flip Plugin** - Smooth project filter transitions
- **Framer Motion** - Micro-interactions and hover effects
- **Lenis Smooth Scroll** - Buttery smooth scrolling experience

### 3D Elements (Three.js)
- **Hero Section** - 8,000 particle field with mouse parallax
- **Skills Section** - Interactive 3D globe with floating skill labels
- **Contact Section** - Floating geometric shapes (Icosahedron, Torus, Octahedron)

### Sections
1. **Loading Screen** - Full GSAP orchestrated with particle burst
2. **Hero** - Particle background, typewriter effect, magnetic buttons
3. **About** - Animated stats counter, parallax orbs, rotating avatar border
4. **Skills** - 3D rotating globe, categorized skill pills
5. **Projects** - 3D tilt cards, filter tabs with Flip animations
6. **Experience** - SVG timeline with scroll-triggered reveals
7. **Contact** - Form with floating labels, validation, 3D background
8. **Footer** - Social links, back to top button

### Interactive Features
- Custom animated cursor (desktop only)
- Scroll hide/show navbar with blur backdrop
- Active section highlighting in navigation
- 3D card tilt effects with mouse tracking
- Magnetic button hover effects
- Form validation with shake animations
- Toast notifications

## 🛠️ Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger, SplitText, TextPlugin, Flip), Framer Motion
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Smooth Scroll:** Lenis
- **Forms:** React Hot Toast
- **Icons:** React Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

The development server runs on [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

To enable the contact form with EmailJS:

1. Sign up at [EmailJS](https://emailjs.com)
2. Create a service and email template
3. Update the configuration in `components/sections/Contact.tsx`:

```typescript
// Replace these values:
Service ID:  "your_service_id"
Template ID: "your_template_id"
Public Key:  "your_public_key"
```

## 🎨 Customization

### Colors
The primary gradient colors can be customized in the files:
- Primary: `#4fa8d8` (Cyan)
- Secondary: `#1a8a6e` (Teal)

### Content
Update these files to customize your content:
- `/data/projects.ts` - Your projects
- `/data/skills.ts` - Your skills
- `/data/experience.ts` - Your work experience

### Personal Info
Update in the component files:
- Name/Logo: `components/ui/Navbar.tsx`, `components/ui/LoadingScreen.tsx`
- Contact details: `components/sections/Contact.tsx`
- Social links: `components/sections/Footer.tsx`

## 🚀 Performance

- Lazy-loaded Three.js canvases
- Optimized GSAP animations with proper cleanup
- Reduced motion support for accessibility
- Custom cursor disabled on mobile devices
- Image optimization with Next.js Image component

## 📱 Responsive Design

Fully responsive across all devices with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

Built with passion by Alex Johnson
- Design & Development: Custom implementation
- 3D Assets: Three.js primitives
- Images: Unsplash

---

**Note:** This is a fully functional portfolio template. Customize it with your own content, colors, and branding to make it yours!

