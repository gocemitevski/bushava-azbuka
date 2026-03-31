# AGENTS.md - Guidelines for Agentic Coding in Bushava Azbuka

## Project Overview

This is a digitized version of the Macedonian children's alphabet book "Бушава азбука" (Bushava Azbuka) by Goran Stefanovski, illustrated by Dušan Petričić. The project is a Jekyll-based static website with Bootstrap 5, SCSS, and PWA support.

## Build Commands

### Node.js/npm Commands

```bash
npm install           # Install dependencies (run after cloning)
npm run build         # Build optimized CSS from SCSS (compressed)
npm run watch         # Watch mode for SCSS (generates source maps)
npm run copy-js       # Copy jQuery, Popper, Bootstrap to assets/js
```

### Jekyll Commands

```bash
bundle install        # Install Ruby dependencies
bundle exec jekyll serve --incremental   # Start local server
jekyll build          # Build for production
```

### Running a Single Test

There are no test frameworks configured. The `npm test` command exits with error:

```bash
npm test  # Outputs: "Error: no test specified" && exit 1
```

To add tests, consider adding a framework like Jest for JavaScript or a Ruby testing gem.

## Code Style Guidelines

### General Structure

- Jekyll templates in `_layouts/` and `_includes/`
- SCSS partials in `assets/scss/` (prefixed with `_`)
- Main entry: `assets/scss/main.scss`
- Service worker: `sw.js` (PWA caching logic)

### SCSS Guidelines

1. **File Organization**: Partial files start with underscore (`_variables.scss`, `_mixins.scss`)
2. **Import Order**: Mixins first, then Bootstrap, then custom components (see `main.scss`)
3. **Variables**: Follow Bootstrap's `$component-state-property-size` formula
4. **Naming**: Use kebab-case for variables and CSS classes (e.g., `$primary-bg-subtle`)
5. **Defaults**: Use `!default` for overridable variables
6. **Color System**: Follow Bootstrap's color scale (100-900)
7. **Comments**: Use `//` for single-line, `/* */` for multi-line; use scss-docs markers for variables

### JavaScript (sw.js)

1. **Style**: Use ES6+ (const, arrow functions)
2. **Naming**: camelCase for variables and functions
3. **Error Handling**: Add .catch() for offline fallback
4. **Caching**: Cache-first strategy for static assets
5. **URL**: Use `self.location.origin` instead of hardcoded URL

### HTML (Jekyll/Liquid)

1. **Syntax**: Liquid tags for templating: `{{ variable }}`, `{% tag %}`
2. **Includes**: Use `_includes/` for reusable components (navbar, footer, scripts)
3. **Layouts**: Use `_layouts/` for page templates (default.html, bukva.html)

### File Naming Conventions

- SCSS partials: `_filename.scss`
- Jekyll layouts: `layout-name.html`
- Includes: `component-name.html`
- Service worker: `sw.js`

### Formatting

- Indentation: 2 spaces for SCSS and JavaScript
- No trailing whitespace
- Maximum line length: 120 characters (soft limit)
- Use semicolons in JavaScript

### Asset Management

- CSS: Generated from SCSS via `npm run build`
- JS: jQuery, Popper.js, Bootstrap (minified copies from node_modules)
- Fonts: FreeSerif WOFF/WOFF2 in `assets/free-serif/`
- Images: Optimized PNGs and SVGs in `assets/`
- Video: H.264 and WebM formats for compatibility

## Project Structure

```
├── _includes/        # Reusable HTML partials
├── _layouts/         # Page templates (default.html, bukva.html)
├── _data/            # Jekyll data files
├── _bukvi/           # Letter pages (generated content)
├── assets/
│   ├── scss/         # SCSS source files (_*.scss, main.scss)
│   ├── js/           # JavaScript (copied from node_modules)
│   ├── sliki/        # Images
│   ├── video/        # Video files
│   └── free-serif/  # Web fonts
├── _config.yml       # Jekyll configuration
├── sw.js             # Service worker (PWA)
├── Gemfile           # Ruby dependencies (Jekyll)
└── package.json      # Node.js dependencies
```

## Common Tasks

### Adding a New Letter Page

1. Create Markdown file in `_bukvi/` (e.g., `32-ѥ.html`)
2. Set `layout: bukva` and define letter info in front matter
3. Letters are auto-generated based on content

### Modifying Styles

1. Edit SCSS partial in `assets/scss/`
2. Run `npm run watch` to see changes live
3. Run `npm run build` to generate production CSS

### PWA Updates

- Edit `sw.js` to change cache name or resources
- Service worker auto-updates on page refresh

## Important Notes

- No linting or type checking configured
- No automated tests
- Dark mode disabled (`$enable-dark-mode: false`)
- Use `bundle exec` for Jekyll commands to ensure correct gem versions
- Video compression: Use H.264 (CRF 30) and VP9 (CRF 50) for compatibility

## Editor Settings (if applicable)

- Use 2-space indentation
- Set encoding to UTF-8
- Line endings: LF (Unix)

## Technical Details

### Dependencies

- **Ruby**: Jekyll 4.2.1, jekyll-feed, webrick
- **Node.js**: sass, bootstrap, jquery, @popperjs/core
- **CSS Framework**: Bootstrap 5 (customized, dark mode disabled)

### Jekyll Configuration

- Markdown processor: kramdown
- Collections: `bukvi` (letter pages)
- Sass directory: `assets/scss`
- Output style: compressed

### PWA Configuration

- Service worker: `sw.js`
- Cache strategy: Cache-first for static assets
- Cache invalidation: On service worker update (new cache name with date)

### Bootstrap Customization

All Bootstrap variables are customized in `assets/scss/_variables.scss`:

- Custom color: `$banana` (#ffffba)
- Rounded corners disabled: `$enable-rounded: false`
- Shadows disabled: `$enable-shadows: false`
- Dark mode disabled: `$enable-dark-mode: false`

### Font Configuration

- Primary font: FreeSerif (WOFF/WOFF2)
- Fallback: Times New Roman, serif
- Custom fonts in `assets/free-serif/`

### Video Requirements

- Intro video in `assets/video/`
- H.264 format for broad compatibility
- WebM format for modern browsers
- Poster image for video placeholder

## Best Practices

### Before Committing

1. Run `npm run build` to generate production CSS
2. Verify no JavaScript errors in browser console
3. Test PWA functionality (service worker registration)
4. Check all letter pages render correctly

### Performance Considerations

- Minified Bootstrap, jQuery, Popper (do not modify)
- Compressed CSS output
- Web fonts preloaded in HTML head
- Video poster images for perceived performance

### Accessibility

- Use semantic HTML elements
- Ensure sufficient color contrast (WCAG 2.2, ratio 4.5:1)
- Include alt text for images
- Support keyboard navigation
