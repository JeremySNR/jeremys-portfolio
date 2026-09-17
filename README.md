# Jeremy Smith - Portfolio

Professional portfolio website showcasing my work as an entrepreneur and technology leader.

## Quick Start

**Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Design

An editorial working record. Warm paper in light mode, tinted near-black in dark mode.
Newsreader carries display and long-form text, Geist the interface, Geist Mono the metadata.
Hairlines instead of shadows, one deep-green accent, and a single choreographed reveal on load.

Design tokens live in `src/resources/custom.css` (semantic `--canvas`, `--ink`, `--accent` and
friends, plus the `--scheme-*` hooks that drive Once UI's own components). Fonts and theme
settings are in `src/resources/once-ui.config.ts`.

## Project Structure

```
src/
  ├── app/                 # Next.js app directory
  │   ├── about/          # Biography, timeline, recognition, publications
  │   ├── blog/           # Writing index + posts (MDX)
  │   ├── gallery/        # Photos
  │   ├── news/           # Press, grouped by story
  │   └── work/           # Project index + case studies (MDX)
  ├── components/
  │   ├── home/           # Hero, Proof, Range, Writing, PressList, Closing
  │   ├── work/           # WorkIndex (hover-preview project list) + loaders
  │   └── about/          # AboutNav
  └── resources/
      ├── content.tsx     # All copy and structured content
      ├── custom.css      # Design tokens, base typography, prose styles
      └── once-ui.config.ts  # Fonts, scheme selection, routes
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
Create new `.mdx` files in `src/app/work/projects/`. Frontmatter fields used by the index:
`name`, `strap`, `role`, `period`, `outcome`, `kind` (venture | product | open-source | research | role),
`tags`, and `featured` (a number; sets the order on the home page, omit to keep it off the home page).

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
