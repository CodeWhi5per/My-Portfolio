# Sahan Danushka - Full Stack Developer Portfolio

A modern, fully-animated single-page portfolio website built with Next.js, GSAP, Three.js, and advanced scroll animations.

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
1. **Hero** - Parallax text layers ("Sahan" & "Danushka") with central image reveal
2. **About** - Pinned scroll experience with sequential animations:
   - Hero word reveal ("About")
   - Intro statement ("I build web and mobile apps")
   - Massive text statements ("Full Stack Developer", "Building products since 2018")
   - Tech stack showcase with 18 technology icons
   - Animated stats counters (Years, Projects, Coffee)
3. **Projects** - Project showcase with filters
4. **Experience** - Work timeline with scroll reveals
5. **Skills** - Interactive skills display
6. **Contact** - Contact form with validation
7. **Footer** - Social links and navigation

### Interactive Features
- Custom animated cursor (desktop only)
- Scroll hide/show navbar with blur backdrop
- Active section highlighting in navigation
- 3D card tilt effects with mouse tracking
- Magnetic button hover effects
- Form validation with shake animations
- Toast notifications

## 🛠️ Tech Stack

### Portfolio Built With
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger, Core), Lenis
- **3D Graphics:** Three.js
- **Forms:** React Hook Form, EmailJS
- **Icons:** React Icons (Simple Icons)
- **UI Components:** Radix UI

### My Professional Stack
**Frontend:** TypeScript, React, Next.js, Tailwind CSS, Vite, Three.js, GSAP

**Mobile:** Flutter, Kotlin

**Backend:** Java, Spring Boot, Node.js, Express.js, C#, Python

**Database:** MySQL, MongoDB

**Cloud:** Google Cloud Platform (GCP)

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
3. Update the configuration in `lib/emailjs.ts` with your credentials

## 🎨 Customization

### Content
Update these files to customize your content:
- `/data/projects.ts` - Your projects
- `/data/skills.ts` - Your skills
- `/data/experience.ts` - Your work experience
- `/components/sections/About.tsx` - Tech stack icons and stats

### Personal Info
Update in the component files:
- Name: `components/sections/Hero.tsx` and `components/sections/About.tsx`
- Contact details: `components/sections/Contact.tsx`
- Tech stack: Add your icons in `components/sections/About.tsx` (Stage 4)

### Images
Place custom images in the `/public` folder:
- `/public/me.png` - Your profile photo
- `/public/java.png` - Java icon (if customizing)
- `/public/Csharp.png` - C# icon (if customizing)
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

Built with passion by Sahan Danushka
- Design & Development: Custom implementation
- Technologies: TypeScript, React, Next.js, Tailwind CSS, GSAP, Three.js
- Icons: React Icons (Simple Icons)

---

**Portfolio of Sahan Danushka** - Full Stack Developer specializing in Web & Mobile Applications

