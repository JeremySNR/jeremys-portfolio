# Jeremy Smith - Portfolio

Professional portfolio website showcasing my work as an entrepreneur and technology leader.

## Quick Start

**Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  ├── app/                 # Next.js app directory
  │   ├── about/          # About/CV page
  │   ├── blog/           # Blog posts (MDX)
  │   ├── gallery/        # Photo gallery
  │   └── work/           # Work/project pages (MDX)
  ├── components/         # React components
  └── resources/          # Configuration files
      ├── content.tsx     # Main content configuration
      └── once-ui.config.ts  # Theme & design settings
```

## Customization

### Edit Content
Main content is configured in `src/resources/content.tsx`:
- Personal information
- Social media links
- Work experience
- Projects
- Blog settings

### Add Blog Posts
Create new `.mdx` files in `src/app/blog/posts/`

### Add Projects
Create new `.mdx` files in `src/app/work/projects/`

### Update Images
- Profile photo: `public/images/1726940932303.jpeg`
- Project images: `public/images/projects/[project-name]/`
- Gallery photos: `public/images/gallery/`

## Built With

- [Next.js](https://nextjs.org) - React framework
- TypeScript
- MDX for blog and project content
- Sass/SCSS for styling

## Deployment

Deploy easily with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or build for production:
```bash
npm run build
npm start
```

## License

© 2025 Jeremy Smith. All rights reserved.
