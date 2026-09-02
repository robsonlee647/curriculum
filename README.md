# curriculum

Robson Lee's personal website — a multi-page static site published on GitHub Pages, built from `Profile.pdf`.

## Site

Plain HTML/CSS/JS, no build step:

```
index.html            Home — intro, stats, quick links
about.html             About — summary & education
experience.html         Experience — career timeline
skills.html            Skills — technology categories
contact.html            Contact — email, LinkedIn, location
assets/css/style.css    shared design system (pastel sidebar layout)
assets/img/             add your photo here (see assets/img/README.md)
Profile.pdf             source résumé (LinkedIn export)
```

Each page shares a persistent left sidebar (photo, name, nav, contact, top
skills) next to a page-specific main column — a warm sand/terracotta
palette with serif headings (Playfair Display) and a clean sans body
(Work Sans), loaded from Google Fonts.

### Add your photo

Drop a square photo (~500×500px) at `assets/img/photo.jpg`. Until that file
exists, the hero shows a placeholder with your initials instead — no
HTML/CSS changes needed.

## Publish to GitHub Pages

1. Push this repo to `origin` (`robsonlee647/curriculum`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. The site will be live at `https://robsonlee647.github.io/curriculum/`.

Local preview:

```bash
python3 -m http.server 8000
open http://localhost:8000
```
