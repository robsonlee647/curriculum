# curriculum

Robson Lee's personal résumé/CV — a static site published on GitHub Pages, built from `Profile.pdf`.

## Site

Plain HTML/CSS, no build step:

```
index.html            résumé page
assets/css/style.css
assets/img/           add your photo here (see assets/img/README.md)
Profile.pdf           source résumé (LinkedIn export)
```

### Add your photo

Drop a square photo (~500×500px) at `assets/img/photo.jpg`. Until that file
exists, the page shows a placeholder circle with your initials instead — no
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
